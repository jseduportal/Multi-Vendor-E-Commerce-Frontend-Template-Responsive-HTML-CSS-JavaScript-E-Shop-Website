document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sports High Quality Unsplash Images
    const sportsImages = [
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400", // Cricket Bat / Ball
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400", // Football
        "https://images.unsplash.com/photo-1617883841804-658f828a25c1?w=400", // Badminton Racket
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400", // Dumbbells / Gym
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400", // Basketball
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400", // Yoga Mat
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400", // Tennis Ball / Racket
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400", // Resistance Bands / Fitness
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400", // Boxing Gloves
        "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=400"  // Volleyball
    ];

    // 2. Sports Category Configuration
    const activeConfig = {
        subTypes: ["English Willow", "Synthetic Leather", "Carbon Fiber", "Cast Iron", "Anti-Slip Rubber"],
        titles: ["Pro Edition Cricket Bat", "Match Football Size 5", "Lightweight Graphite Racket", "Adjustable Dumbbell Set", "Non-Slip Yoga Mat"],
        prefix: "Sport"
    };

    // 3. 50 Dynamic Sports Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 700 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 399 + (i * 45);
        const discountPercentage = 10 + (i % 5) * 10;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        const selectedImage = sportsImages[i % sportsImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (4.1 + (i % 9) * 0.1).toFixed(1),
            reviews: 140 + i * 15
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No sports products found matching your search.</div>`;
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