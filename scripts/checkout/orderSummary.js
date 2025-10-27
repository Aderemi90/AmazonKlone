import {cart, removeProductFromCart, updateDeliveryOption} from '../../data/cart.js'

import {products, getProducts} from '../../data/products.js'
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {deliveryOptions} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckHeader } from './checkoutHeader.js';

// NOTE: When changing the delivery options, we want it to display in real time as against refreshing 
// before it displays the current date. in the past we have always solved using the DOM, and changing HTML.
// in  this situation, we cannot because we have to be manually fix using the DOM whilst noting that 
// the delivery options has a price which will also change the cost in the order summary. To avoid manual  
// which is cumbersome, we have to re-render all our code hence why it is in the function renderOrderSummary

export function renderOrderSummary(){
    // When a data is duplicated for every product in the cart,
    // we can normalize the data by saving the delivery options seperately e.g 
    // delivery time and price is synonymous to all products.
    // The delivery options will also have a deliveryOptionId pointing to
    // the choice of delivery of the buyer.
    // Note: This will be an object in an array(key: value pair)

    let cartSummary = '';

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId
        // comparing the above cartItem product id with the products product id just to 
        // ascertain if they are similar. Hence why cart and products were looped.
        let matchingProduct;
        products.forEach((product)=>{
            if (product.id === productId) {
                matchingProduct = product;
            }
        })

        // To set the delivery date using the delivery option picked(by the side of the product).
        // Note that inside the cart, we only saved the delivery option id.
        // We can get the full delivery option from the full delivery option id.
        // We get the delivery id from the cart by saving in a variable.

        const deliveryOptionId = cartItem.deliveryOptionId || 1;
        
        // Now we can loop over the delivery options to get the full details.
        let deliveryOption;

        // Whatever received below will be saved in the variable delivery option
        
        deliveryOptions.forEach((option) => {
            if (option.id == deliveryOptionId){
            deliveryOption = option;
            }
            //Had to use the loose equality because of the disparity between the displayOptionId and 
            // option.id(String and number)
            //Same is also applicable to the checkboxes
        });
        // Use the delivery option above with the dayJs to get the date and display.

        
            // const deliveryOptionId = cartItem.deliveryOptionId || 1;
            // let deliveryOption = deliveryOptions.find((option) => option.id == deliveryOptionId);

            // if (!deliveryOption) {
            //     console.warn(`Missing delivery option for ID: ${deliveryOptionId}`);
            //     return; // or handle gracefully
            // }

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDay, "days")
        const dateString = deliveryDate.format('dddd, MMMM DD YYYY')

        cartSummary += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">
                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-update-display">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-check" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input">
                    <span class="save-quantity-link link-primary js-update-save"data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionsHTML(matchingProduct,  cartItem)}
                </div>
            </div>
        </div>`
    })

    // To generate HTML for the delivery options like cart above
    // 1. Loop through delivery options
    // 2. For each Option, generate some HTML
    // 3. Combine the HTML together

    // creating a function for the delivery options.

        function deliveryOptionsHTML(matchingProduct, cartItem){
            // We need to calculate the delivery days automatically using dayJs as 
            // against manually because its not practicable. 
            
            let html = '';
            deliveryOptions.forEach((deliveryOption)=>{

                const today = dayjs()
                const deliveryDate = today.add(deliveryOption.deliveryDay, "days")
                const dateString = deliveryDate.format('dddd, MMMM D YYYY')
                
                const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`; 
                // Adding the checked attribute to the input element and this makes a selector checked.
                // We only want it to be checked if it matches the deliveryOptionId in the deliveryOptions.js that was looped
                // above matches that is saved in the cart.
                const isChecked = deliveryOption.id == cartItem.deliveryOptionId; 
            html +=  `      
                <div class="delivery-option js-delivery-option"data-product-id="${matchingProduct.id}" data-delivery-option-id ="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">

                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>` 
            })
            return html
        }

        document.querySelector('.js-order-summary').innerHTML = cartSummary; 
        // updateCartQuantity()

        document.querySelectorAll('.js-delete-link').forEach((link)=>{
            link.addEventListener('click', ()=>{
                const productId = link.dataset.productId
                // Using the data attribute because we need to know which of the product we are deleting.
                removeProductFromCart(productId)

                // We need to know the element housing the products to enable us input the special class.
                // The Cart-Item-container houses the products hence why the special class was added.
                // The special class contains the productID which will also correspond with the productID above(const productId = link.dataset.productId) when the 
                // delete is clicked.
                const  container = document.querySelector(`.js-cart-item-container-${productId}`)
                container.remove()
                // updateCartQuantity()
                renderPaymentSummary()
                renderCheckHeader()
                renderOrderSummary()

            })
        })

        // function updateCartQuantity(){
        //     //To calculate the total quantity in the cart
        //     let cartQuantity = 0;

        //     cart.forEach((cartItem) => {
        //         cartQuantity += cartItem.quantity;
        //     });
        //     document.querySelector('.js-checkout-quantity').innerHTML = `Checkout (${cartQuantity} items)`;
        // }
        
        // const  updates = document.querySelectorAll('.js-update-check')

        // updates.forEach((update)=>{
        //     update.addEventListener('click', ()=>{
        //         const productId = update.dataset.productId
        //         console.log(productId);
        //     })
        // })
        
        document.querySelectorAll('.js-update-check').forEach((updateBtn) => {
            updateBtn.addEventListener('click', () => {
                const container = updateBtn.closest('.cart-item-container');
                container.classList.add('is-editing-quantity');
                // updateCartQuantity()
                renderCheckHeader()
                renderPaymentSummary()
            });
        });
    
        document.querySelectorAll('.js-update-save').forEach((button) => {
            button.addEventListener('click', () => {
                const saveContainer = button.closest('.cart-item-container');
                saveContainer.classList.remove('is-editing-quantity');
                
                const input = saveContainer.querySelector(".js-quantity-input");
                const quantityInput = Number(input.value);

                // const productId = button.dataset.productId;
                const {productId} = button.dataset

                let matchingItem;

                cart.forEach((cartItem)=>{
                    if (productId===cartItem.productId){
                        matchingItem = cartItem
                    }
                })
                
                    // Update cart item quantity

                if (quantityInput >= 1 &&  quantityInput < 1000){
                    if (matchingItem) {
                        matchingItem.quantity = quantityInput;
                        saveContainer.querySelector('.js-update-display').innerText = quantityInput;
                        // updateCartQuantity()
                        renderCheckHeader()
                        renderPaymentSummary()
                    }
                } else{
                    saveContainer.querySelector('.js-update-display').innerText = 'Quantity must be between 0 and 999';
                    // updateCartQuantity()
                    renderPaymentSummary()
                }
                
            });
        });

    
    // function updateHandleClick(){
    //     document.querySelectorAll('.js-quantity-input').forEach((buttonEnter)=> {
    //         buttonEnter.addEventListener('keydown', (event)=>{
    //             if (event.key === 'Enter'){

    //             }
    //         })
    //     })
    // }
    
    // Delivery Options//
    // we added a class to the delivery option(js-delivery-option) so we can add an event listener
    // wHAT WE WANT TO ACHIEVE
    // 1. Update deliveryOptionId in the cart.
    // 2. Update the page
    // To get the productId and deliveryOptionId, we can extract productId from matchingProduct.id
    // and deliveryOptionId from deliveryOption.id.
    // We will use the data attribute to achieve this by attaching it to the div element with the delivery-option class.

    document.querySelectorAll('.js-delivery-option').forEach((choice)=>{
        choice.addEventListener('click', ()=>{
            // const productId = choice.dataset.productId;
            // const deliveryOptionId = choice.dataset.deliveryOptionId;

            // someone clicks on a delivery option. we want to know
            // 1. ProductId: The product they clicked for.
            // 2. deliveryOptionId: which delivery they picked.

            // Go to fuction updateDeliveryOption(productId, deliveryOptionId) in cart for concluding analysis

            const {productId, deliveryOptionId} = choice.dataset;
            updateDeliveryOption(productId, deliveryOptionId);

            // AFter updating the data above we also need to rerun the code below which will refresh
            renderOrderSummary();
            renderPaymentSummary();
        })
    })
}
// renderOrderSummary() This has been moved to the checkout page

// NOTE: We put our listeners inside the renderOrderSummary function as well because when re-generating
// all the HTML, we are deleting the previous HTML and replacing it, so we need to add the event listeners again
// NOTE: Inside the renderOrderSummary function, we can call renderOrderSummary again. A function can call or re-run
// itself, that is called RECURSION. It is useful when a function needs to re-run all of its code.

// The technique we just used in updating the data and regenerating all the HTML is called MVC which means
// Model-View-controller. In MVC, we split our code in three parts.

//1. Model: This saves and manages the data e.g Update delivery option in cart.js
//2. View: This takes the data and displays it on the page e.g looping through the cart at the begining of 
// checkout.js and generating all the html from it
// 3. Controller: This runs some code when we interact with the page. e.g Event listeners in the code./
// MVC ensures the page matches the data. MVC is known as a design pattern. it organises and design our code

