import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { formatCurrency } from "../../scripts/utils/money.js";
import { loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeAll( async () => {
    // fetch Promise use
    await loadProductsFetch();
    /*
    loadProducts(() => {
      done(); // done() to wait for backend code to load first 
    });
    */
  });

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header-middle-section"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        quantity: 2,
        priceCents: 1090,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        name: "Intermediate Size Basketball",
        quantity: 1,
        priceCents: 2095,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('display the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('remove a product', () =>{
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('display name', () => {
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(cart[0].name);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(cart[1].name);
  });

  it('display price', () => {
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain(`$${formatCurrency(cart[0].priceCents)}`);
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain(`$${formatCurrency(cart[1].priceCents)}`);
  });

  it('updates the delivery option',  () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);
      
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50');

  });
});