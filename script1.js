// Store cart items in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        // Add item to cart array
        cart.push({ name, price });

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Item added to your cart!');
    });
});
