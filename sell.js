document.addEventListener("DOMContentLoaded", () => {
    
    const sellerForm = document.getElementById("sellerForm");

    if (sellerForm) {
        sellerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const sellerData = {
                sellerName: document.getElementById("sellerName").value.trim(),
                storeName: document.getElementById("storeName").value.trim(),
                phone: document.getElementById("sellerPhone").value.trim(),
                email: document.getElementById("sellerEmail").value.trim(),
                category: document.getElementById("category").value,
                gstin: document.getElementById("gstin").value.trim(),
                isSellerRegistered: true
            };

            // Save Seller Account Info locally
            localStorage.setItem("khatriSeller", JSON.stringify(sellerData));

            alert(`Congratulations ${sellerData.sellerName}! Your store "${sellerData.storeName}" has been registered successfully on Khatri Shop.`);
            
            // Redirect back to Home Page
            window.location.href = "./index.html";
        });
    }

});