// Store cart items in memory
let cart = [];

// Add product to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        // Add item to cart array
        cart.push({ name, price });

        // Update cart display
        updateCart();
    });
});

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

// Checkout button action
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Your order has been placed successfully!');
        cart = [];  // Clear the cart
        updateCart();  // Update cart after checkout
    } else {
        alert('Your cart is empty!');
    }
});

// Clear cart button action
document.getElementById('clear-cart-button').addEventListener('click', () => {
    cart = [];  // Clear the cart
    updateCart();  // Update cart after clearing
});
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '100.00' // ضع هنا قيمة الإجمالي
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('تم الدفع بنجاح! مرحبًا ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');
