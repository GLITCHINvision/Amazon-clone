import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
// import '../data/cart-class.js';
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() {
  
  try {
    await Promise.all([
      loadProductsFetch(),
      cart.loadCartFetch()
    ])
  } 
  catch (error) {
    console.log('Unexpected error, Please try again later.');
    console.log(error);
  }
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
};
loadPage();


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((value) => {
    console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
});
*/
