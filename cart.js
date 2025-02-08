// Get cart items from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart display
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the current cart items
    cartItemsList.innerHTML = '';
    
    // Add new items to cart list
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        totalPrice += item.price;
    });

    // Update total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Call the function to update the cart on page load
updateCart();

// Checkout button action
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Your order has been placed successfully!');
        cart = [];  // Clear the cart
        localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
        updateCart();  // Update cart after checkout
    } else {
        alert('Your cart is empty!');
    }
});

// Clear cart button action
document.getElementById('clear-cart-button').addEventListener('click', () => {
    cart = [];  // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
    updateCart();  // Update cart after clearing
});
