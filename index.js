 document.addEventListener("DOMContentLoaded", () => {
            const products = [
                { name: "Casual Cotton Shirt", category: "Clothes", price: "₹599" },
                { name: "Running Sports Shoes", category: "Footwear", price: "₹1,299" },
                { name: "Leather Travel Bag", category: "Bags & Luggage", price: "₹2,499" },
                { name: "Smart Android Mobile", category: "Mobiles", price: "₹14,999" },
                { name: "Wireless Headphones", category: "Electronics", price: "₹1,999" },
                { name: "Kids Educational Toy Set", category: "Kids Toys", price: "₹799" }
            ];

            const searchInput = document.getElementById('search');
            const searchResults = document.getElementById('searchResults');
            const clearIcon = document.getElementById('clearSearch');

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                searchResults.innerHTML = '';

                if (query.length > 0) {
                    clearIcon.style.display = 'block';
                } else {
                    clearIcon.style.display = 'none';
                    searchResults.style.display = 'none';
                    return;
                }

                const filtered = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query)
                );

                if (filtered.length > 0) {
                    filtered.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'search-item';
                        div.innerHTML = `<span>${item.name} <small style="color: #777;">(${item.category})</small></span> <strong>${item.price}</strong>`;
                        div.addEventListener('click', () => {
                            alert(`Selected: ${item.name}`);
                            searchResults.style.display = 'none';
                            searchInput.value = item.name;
                        });
                        searchResults.appendChild(div);
                    });
                } else {
                    const emptyDiv = document.createElement('div');
                    emptyDiv.className = 'search-item';
                    emptyDiv.style.color = '#888';
                    emptyDiv.innerText = 'No matching items found';
                    searchResults.appendChild(emptyDiv);
                }

                searchResults.style.display = 'block';
            });

            clearIcon.addEventListener('click', () => {
                searchInput.value = '';
                clearIcon.style.display = 'none';
                searchResults.style.display = 'none';
                searchInput.focus();
            });

            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !clearIcon.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });

            const updateCartBadge = () => {
                const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
                const badge = document.getElementById('cartCount');
                if (cartData.length > 0) {
                    badge.innerText = cartData.length;
                    badge.style.display = 'inline-block';
                } else {
                    badge.style.display = 'none';
                }
            };
            updateCartBadge();

            const shopBtn = document.getElementById('shopNowBtn');
            shopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                currentCart.push({ id: Date.now(), name: 'Featured Shirt', price: '₹599' });
                localStorage.setItem('cartItems', JSON.stringify(currentCart));
                updateCartBadge();
                alert('Item added to cart!');
            });
        });