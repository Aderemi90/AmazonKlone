// import {renderOrderSummary} from './checkout/OrderSummary.js';
// import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import { renderCheckHeader } from './checkout/checkoutHeader.js';
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
