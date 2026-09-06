document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Detect Category from Page URL/Filename
    const pathName = window.location.pathname.split("/").pop().toLowerCase();
    let category = "footwear"; // Default for footwear page
    
    if (pathName.includes("footwear") || pathName.includes("shoes")) {
        category = "footwear";
    } else if (pathName.includes("clothe")) {
        category = "clothes";
    }

    // 2. Category Master Config Data
    const categoryConfigs = {
        clothes: {
            subTypes: ["Polyester/Crepe", "100% Pure Cotton", "Georgette Silk", "Chanderi Rayon", "Heavy Net"],
            titles: ["Aishani Petite Kurti", "Jivika Printed Kurta", "Charvi Designer Suit", "Kashvi Bridal Wear", "Trendyol Western Top"],
            prefix: "Clothe"
        },
        footwear: {
            subTypes: ["Casual Sneakers", "Ethnic Leather Jutti", "Party Wear Heels", "Running Sports Shoes", "Formal Loafers"],
            titles: ["Urban Step", "Royal Touch", "Flexi Comfort", "Velvet Luxe", "Street Craft"],
            prefix: "Shoes"
        }
    };

    const activeConfig = categoryConfigs[category] || categoryConfigs.footwear;

    // 3. 50 Dynamic Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 200 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 399 + (i * 45);
        const discountPercentage = 10 + (i % 5) * 10;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: `https://via.placeholder.com/250x270/e0f2f1/034843?text=${activeConfig.prefix}+${id}`,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (3.5 + (i % 15) * 0.1).toFixed(1),
            reviews: 100 + i * 18
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No footwear found matching your search.</div>`;
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

    // 5. Search Handler
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