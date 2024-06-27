import {getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cart} from '../data/cart-class.js'; 

async function renderTracking() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderIdUrl = url.searchParams.get("orderId");
  const productIdUrl = url.searchParams.get("productId");

  const order = getOrder(orderIdUrl);
  const product = getProduct(productIdUrl);

  // Get additional details about the product like the estimate delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  })

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimateDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  const deliveryMessage = today < deliveryTime ? "Arriving on" : "Delivered";


  const trackingHTML = 
  `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">
        ${deliveryMessage} ${dayjs(productDetails.estimateDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
        ${product.name}
    </div>

    <div class="product-info">
        Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
        <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
        Preparing
        </div>
        <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
        Shipped
        </div>
        <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
        Delivered
        </div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar style="width ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  document.querySelector(".js-order-tracking-quantity").innerHTML = cart.updateCartQuantity();
}
renderTracking();
