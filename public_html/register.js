document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // First Name Validation
        const firstName = document.getElementById("first_name").value.trim();
        if (firstName === "") {
            showError("first_name", "First name is required.");
            isValid = false;
        } else {
            clearError("first_name");
        }

        // Last Name Validation
        const lastName = document.getElementById("last_name").value.trim();
        if (lastName === "") {
            showError("last_name", "Last name is required.");
            isValid = false;
        } else {
            clearError("last_name");
        }

        // Email Validation
        const email = document.getElementById("email").value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showError("email", "Please enter a valid email.");
            isValid = false;
        } else {
            clearError("email");
        }

        // Phone Number Validation
        const phone = document.getElementById("phone").value.trim();
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            showError("phone", "Phone number must be 10 digits.");
            isValid = false;
        } else {
            clearError("phone");
        }

        // Postal Code Validation
        const postalCode = document.getElementById("postal_code").value.trim();
        const postalCodePattern = /^\d{4}$/;
        if (!postalCodePattern.test(postalCode)) {
            showError("postal_code", "Postal code must be a 4-digit number.");
            isValid = false;
        } else {
            clearError("postal_code");
        }

        // Password Validation
        const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;
        if (!passwordPattern.test(password.value)) {
            showError("password", "Password must meet the requirements.");
            isValid = false;
        } else {
            clearError("password");
        }

        // Confirm Password Validation
        if (password.value !== confirmPassword.value) {
            showError("confirm_password", "Passwords do not match.");
            isValid = false;
        } else {
            clearError("confirm_password");
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(id, message) {
        const element = document.getElementById(id);
        element.classList.add("is-invalid");
        const errorElement = element.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearError(id) {
        const element = document.getElementById(id);
        element.classList.remove("is-invalid");
        const errorElement = element.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = "";
        }
    }
});
