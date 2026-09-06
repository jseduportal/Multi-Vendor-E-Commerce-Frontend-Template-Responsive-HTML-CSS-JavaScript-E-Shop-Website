document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Unsplash High Quality Image URLs for Accessories
    const accessoryImages = [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", // Sunglasses
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400", // Analog Watch
        "https://images.unsplash.com/photo-1611591475155-4284fa289329?w=400", // Gold Chain
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400", // Leather Belt
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", // Earrings
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400", // Cap
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", // Ring
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", // Necklace
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400", // Glasses
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400"  // Bracelet
    ];

    // 2. Category Config Data
    const activeConfig = {
        subTypes: ["UV-Protected", "Genuine Leather", "Stainless Steel", "Silver Plated", "Velvet Fabric"],
        titles: ["Ray-Pro Sunglasses", "Titanium Chronograph Watch", "Classic Leather Belt", "Crystal Pendant Chain", "Luxury Hair Scrunchie"],
        prefix: "Accessory"
    };

    // 3. 50 Dynamic Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 300 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 199 + (i * 25);
        const discountPercentage = 10 + (i % 5) * 10;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        // Different Images assigned dynamically
        const selectedImage = accessoryImages[i % accessoryImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (3.6 + (i % 14) * 0.1).toFixed(1),
            reviews: 80 + i * 12
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No accessories found matching your search.</div>`;
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