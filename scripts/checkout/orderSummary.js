// Named export/import
import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

// default export/import
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);
    cartSummaryHTML += 
    `
      <div class="cart-item-container
      js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-quantity-update" data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value=${cartItem.quantity} min="0" max="1000">

              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>

              <span class="delete-quantity-link link-primary js-delete-link 
              js-delete-link-${matchingProduct.id}" 
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {

    let html = ''

    deliveryOptions.forEach((deliveryOption) => {
      
      const dateString = calculateDeliveryDate(deliveryOption); 

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += 
      `
        <div class="delivery-option js-delivery-option 
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
        data-delivery-option-id="${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"> 
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input 
            js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  };

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);
        renderOrderSummary();
        renderCheckoutHeader();
        renderPaymentSummary();
      });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {deliveryOptionId, productId} = element.dataset;
        cart.updateDeliveryOption(deliveryOptionId, productId);
        renderOrderSummary();
        renderPaymentSummary();
      });
  });
    
  document.querySelectorAll('.js-quantity-update')
    .forEach((link) => {
      link.addEventListener('click', () => {

        const productId = link.dataset.productId;

        const container = document.querySelector(`
          .js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      });
  });

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        const productId = link.dataset.productId;

        const container = document.querySelector(`
          .js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

        cart.updateQuantity(productId, newQuantity);

        const quantityLabel = document.querySelector(`
          .js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = newQuantity;
        renderCheckoutHeader();
        cart.updateCartQuantity();
        renderPaymentSummary();
      })
  });
};
