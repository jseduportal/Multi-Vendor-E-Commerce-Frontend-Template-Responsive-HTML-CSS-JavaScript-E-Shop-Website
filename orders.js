document.addEventListener("DOMContentLoaded", () => {
    
    const ordersContainer = document.getElementById("ordersContainer");

    // Mock/Dummy Orders (Agar User ne abhi koi khareedari nahi ki ho)
    const defaultOrders = [
        {
            orderId: "ORD-984321",
            date: "02 Sep 2026",
            status: "Delivered",
            statusClass: "status-delivered",
            total: 1299,
            items: [
                {
                    title: "Executive Hardbound Journal Vol.1",
                    qty: 2,
                    price: 499,
                    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=150"
                },
                {
                    title: "Luxury Rollerball Pen Set",
                    qty: 1,
                    price: 301,
                    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=150"
                }
            ]
        },
        {
            orderId: "ORD-984105",
            date: "28 Aug 2026",
            status: "In Transit",
            statusClass: "status-transit",
            total: 799,
            items: [
                {
                    title: "Complete Acrylic Painting Kit",
                    qty: 1,
                    price: 799,
                    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=150"
                }
            ]
        }
    ];

    // LocalStorage se User Orders lene ke liye
    function loadOrders() {
        let savedOrders = JSON.parse(localStorage.getItem("myOrders")) || defaultOrders;

        if (savedOrders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="empty-orders">
                    <span class="material-symbols-outlined">package_2</span>
                    <p>You haven't placed any orders yet!</p>
                    <a href="./index.html" class="btn-shop">Start Shopping</a>
                </div>
            `;
            return;
        }

        ordersContainer.innerHTML = "";

        savedOrders.forEach(order => {
            const card = document.createElement("div");
            card.className = "order-card";

            let itemsHtml = "";
            order.items.forEach(item => {
                itemsHtml += `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.title}" class="item-img" />
                        <div class="item-info">
                            <div class="item-title">${item.title}</div>
                            <div class="item-qty">Quantity: ${item.qty}</div>
                        </div>
                        <div class="item-price">₹${item.price * item.qty}</div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="order-header">
                    <div>
                        <span class="order-id">${order.orderId}</span>
                        <span class="order-date"> &bull; ${order.date}</span>
                    </div>
                    <span class="status-badge ${order.statusClass}">${order.status}</span>
                </div>

                <div class="order-body">
                    ${itemsHtml}
                </div>

                <div class="order-footer">
                    <div class="total-amount">Total Paid: <span>₹${order.total}</span></div>
                    <button class="btn-details" onclick="alert('Order ID: ${order.orderId}\\nStatus: ${order.status}')">View Details</button>
                </div>
            `;

            ordersContainer.appendChild(card);
        });
    }

    loadOrders();
});