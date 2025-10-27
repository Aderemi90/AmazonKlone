import { cart } from "../data/cart.js";
import { getDelivery } from '../data/deliveryOptions.js';
import { getProducts } from '../data/products.js'
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');



let tracking = '';
let totalQuantity = 0

const cartItem = cart.find(item => item.productId === productId);

cart.forEach((cartItem) => {
   
    
    totalQuantity += cartItem.quantity //Quantity

    const product = getProducts(cartItem.productId); //Import product and compare with cart

    //The below is to get the order date and delivery day
    const deliveryOption = getDelivery(cartItem.deliveryOptionId) //Import deliveryOption and compare with cart

    const today = dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDay, 'days')
    const dateString = deliveryDate.format('dddd, MMMM DD YYYY')

    

    if (cartItem.productId === productId)
    {tracking += 
   `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${cartItem.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    </div>
   `
    }
});
   document.querySelector('.js-tracking-summary').innerHTML = tracking
   document.querySelector('.js-tracking-quantity').innerHTML = totalQuantity

const steps = ['Preparing', 'Shipped', 'Delivered'];
const labels = document.querySelectorAll('.progress-label');
const bar = document.querySelector('.progress-bar');

let currentStep = 0;

function updateTrackingStep() {
  labels.forEach((label, index) => {
    label.classList.remove('current-status');
    if (index === currentStep) {
      label.classList.add('current-status');
    }
  });

  bar.style.width = `${(currentStep + 1) * 33.3}%`;

  currentStep++;
  if (currentStep < steps.length) {
    setTimeout(updateTrackingStep, 2000);
  }
}
setTimeout(updateTrackingStep, 1000);