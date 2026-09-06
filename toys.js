document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Kids Toys High Quality Unsplash Images
    const toyImages = [
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400", // Teddy Bear / Soft Toy
        "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400", // Remote Control Car
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400", // Building Blocks / Lego
        "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=400", // Wooden Educational Toys
        "https://images.unsplash.com/photo-1531651008558-ed1740375b39?w=400", // Action Figure / Doll
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400", // Baby Play Sets
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400", // Board Games / Puzzle
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400", // Toy Robot
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400", // Kitchen Set Toy
        "https://images.unsplash.com/photo-1508873696983-2df515122519?w=400"  // Musical Keyboard Toy
    ];

    // 2. Toys Category Configuration
    const activeConfig = {
        subTypes: ["Non-Toxic Plastic", "Soft Plush Fabric", "Eco Wooden", "Battery Operated", "Brain Teaser"],
        titles: ["Turbo RC Monster Truck", "Giant Plush Teddy Bear", "Creative Building Blocks", "Educational Wooden Puzzle", "Action Robot Hero"],
        prefix: "Toy"
    };

    // 3. 50 Dynamic Toys Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 600 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 299 + (i * 35);
        const discountPercentage = 10 + (i % 5) * 10;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        const selectedImage = toyImages[i % toyImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (4.0 + (i % 10) * 0.1).toFixed(1),
            reviews: 120 + i * 18
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No toys found matching your search.</div>`;
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