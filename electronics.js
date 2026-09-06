document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Electronics High Quality Unsplash Images
    const electronicImages = [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", // Laptop
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", // Wireless Headphones
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", // Smartwatch
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400", // Bluetooth Speaker
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", // Smart LED TV
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", // Wireless Earbuds
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400", // Gaming Mouse
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", // Mechanical Keyboard
        "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=400", // Power Bank
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"  // DSLR Camera Lens
    ];

    // 2. Electronics Category Configuration
    const activeConfig = {
        subTypes: ["Noise Cancellation", "16GB RAM | 512GB SSD", "AMOLED Display", "Extra Bass Audio", "Ultra HD 4K"],
        titles: ["Pro Gaming Laptop", "Over-Ear Wireless Headphones", "Fitness Tracker Smartwatch", "Portable Bluetooth Speaker", "Smart Ultra HD TV"],
        prefix: "Electronics"
    };

    // 3. 50 Dynamic Electronics Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 900 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 1299 + (i * 650);
        const discountPercentage = 10 + (i % 5) * 5;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        const selectedImage = electronicImages[i % electronicImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (4.3 + (i % 7) * 0.1).toFixed(1),
            reviews: 180 + i * 25
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No electronic items found matching your search.</div>`;
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