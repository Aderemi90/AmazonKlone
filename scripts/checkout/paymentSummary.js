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

checkout.js

import {renderOrderSummary} from './checkout/OrderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { renderCheckHeader } from './checkout/checkoutHeader.js';
// import { loadProducts } from '../data/products.js';
// import { loadProductsFetch } from '../data/products.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/cars.js';
// import '../data/backend-practice.js';

//NOTE: The loadCart function was not created but i called it severally
// for learning purposes. loadCart is fetching the cart using fetch('example.com')

//WE seperated our checkout into two sections because adding the payment aspect will make it cumbersome.
//1. OrderSummary to cater for the order. e.g The renderOrderSummary is rendered here 
//2. PaymentSummary to cater for the payment aspect.
/*
The below is also a callback, its a function inside another function
*/

// loadProducts(()=>{ // created an anonymous function which will act as a callback in the products.It will call the functions after loading the products.
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// })
// renderOrderSummary();
// renderPaymentSummary();
// renderCheckHeader();

//Promises are better than callback(above) because promises are a better way to wait for an asynchronous to finish. 
// They help avoid nesting and keeps our code flattened
// The below is preferable because the abpve will cause alot of nesting.
// The below promise resolves the products before it renders the pages. Note that loadProducts is an 
// Asynchronous function that waits for none, so it resolves first then load other pages
// we use resolve to wait for each step to finish before we move to the next step//

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
// new Promise((resolve)=>{
//     // loadProducts(()=>{
//     //     resolve()
//     // });
//    // loadProductsFetch()
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// });

// Promise.all ([
//     loadProductsFetch()
// ]).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// });
// new Promise((resolve) => {
//   loadProducts()
//     .then(() => resolve('value1'))
// })
// .then((value) => {
//   console.log(value);
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckHeader();
// });

// new Promise((resolve, reject) => {
//   loadProductsFetch()
//     .then(() => resolve('value1'))
//     .catch(reject);
// })
// .then((value) => {
//   console.log(value);
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckHeader();
// });

// The below can be used to load multiple asynchronous functions 
/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve()
    });
    
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
});
*/

/* 
Advantages of promises(Continuation from Above)
1. We can give resolve a value which will be saved inside the parameter of .then
which can be used. This allows us share a value between two steps of a promise 
e.g Value 1 in resolve and value in .then(Shown in the above first example)

2. We can run multiple promises at the same time(Promise.all) and wait for all of them to finish
we give it an array of promises and wait for it to resolve.
*/
/*
Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('value1')
        });
        return new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
})
]).then((value)=>{
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
});
*/
/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve()
    });
    
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
});
*/

// Promise.all([
//     loadProductsFetch(),
// ]).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// });

// Async/Await is a shortcut for promises and removes all the extra code.
// Async makes a function return a promise.
//example below//
/*
async function loadPage(){
console.log('load page');
return 'value2'
}
loadPage().then((value)=>{
    console.log('next step');
    console.log(value)
})
*/
// Advantages of using Async; it allows us use the await feature.
// Await lets us wait for a promise to finish before going to the next line
// Example of Async and Await//
// Await allows us to write aynchronous codes like normal code
// Async/Await can only be used with promises and doesnt do banything with a callback 

/* async function loadPage(){
    console.log('load page');
    await loadProductsFetch()
}
loadPage().then(()=>{
    console.log('next step');
}) */
//NOTE:We can only use await in an async fuction
/* async function loadPage(){
    await loadProductsFetch();

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
}
loadPage() */

// async function loadPage(){
    
//     await loadProductsFetch();
   
//     await new Promise ((resolve)=>{
//         loadCart(()=>{
//             resolve()
//         })
//     })
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// }
// loadPage()

//More Details about Async and Await
// We can only use await inside an async function
// The closest function has to be async//

// async function loadPage(){
    
//     await loadProductsFetch();
   
//     const value = await new Promise ((resolve)=>{
//         loadCart(()=>{
//             resolve('value3')
//         })
//     }) //.then((value)=>{}) // Instead of using a .then here, for async and await we can save it in a variable
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// }
// loadPage()

// The best practice is to use Async/Await over promises and callbacks 
// because they are more cleaner
// We can also use the Try and catch method to catch errors//

// async function loadPage(){
    
//     try {
//         await loadProductsFetch();
//        /* const value = await new Promise ((resolve)=>{
//             loadCart(()=>{
//                 resolve('value3')
//             })
//         })*/  //.then((value)=>{}) // Instead of using a .then here, for async and await we can save it in a variable
        
//     } catch (error) {
//         console.log("There was an error")
//     }

//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckHeader();
// }
// loadPage()

/* More details about Try/Catch */

/* We dont have to use it with asynchronous code, we can use it for 
synchronous code/normal code as well to catch errors.
Whenever we get errors, it will skip the rest of the code and go directly
to catch. Try/Catch is meant to handle unexpected errors hence why we cannot 
implement everywhere (code is correct but something outside our control led to the error)

NOTE: We can manually create an error by using keyword (throw).  When we get an error
it will skip the rest of the code and go straight to catch and save inside the catch(error) and log to the console

/* async function loadPage(){
    
    try {
    throw 'error1' manually throwing an error here
    
    await loadProductsFetch();
       /* const value = await new Promise ((resolve)=>{
            loadCart(()=>{
                resolve('value3')
            })
        }) */ //.then((value)=>{}) // Instead of using a .then here, for async and await we can save it in a variable
        
 /*   } catch (error) {
        console.log("There was an error")
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
}
loadPage()

NOTE: We can also throw an error in a promise

/* async function loadPage(){
    
    try {  
    await loadProductsFetch();
        const value = await new Promise ((resolve)=>{
            throw 'error2' manually throwing an error here
            It will get an error and go straight to catch and not load the cart
            loadCart(()=>{
                resolve('value3')
            })
        }) */ //.then((value)=>{}) // Instead of using a .then here, for async and await we can save it in a variable
        
 /*   } catch (error) {
        console.log("There was an error")
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
}
loadPage()

NOTE: The below is the second way to create an error in a promise
We need to use a different code to create an error ina  promise
when we create a promise, it gives us a second parameter called reject()
reject() is a function that allows us create an error in the future

/* async function loadPage(){
    
    try {  
    await loadProductsFetch();
        const value = await new Promise ((resolve, reject)=>{
            throw 'errr2' (throwing the error synchronously)
            It will get an error and go straight to catch and not load the cart
            loadCart(()=>{
                reject(error2) (throwing the error asynchronously(inside a promise))
                // resolve('value3')
            })
        }) */ //.then((value)=>{}) // Instead of using a .then here, for async and await we can save it in a variable
        
 /*   } catch (error) {
        console.log("There was an error")
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckHeader();
}
loadPage()

Summary: We can use Keyword Throw to create error synchronously and 
reject aysnchronously or in the future.
*/
