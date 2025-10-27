import {cart} from '../../data/cart.js';

  export function renderCheckHeader(){
    let headerQuantity = 0;
    
    cart.forEach((cartItem)=>{

      headerQuantity += cartItem.quantity;
      document.querySelector('.js-checkout-quantity').innerHTML=`Checkout (${headerQuantity} items)`;
    })
  }
