document.addEventListener("DOMContentLoaded", () => {

    // 1. LocalStorage se User ki details dikhane ke liye
    const userNameElement = document.getElementById("userName");
    const userPhoneElement = document.getElementById("userPhone");

    const savedUser = JSON.parse(localStorage.getItem("khatriUser"));

    if (savedUser && savedUser.loggedIn) {
        if (userNameElement) userNameElement.innerText = savedUser.name || "Hello User";
        if (userPhoneElement) userPhoneElement.innerText = savedUser.phone || savedUser.email || "+91 9982765756";
    }

    // 2. Delete Account Button Logic
    const btnDeleteAccount = document.getElementById("btnDeleteAccount");
    if (btnDeleteAccount) {
        btnDeleteAccount.addEventListener("click", () => {
            const confirmDelete = confirm("Kya aap apna account delete karna chahte hain?");
            if (confirmDelete) {
                localStorage.removeItem("khatriUser");
                localStorage.removeItem("cartItems");
                alert("Aapka account delete ho gaya hai.");
                window.location.href = "./login.html";
            }
        });
    }

    // 3. Logout Button Logic
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            const confirmLogout = confirm("Kya aap logout karna chahte hain?");
            if (confirmLogout) {
                localStorage.removeItem("khatriUser");
                alert("Aap logout ho chuke hain.");
                window.location.href = "./login.html";
            }
        });
    }

});