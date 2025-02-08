// script.js

document.addEventListener("DOMContentLoaded", function () {
    // ---------------------------
    // Product Add-to-Cart Logic
    // ---------------------------
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));

            // Retrieve existing cart from localStorage (or initialize empty)
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            // Add the selected product to the cart array
            cart.push({ name: productName, price: productPrice });
            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(productName + " has been added to your cart!");
        });
    });

    // ----------------------------------
    // PayPal Button Integration Section
    // ----------------------------------
    // Check if the PayPal SDK has been loaded by verifying the paypal object exists
    if (typeof paypal !== "undefined") {
        paypal.Buttons({
            createOrder: function (data, actions) {
                // For demonstration, using a fixed amount.
                // In a real-world scenario, you could calculate the total from the cart.
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: "100.00"  // Set the total amount here
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert("Payment Successful! Welcome, " + details.payer.name.given_name);
                });
            }
        }).render("#paypal-button-container");
    }
});
