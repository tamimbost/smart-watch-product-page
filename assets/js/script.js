document.addEventListener('DOMContentLoaded', () => {
    const state = {
        selectedColor: 'purple',
        selectedSize: 'M',
        quantity: 1,
        cart: [],
        images: {
            purple: 'assets/images/watch-item-1.png',
            cyan: 'assets/images/watch-item-2.png',
            skyblues: 'assets/images/watch-item-3.png',
            black: 'assets/images/watch-item-4.png'
        },
        prices: {
            'S': 59,
            'M': 79,
            'L': 89,
            'XL': 99
        }
    };

    const colorOptions = document.querySelectorAll('.color-option');
    const mainImage = document.getElementById('mainImage');
    const sizeOptions = document.querySelectorAll('.size-option');
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const floatingCart = document.querySelector('.floating-cart');
    const continueShoppingBtn = document.getElementById('continueShopping');

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            state.selectedColor = color;
            mainImage.src = state.images[color];

            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            state.selectedSize = option.dataset.size;
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    minusBtn.addEventListener('click', () => {
        if (state.quantity > 1) {
            state.quantity--;
            quantityInput.value = state.quantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        state.quantity++;
        quantityInput.value = state.quantity;
    });

    quantityInput.addEventListener('change', (e) => {
        state.quantity = Math.max(1, parseInt(e.target.value) || 1);
        quantityInput.value = state.quantity;
    });

    addToCartBtn.addEventListener('click', () => {
        state.cart.push({
            color: state.selectedColor,
            size: state.selectedSize,
            quantity: state.quantity,
            price: state.prices[state.selectedSize],
            image: state.images[state.selectedColor]
        });
        updateCart();
    });

    floatingCart.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    continueShoppingBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    function updateCart() {
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        cartItems.innerHTML = state.cart.map((item, index) => `
            <tr>
                <td>
                    <div class="product-cell">
                        <img src="${item.image}" alt="Smart Watch ${item.color}" class="product-image-small">
                        <span class="product-name">Classy Modern Smart watch</span>
                    </div>
                </td>
                <td class="color-cell">${item.color}</td>
                <td class="size-cell">${item.size}</td>
                <td class="quantity-cell">${item.quantity}</td>
                <td class="price-cell">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
        document.querySelector('.total-items').textContent = `(${totalItems} item${totalItems !== 1 ? 's' : ''})`;

        floatingCart.style.display = totalItems > 0 ? 'block' : 'none';
    }

    updateCart();
});