document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Cosmetics Sample Images List (Unsplash High Quality Links)
    const cosmeticImages = [
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400", // Red Lipstick
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400", // Makeup Brush / Kit
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", // Liquid Foundation / Cream
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400", // Luxury Perfume
        "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400", // Eyeshadow Palette
        "https://images.unsplash.com/photo-1608248597379-e074051a84f3?w=400", // Skin Care Lotion
        "https://images.unsplash.com/photo-1617897903246-719242758050?w=400", // Face Serum
        "https://images.unsplash.com/photo-1607602132700-268218173299?w=400", // Nail Polish
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400", // Compact Powder
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400"  // Lip Gloss
    ];

    // 2. Category Config Data for Cosmetics
    const activeConfig = {
        subTypes: ["Matte Finish", "Hydrating Glow", "Waterproof", "Organic & Vegan", "Long Lasting"],
        titles: ["Velvet Matte Lipstick", "HD Liquid Foundation", "Volumizing Mascara", "Eau De Parfum", "Glow Face Serum"],
        prefix: "Cosmetic"
    };

    // 3. 50 Dynamic Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 400 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 149 + (i * 30);
        const discountPercentage = 10 + (i % 5) * 10;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        // Different Images assigned dynamically
        const selectedImage = cosmeticImages[i % cosmeticImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (3.8 + (i % 12) * 0.1).toFixed(1),
            reviews: 95 + i * 15
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No cosmetics found matching your search.</div>`;
            return;
        }

        items.forEach(prod => {
            const card = document.createElement("div");
            card.className = "cpg-card-item";

            card.innerHTML = `
                <div class="cpg-img-holder">
                    <span class="cpg-badge-discount">${prod.discount}</span>
                    <img src="${prod.image}" alt="${prod.title}" loading="lazy">
                </div>
                <div class="cpg-card-content">
                    <span class="cpg-fabric-tag">${prod.fabricTag}</span>
                    <div class="cpg-product-name" title="${prod.title}">${prod.title}</div>
                    
                    <div class="cpg-price-row">
                        <span class="cpg-current-price">₹${prod.price}</span>
                        <span class="cpg-old-price">₹${prod.oldPrice}</span>
                    </div>

                    <div class="cpg-rating-wrapper">
                        <span class="cpg-rating-pill">${prod.rating} &#9733;</span>
                        <span style="font-size: 0.72rem; color: var(--text-muted);">(${prod.reviews} reviews)</span>
                    </div>

                    <button class="cpg-action-btn" onclick="cpgAddToCart(${prod.id}, '${prod.title.replace(/'/g, "\\'")}')">Add To Cart</button>
                </div>
            `;
            cpgContainer.appendChild(card);
        });
    }

    // Initial Load
    renderProducts(dynamicProductList);

    // 5. Search System
    const searchInput = document.getElementById("search") || document.getElementById("cpgGlobalSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = dynamicProductList.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.fabricTag.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });
    }

    // Clear Search Input Button
    const clearBtn = document.getElementById("clearSearch");
    if (clearBtn && searchInput) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            renderProducts(dynamicProductList);
        });
    }

    cpgUpdateBadge();
});

// Cart Badge Management System
function cpgAddToCart(id, name) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push({ id, name, timestamp: Date.now() });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    cpgUpdateBadge();
    alert(`"${name}" has been added to your cart!`);
}

function cpgUpdateBadge() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const counter = document.getElementById("cartCount") || document.getElementById("cpgCartCounter");
    if (counter) counter.innerText = cart.length;
}