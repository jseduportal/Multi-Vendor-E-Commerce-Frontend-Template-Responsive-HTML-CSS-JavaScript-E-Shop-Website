document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Stationery High Quality Unsplash Images
    const stationeryImages = [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400", // Leather Journal / Notebook
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400", // Colorful Pens / Markers
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400", // Art Supplies / Paints
        "https://images.unsplash.com/photo-1585336261026-875a60a1c92f?w=400", // Pencils Set
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400", // Planner / Diary
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400", // Desk Organizer / Paperclips
        "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400", // Fountain Pen
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400", // Sticky Notes & Highlighters
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400", // Sketchbook
        "https://images.unsplash.com/photo-1568205612837-017257d2310a?w=400"  // Calculator & Geometry Set
    ];

    // 2. Stationery Category Configuration
    const activeConfig = {
        subTypes: ["80 GSM Smooth Paper", "Smooth Gel Ink", "Acrylic Color Kit", "Ergonomic Grip", "Eco-Friendly Material"],
        titles: ["Executive Hardbound Journal", "Luxury Rollerball Pen Set", "Complete Acrylic Painting Kit", "A5 Spiral Notebook", "Metal Desk Organizer"],
        prefix: "Stationery"
    };

    // 3. 50 Dynamic Stationery Items Generator
    const dynamicProductList = Array.from({ length: 50 }, (_, i) => {
        const id = 1000 + i + 1;
        const subTypeIndex = i % activeConfig.subTypes.length;
        const titleIndex = i % activeConfig.titles.length;
        const basePrice = 99 + (i * 25);
        const discountPercentage = 10 + (i % 5) * 5;
        const oldPrice = Math.round(basePrice * (1 + discountPercentage / 100));

        const selectedImage = stationeryImages[i % stationeryImages.length];

        return {
            id: id,
            title: `${activeConfig.titles[titleIndex]} Vol.${Math.floor(i / 5) + 1}`,
            fabricTag: `${activeConfig.subTypes[subTypeIndex]}`,
            image: selectedImage,
            price: basePrice,
            oldPrice: oldPrice,
            discount: `${discountPercentage}% OFF`,
            rating: (4.0 + (i % 10) * 0.1).toFixed(1),
            reviews: 95 + i * 12
        };
    });

    const cpgContainer = document.getElementById("cpgProductsContainer");

    // 4. Render Engine
    function renderProducts(items) {
        if (!cpgContainer) return;
        cpgContainer.innerHTML = "";

        if (items.length === 0) {
            cpgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; font-weight: 700; color: var(--color-primary);">No stationery items found matching your search.</div>`;
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