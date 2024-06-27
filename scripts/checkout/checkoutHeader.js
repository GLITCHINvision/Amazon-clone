import { cart } from '../../data/cart-class.js';

export function renderCheckoutHeader() {
  const checkoutHTML = 
    `
      Checkout 
      (
        <a class="return-to-home-link js-cart-item"
        href="amazon.html">${cart.updateCartQuantity()} items</a>
      )
    `;

  document.querySelector('.js-checkout-header-middle-section')
      .innerHTML = checkoutHTML;
};