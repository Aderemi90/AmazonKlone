import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
// import { formatCurrency } from "../scripts/Utils/money.js";
// import {products, loadProducts} from '../data/products.js';

// const products = [{
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating:{
//         stars: 4.5,
//         rating:87
//     },
//     priceCents: 1090
// },
// {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating:{
//         stars: 4,
//         reviews: 127
//     },
//     priceCents: 2095
// },{
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//         stars: 4.5,
//         reviews: 56
//     },
//     priceCents: 799
// },{
//         image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating: {
//         stars: 5,
//         reviews: 2197
//     },
//     priceCents: 1899
// }];
// The above is a data structure, its a structure that organises 
// the data and this represents a list of data. The combination of o
// objects and arrays are used to create a data structure.

//To generate the HTML instead of generating manually.
//To generate, we loop the products.

// loadProducts(renderProductsGrid);

/*
function renderProductsGrid(){
    let productHTML ='';

    products.forEach((product)=>{
    productHTML += `<div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}"> 
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}
            ${product.extraInfoLinkHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-checkmarks-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${product.id}">
            Add to Cart
            </button>
        </div>`
        //To show a number with decimal places, we use 'toFixed()' method
        document.querySelector('.js-products-grid').innerHTML = productHTML 
    })

    // NOTE: The ${product.extraInfoHTML()} above is called polymorphism.
    // its a use of a methid without knowing the class whether product or clothing
    //

    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
        
        button.addEventListener('click', ()=>{
            // console.log('Added Product')
            // We can use the push attribute to push into the cart but
            // how do we know exactly what to push.
            // Solution:
            // 1. We use the data attribute. This is an HTML attribute.
            // 2. It allows us to attach an information to an HTML element.
            // 3. Used after the class closing hyphen.
            // 4. Must use keyword data-(then anyother thing seperated with dash(-))
            // 5. Check Add to Cart for the above example
            // 6. Data attribute has name and value attribute(data-product-name="${product.name}")
            // 7. Dataset property gives us the data attribute attached to the 
            //button 
            // 8. With Dataset, the name will change from data-product-name to productName
            // console.log(remi.dataset.productName).

            // To make the quantity work
            //1. Check if the product is already in the cart.
            //2. if it is in the cart, increase the quantity
            //3. if not, add it to the cart

            // NOTE: Product name was later changed to productId to distinguish between same product but different identity
            
            // const productId = button.dataset.productId;
            const {productId} = button.dataset
                
            addToCart(productId)
            updateCartQuantity()
            activateCheckMark()
            // Its bad to use a product name because a product with different
            // brands can have the same name so we can now use a unique id to 
            // differentiate.

        
            function updateCartQuantity(){
            //To calculate the total quantity in the cart
                let cartQuantity = 0;

                cart.forEach((cartItem) => {
                    cartQuantity += cartItem.quantity;
                });
                document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
            }
            
        
            function activateCheckMark(){
                const checkmarkButton = document.querySelector(`.js-checkmarks-${productId}`)
                console.log(productId)
                checkmarkButton.classList.add('checkmarkToggle')
                clearTimeout(setInterval)
                setInterval = setTimeout(() => {
                checkmarkButton.classList.remove('checkmarkToggle');
                }, 1000);
            
            }
        })

    })

}
    */
let productHTML ='';

    products.forEach((product)=>{
    productHTML += `<div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}"> 
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}
            ${product.extraInfoLinkHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-checkmarks-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${product.id}">
            Add to Cart
            </button>
        </div>`
        //To show a number with decimal places, we use 'toFixed()' method
        document.querySelector('.js-products-grid').innerHTML = productHTML 
    })

    // NOTE: The ${product.extraInfoHTML()} above is called polymorphism.
    // its a use of a methid without knowing the class whether product or clothing
    //

    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
        
        button.addEventListener('click', ()=>{
            // console.log('Added Product')
            // We can use the push attribute to push into the cart but
            // how do we know exactly what to push.
            // Solution:
            // 1. We use the data attribute. This is an HTML attribute.
            // 2. It allows us to attach an information to an HTML element.
            // 3. Used after the class closing hyphen.
            // 4. Must use keyword data-(then anyother thing seperated with dash(-))
            // 5. Check Add to Cart for the above example
            // 6. Data attribute has name and value attribute(data-product-name="${product.name}")
            // 7. Dataset property gives us the data attribute attached to the 
            //button 
            // 8. With Dataset, the name will change from data-product-name to productName
            // console.log(remi.dataset.productName).

            // To make the quantity work
            //1. Check if the product is already in the cart.
            //2. if it is in the cart, increase the quantity
            //3. if not, add it to the cart

            // NOTE: Product name was later changed to productId to distinguish between same product but different identity
            
            // const productId = button.dataset.productId;
            const {productId} = button.dataset
                
            addToCart(productId)
            activateCheckMark()
            updateCartQuantity()

            // Its bad to use a product name because a product with different
            // brands can have the same name so we can now use a unique id to 
            // differentiate.

        
            function updateCartQuantity(){
            //To calculate the total quantity in the cart
                let cartQuantity = 0;

                cart.forEach((cartItem) => {
                    cartQuantity += cartItem.quantity;
                });
                document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
            }
            
        
            function activateCheckMark(){
                const checkmarkButton = document.querySelector(`.js-checkmarks-${productId}`)
                checkmarkButton.classList.add('checkmarkToggle')
                clearTimeout(setInterval)
                setInterval = setTimeout(() => {
                checkmarkButton.classList.remove('checkmarkToggle');
                }, 1000);
            
            }
        })

    })
