    export let cart;
    loadFromStorage ()
    export function loadFromStorage (){
    
        cart = JSON.parse(localStorage.getItem('cart')) 

        if (!cart) {
            cart = [{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: 1
            }, {
                productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: 2
            }];

        }
    }





// export let cart = JSON.parse(localStorage.getItem('cart')) || [{
//         productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: 1
//     }, {
//         productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//         quantity: 1,
//         deliveryOptionId: 2
//     }];

    // OR (The above and below are the same)

// The below is if the cart is empty, then use the default products
// if (!cart){
//     cart = [{
//         productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: 1
//     }, {
//         productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//         quantity: 1,
//         deliveryOptionId: 2
//     }];
// }

//Main Idea of Javascript

// 1. Save data
// 2. Generate the HTML
// 3. Make it interactive

// 1. We have saved data in delivery Options.js and also updated our cart above
// with the delivery optionsID

// 2. We go searching for the HTML through the console.

// For the above deliveryoptionsId, we are assuming the id(meaning the number of days)
// We cleared the local storage using localStorage.removeItem('cart')
// so we can use the above default cart.
// If we have an error and our code is correct, we might have a bad data stored in our storage
// we can clear using localStorage.clear() and refresh


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId){
    let matchingItem;
    // Looping through to check if the productId in products matches the 
    // the productid in the cart which makes them duplicates
    cart.forEach((cartItem)=>{
        if (productId===cartItem.productId){
            matchingItem = cartItem
        }
    })
    // If they are duplicates (Matching items) or true value, then you are adding them to matchingItem.quantity, 
    // if duplicates or falsy then push.
    const quantityButton = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantitySelector = Number(quantityButton.value);
    // in the above is a select button, for 1-10 quantities which has been picked and values
    // extracted and added to the cart
    if (matchingItem){
        matchingItem.quantity += quantitySelector
    }else{
        cart.push({
        productId,
        quantity: quantitySelector
        })
    }
    saveToStorage()
}

// export function updateQuantity(productId, newQuantity) {
//   let matchingItem;

//   // Find the item in the cart
//   cart.forEach((cartItem) => {
//     if (productId === cartItem.productId) {
//       matchingItem = cartItem;
//     }
//   });

//   // Update quantity if found
//   if (matchingItem) {
//     matchingItem.quantity = newQuantity;
//   }

//   // Save updated cart
//   saveToStorage();
// }

export function removeProductFromCart(productId){
    // STEPS
    //  1. Create a new array e.g const newCart =[]
    //  2. Loop through the cart as done below.
    //  3. Add each product to the new array, except 
    //     for this productId (The one in parameter and if statment below)
    const newCart =[]
    cart.forEach((cartItem)=>{
        if (cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;

    saveToStorage()
}

// To update the delivery option, we need to know
//1. The product we want to update(WE need to know when the product should be delivered)
//2. The deliveryOptionid(The date it should be delivered)

// Creating a function for the task

//STEPS TO ACHIEVE THE ABOVE.
// 1. Loop through the cart and find the product
// 2. Update the deliveryOptionId of the product
export function updateDeliveryOption(productId, deliveryOptionId) {
   
    // Continuation of analysis from deliveryOption in orderSummary.
    // Hey cart, find the item with this productId that matches the 
    // product in the cart now update its delivery option to the one 
    // just selected.

    let matchingItem;

    cart.forEach((cartItem)=>{
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage()
}