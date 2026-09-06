document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Bags & Luggage Sample Images List (Unsplash High Quality Links)
    const bagImages = [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", // Backpack
        "https://images.unsplash.com/photo-1565026057447-b88e3f29042b?w=400", // Travel Trolley / Suitcase
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400", // Women Handbag
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400", // Leather Duffel Bag
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400", // Office Messenger Bag
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", // Stylish Tote Bag
        "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=400", // Hard Shell Luggage
        "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400", // Leather Backpack
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", // Purse / Sling Bag
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400"  // Gym Duffle Bag
    ];

    // 2. Category Config Data for Bags & Luggage
    const activeConfig = {
        subTypes: ["Waterproof Polyester", "Genuine Leather", "Hard Shell Polycarbonate", "Canvas Material", "Lightweight Nylon"],
        titles: ["Traveler Pro Backpack", "Cabin Size Trolley", "Executive Leather Duffel", "Urban Shoulder Tote", "Anti-Theft Laptop Bag"],
        prefix: "Bag"
    };

    // 3. 50 Dynamic Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 500 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 499 + (i * 50);
        const discountPercentage = 10 + (i % 5) * 10;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        // Different Images assigned dynamically
        const selectedImage = bagImages[i % bagImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (3.9 + (i % 11) * 0.1).toFixed(1),
            reviews: 110 + i * 20
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No bags found matching your search.</div>`;
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