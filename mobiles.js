document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile High Quality Unsplash Images
    const mobileImages = [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", // Smartphone Front / Back
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400", // Flagship Smartphone
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400", // Android Phone
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400", // Modern Curved Display Phone
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400", // Camera Centric Smartphone
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400", // Minimal Phone Display
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400", // Premium Glass Body Phone
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400", // Ultra Slim Smartphone
        "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=400", // Gaming Smartphone
        "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400"  // Mobile Handset
    ];

    // 2. Mobile Category Configuration
    const activeConfig = {
        subTypes: ["8GB RAM | 128GB ROM", "12GB RAM | 256GB ROM", "6GB RAM | 128GB ROM", "16GB RAM | 512GB ROM", "4GB RAM | 64GB ROM"],
        titles: ["Ultra 5G Pro", "Max Zoom Camera Phone", "Gamer X Edition", "Power Battery Prime", "Compact Sleek 5G"],
        prefix: "Mobile"
    };

    // 3. 50 Dynamic Mobile Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 800 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 6999 + (i * 450);
        const discountPercentage = 10 + (i % 5) * 5;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        const selectedImage = mobileImages[i % mobileImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (4.2 + (i % 8) * 0.1).toFixed(1),
            reviews: 210 + i * 35
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No mobile phones found matching your search.</div>`;
            return;
        }

        items.forEach(prod => {
            const card = document.createElement("div");
            card.className = "cpg-card-item";

            card.innerHTML = `
                <div class="cpg-img-holder">
                    <span class="cpg-badge-discount">${prod.discount}</span>
                    <img src="${prod.image}" alt="${prod.title}" loading="lazy" />
                </div>
                <div class="cpg-card-content">
                    <span class="cpg-fabric-tag">${prod.fabricTag}</span>
                    <div class="cpg-product-name" title="${prod.title}">${prod.title}</div>
                    
                    <div class="cpg-price-row">
                        <span class="cpg-current-price">₹${prod.price.toLocaleString("en-IN")}</span>
                        <span class="cpg-old-price">₹${prod.oldPrice.toLocaleString("en-IN")}</span>
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