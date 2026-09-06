document.addEventListener("DOMContentLoaded", () => {
    
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const totalItemsCount = document.getElementById("totalItemsCount");
    const subtotalPrice = document.getElementById("subtotalPrice");
    const finalTotalPrice = document.getElementById("finalTotalPrice");
    const checkoutBtn = document.getElementById("checkoutBtn");

    // Default price if not stored
    const DEFAULT_ITEM_PRICE = 499;

    function getCart() {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cartItems", JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-box">
                    <span class="material-symbols-outlined" style="font-size: 64px; color: #cbd5e1;">shopping_cart</span>
                    <p>Your cart is currently empty!</p>
                    <a href="./index.html" class="checkout-btn" style="display: inline-block; width: auto; text-decoration: none; padding: 10px 24px;">Start Shopping</a>
                </div>
            `;
            totalItemsCount.innerText = "0";
            subtotalPrice.innerText = "₹0";
            finalTotalPrice.innerText = "₹0";
            if (checkoutBtn) checkoutBtn.style.display = "none";
            return;
        }

        if (checkoutBtn) checkoutBtn.style.display = "block";
        cartItemsContainer.innerHTML = "";

        // Grouping items by ID
        const itemMap = {};
        cart.forEach(item => {
            if (itemMap[item.id]) {
                itemMap[item.id].qty += 1;
            } else {
                itemMap[item.id] = {
                    id: item.id,
                    name: item.name || `Khatri Product #${item.id}`,
                    price: item.price || DEFAULT_ITEM_PRICE,
                    image: item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
                    qty: 1
                };
            }
        });

        let totalQty = 0;
        let totalPrice = 0;

        Object.values(itemMap).forEach(prod => {
            totalQty += prod.qty;
            totalPrice += prod.price * prod.qty;

            const card = document.createElement("div");
            card.className = "cart-item-card";

            card.innerHTML = `
                <div class="cart-item-details">
                    <img src="${prod.image}" alt="${prod.name}" class="cart-item-img" />
                    <div class="cart-item-info">
                        <h4>${prod.name}</h4>
                        <div class="cart-item-price">₹${prod.price}</div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 1.5rem;">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity(${prod.id}, -1)">-</button>
                        <span class="qty-val">${prod.qty}</span>
                        <button class="qty-btn" onclick="updateQuantity(${prod.id}, 1)">+</button>
                    </div>

                    <button class="remove-btn" onclick="removeItem(${prod.id})" title="Remove Item">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(card);
        });

        totalItemsCount.innerText = totalQty;
        subtotalPrice.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;
        finalTotalPrice.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;
    }

    // Global Quantity Changer
    window.updateQuantity = function(id, change) {
        let cart = getCart();
        if (change === 1) {
            cart.push({ id: id, timestamp: Date.now() });
        } else if (change === -1) {
            const index = cart.findIndex(item => item.id === id);
            if (index !== -1) {
                cart.splice(index, 1);
            }
        }
        saveCart(cart);
    };

    // Global Remove Item
    window.removeItem = function(id) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
    };

    // Checkout Click Action
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const user = JSON.parse(localStorage.getItem("khatriUser"));
            if (!user || !user.loggedIn) {
                alert("Please login first to place your order!");
                window.location.href = "./login.html";
            } else {
                alert("Thank you! Your order has been placed successfully.");
                localStorage.removeItem("cartItems");
                renderCart();
            }
        });
    }

    renderCart();
});