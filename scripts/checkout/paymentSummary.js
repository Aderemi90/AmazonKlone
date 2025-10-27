import {cart} from '../../data/cart.js';
import { deliveryOptions, getDelivery } from '../../data/deliveryOptions.js';
import { getProducts } from '../../data/products.js';
import { formatCurrency } from '../Utils/money.js';
import { products } from '../../data/products.js';
// import { renderOrderSummary } from './OrderSummary.js';
import { saveToStorage } from '../../data/cart.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){
    // This will cater for the order summary of the page
    // Save the data (Model)
    // Generate the HTML(View)
    // Make it interactive

    // cost of the product: 
    // 1. Loop through the cart(Import cart)
    // 2. For each of the product in the cart, multiply price by quantity
    // 3. Add everything together.
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach((cartItem) => {
        // const productId = cartItem.productId
        const product = getProducts(cartItem.productId);
        // let matchingProducts;
        
        // products.forEach((product)=>{
        //     if (product.id === productId){
        //         matchingProducts = product;
        //     }
        // })
        // console.log(matchingProducts)
        // console.log(cartItem)
        // const costOfItems = matchingProducts.priceCents * cartItem.quantity
        productPriceCents += product.priceCents * cartItem.quantity;
        // NOTE: We can create a module for the above because it is duplicated in
        // the orderSummary. We can fix it as a function so we can reuse. The model 
        // was saved in the product module as getProducts.

        // To get the cost of shipping, we should loop through the cart but we have done 
        // that already.
        // We need to get the full delivery options which can be done through the cart.

        // const deliveryOptionId = cartItem.deliveryOptionId

        // let deliveryOption;

        // deliveryOptions.forEach((option)=>{

        //     if (option.id == deliveryOptionId){
        //         deliveryOption = option
        //         console.log(deliveryOption.priceCents)
        //     }
            
        // })
        
        const deliveryCost = getDelivery(cartItem.deliveryOptionId);

        shippingPriceCents += deliveryCost.priceCents

        // NOTE: We can create a module for the above because it is duplicated in
        // the orderSummary. We can fix it as a function so we can reuse. The model 
        // was saved in the product module as getProducts.
        const totalBeforeTaxCents = productPriceCents + shippingPriceCents

        const estimatedTax = (totalBeforeTaxCents * 0.1);

        const totalCents = totalBeforeTaxCents + estimatedTax

/******************************************************************************** */
       // The below is to know the cartQuantity in the paymentSummary
            
            let matchingItem = 0;

            cart.forEach((cartItem)=>{
                // if (productId===cartItem.productId){
                //     matchingItem = cartItem
                // }
                
                matchingItem += cartItem.quantity
                saveToStorage()
                
            })
            // document.querySelector('.js-cart-item-summary').innerHTML = matchingItem 
//*********************************************************************************** */

        const paymentSummary = 
        `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div class="js-cart-item-summary">Items (${matchingItem}):</div>
                <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order">
                Place your order
            </button>
        `
        document.querySelector('.js-payment-summary').innerHTML = paymentSummary

        document.querySelector('.js-place-order').addEventListener('click',  (async ()=>{
           try {
                const response = await fetch('https://supersimplebackend.dev/orders', {
                   //we await the fetch to finish before we move to the next line
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // We cant send an object hence why we converted to string.
                        cart: cart // we are sending the cart to the backend and also the backend has a cart object
                    })
                }) /*.then((response)=>{         We can use the .then then or async/await
                    return response.json()
                }).then((data)=>{
                    console.log(data)
                })*/

                const order = await response.json() // response.json is also apromise, so we wait for the promise to finish before we move  to the next line 
                addOrder(order)
            }catch(error){
            cosole.log('unexpected error, try again later')
           }
           window.location.href = 'orders.html';
        }))
    });
}   
    /* Types of Request 
    GET: To get something from the backend
    POST: To create something
    PUT: To update something
    DELETE: To delete something    
    */

    /* To catch an error due to network issues, we will input our code
    inside a Try/Catch */

