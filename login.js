document.addEventListener("DOMContentLoaded", () => {
    
    // Tab Elements
    const loginTabBtn = document.getElementById("loginTabBtn");
    const signupTabBtn = document.getElementById("signupTabBtn");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Password Toggle Elements
    const toggleLoginPass = document.getElementById("toggleLoginPass");
    const loginPasswordInput = document.getElementById("loginPassword");
    const toggleSignupPass = document.getElementById("toggleSignupPass");
    const signupPasswordInput = document.getElementById("signupPassword");

    // Switch to Login Tab
    loginTabBtn.addEventListener("click", () => {
        loginTabBtn.classList.add("active");
        signupTabBtn.classList.remove("active");
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    // Switch to Register Tab
    signupTabBtn.addEventListener("click", () => {
        signupTabBtn.classList.add("active");
        loginTabBtn.classList.remove("active");
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    });

    // Toggle Login Password Visibility
    if (toggleLoginPass && loginPasswordInput) {
        toggleLoginPass.addEventListener("click", () => {
            const isPassword = loginPasswordInput.type === "password";
            loginPasswordInput.type = isPassword ? "text" : "password";
            toggleLoginPass.textContent = isPassword ? "visibility" : "visibility_off";
        });
    }

    // Toggle Signup Password Visibility
    if (toggleSignupPass && signupPasswordInput) {
        toggleSignupPass.addEventListener("click", () => {
            const isPassword = signupPasswordInput.type === "password";
            signupPasswordInput.type = isPassword ? "text" : "password";
            toggleSignupPass.textContent = isPassword ? "visibility" : "visibility_off";
        });
    }

    // Handle Login Form Submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userIdentifier = document.getElementById("loginEmail").value.trim();
        
        // Save Mock Auth User
        localStorage.setItem("khatriUser", JSON.stringify({ name: userIdentifier, loggedIn: true }));
        
        alert(`Welcome back! Successfully logged in.`);
        window.location.href = "./index.html"; // Shopping Home page par redirect karega
    });

    // Handle Signup Form Submission
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();

        localStorage.setItem("khatriUser", JSON.stringify({ name: name, email: email, loggedIn: true }));

        alert(`Account created successfully! Welcome, ${name}.`);
        window.location.href = "./index.html";
    });
});