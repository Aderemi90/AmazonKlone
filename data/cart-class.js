// Using Object Oriented Programming below
// The word(this) is a javascript feature which can give us the outer object cart(const cart = {})
export class Cart {
    //when creating or generating an object we use words starting in capital letter(Pascal case e.g Cart)
    cartItems;
    #localStorageKey;

        constructor(localStorageKey){
            this.#localStorageKey = localStorageKey
            this.#loadFromStorage()
        }


    #loadFromStorage(){
        // To access the cartItems that is undefined, we use cart.cartItems which will now be this.cartItems
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) 


        if (!this.cartItems) {
            this.cartItems = [{
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
    
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }
    addToCart(productId){
        let matchingItem;
        // Looping through to check if the productId in products matches the 
        // the productid in the cart which makes them duplicates
        this.cartItems.forEach((cartItem)=>{
            if (productId===cartItem.productId){
                matchingItem = cartItem
            }
        })
        // If they are duplicates (Matching items) or true value, then you are adding them to matchingItem.quantity, 
        // if duplicates or falsy then push.
        // const quantityButton = document.querySelector(`.js-quantity-selector-${productId}`);
        // const quantitySelector = Number(quantityButton.value);
        // in the above is a select button, for 1-10 quantities which has been picked and values
        // extracted and added to the cart
        if (matchingItem){
            matchingItem.quantity += 1
        }else{
            this.cartItems.push({
            productId,
            quantity: 1
            })
        }
        this.saveToStorage()
    }
    removeProductFromCart(productId){
        // STEPS
        //  1. Create a new array e.g const newCart =[]
        //  2. Loop through the cart as done below.
        //  3. Add each product to the new array, except 
        //     for this productId (The one in parameter and if statment below)
        const newCart =[]
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
        this.saveToStorage()
    }
    updateDeliveryOption(productId, deliveryOptionId) {
    
        // Continuation of analysis from deliveryOption in orderSummary.
        // Hey cart, find the item with this productId that matches the 
        // product in the cart now update its delivery option to the one 
        // just selected.

        let matchingItem;

        this.cartItems.forEach((cartItem)=>{
            if (productId === cartItem.productId){
                matchingItem = cartItem;
            }
        })
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage()
    }
}


// localStoragekey was used because the above fuction generates for two carts
//1. the normal amazon cart(cart-oop) and amazon business cart(businessCart)

const cart = new Cart('cart-oop')
const businessCart = new Cart('businessCart') // with classes, we need to use the keyword (new)


console.log(cart)
console.log(businessCart)
