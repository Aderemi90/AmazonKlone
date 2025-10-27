import {cart} from '../data/cart.js'
import { getDelivery } from '../data/deliveryOptions.js';
import { getProducts } from '../data/products.js'
import { formatCurrency } from './Utils/money.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { generateUUID } from '../data/orderNumber.js';



let orders = '';
let productPriceCents = 0;
let totalQuantity = 0
cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity //Quantity

    const product = getProducts(cartItem.productId); //Import product and compare with cart

    productPriceCents += product.priceCents * cartItem.quantity; //For Goods prices

    //The below is to get the order date and delivery day
    const deliveryOption = getDelivery(cartItem.deliveryOptionId) //Import deliveryOption and compare with cart

    const today = dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDay, 'days')
    const dateString = deliveryDate.format('dddd, MMMM DD YYYY')
   const orderId = generateUUID();
    
   orders+= `
    <div class="order-container">
    
        <div class="order-header">
            <div class="order-header-left-section">
            <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${today}</div>
            </div>
            <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(productPriceCents)}</div>
            </div>
            </div>

            <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
            </div>
        </div>

        <div class="order-details-grid">
            <div class="product-image-container">
            <img src="${product.image}">
            </div>

            <div class="product-details">
            <div class="product-name">
                ${product.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: ${dateString}
            </div>
            <div class="product-quantity">
                Quantity: ${cartItem.quantity}
            </div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
            </div>

            <div class="product-actions">
            <a href="tracking.html?orderId=${orderId}&productId=${cartItem.productId}">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
            </a>
            </div>
        </div>
    </div>    
    `
});
document.querySelector('.js-orders-summary').innerHTML = orders
document.querySelector('.js-order-quantity').innerHTML = totalQuantity
//URL PARAMETER

//We need to make each tracking page different depending on the order and product
// To know the product to track, we use the URL parameters.
// URL parameters allows us to save data directly in the URL.
// To create a URL parameter e.g 127.0.0.1:5500/tracking.html?orderId=123.
// The question mark means we are adding a parameter to the URL(property:value pair e.g orderId=123)
// its like an object and we use javascript to get the URL parameter from the URL.
// The tracking link in the order page will have <a href="tracking.html?orderId=${orderId}&productId=${cartItem.productId}">
// The below will be in the tracking page before looping through our cart
// const url = new URL(window.location.href) => This gets the url in the browser
// url.searchParams.get('orderId')
// url.searchParams.get('productId')// 