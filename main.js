'use strict';

let recipe = {};
let i = 0;
let subtotalPrice = 0;
let totalPrice = 0;
let shippingCost= 0;
let ingredientsArray = [];
const selectItems = document.querySelector('.select__item');
const unselectItems = document.querySelector('.unselect__item');
const itemsSelected = document.querySelector('.items__selected');
const subtotalAmmount = document.querySelector('.subtotal__ammount');
const totalAmmount = document.querySelector('.total__ammount');
const purchaseButton = document.querySelector('.purchase__btn');



function getRecipes () {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then( data => {
        recipe = data.recipe;
        changeTitle (recipe);
        createIngredient(recipe);
        changeShippingCost(recipe);
    })
}
 
function changeTitle (data) {
    const headerSubtitle = document.querySelector('.header__subtitle');
    headerSubtitle.innerHTML = data.name;
}
function changeShippingCost(data) {
    const shippingCostText = document.querySelector('.shipping__cost');
    shippingCostText.innerHTML = data['shipping-cost'] + ' €';
}

function createItems(element) {
    return document.createElement(element);
}

function createContent(text) {
    return document.createTextNode(text);
}

function createIngredient (data){
     shippingCost= parseFloat(data['shipping-cost']);

    for (const ingredient of data.ingredients) {
        const list = document.querySelector('.main__list');
        const id = ingredient.product.replace(/ /g, "")
        //create li
        const listItem = createItems('li');
        listItem.classList.add('list-group-item', 'd-flex', 'flex-row', 'justify-content-start');

        list.appendChild(listItem);
        //create checkbox
        const checkbox = createItems('input');
        checkbox.classList.add('checkbox');
        checkbox.type = "checkbox";
        checkbox.id = id;
        checkbox.value = id;
        checkbox.name = 'ingredientsToPurchase';
        listItem.appendChild(checkbox);        
        checkbox.addEventListener('change', () => {
             const number = ingredient.items;
             const price = ingredient.price;
         
            if(checkbox.checked) {
                i = i + number;
                subtotalPrice= subtotalPrice + (number * price);
            }
            else {
                if(i === 0) {
                    i = 0;
                    subtotalPrice = 0;
                }else {
                    i = i - number;
                    subtotalPrice= subtotalPrice - (number * price);
                }
            }
            writeTotals();
        });

        let ingredientObj = {
            checkbox: checkbox,
            number: ingredient.items,
            subtotal: ingredient.items * ingredient.price
        }
        ingredientsArray.push(ingredientObj);
        
        //create items needed
        const numberOfItems = createItems('p');
        listItem.appendChild(numberOfItems);
        const numberOfItemsNeeded = createContent(ingredient.items);
        numberOfItems.appendChild(numberOfItemsNeeded);
        //create div with product details
        const productDetails = createItems('ul');
        listItem.appendChild(productDetails);
        //create name
        const product = createItems('li');
        const label = createItems('label');
        label.setAttribute('for', id);
        product.appendChild(label);
        productDetails.appendChild(product);
        const productName = createContent(ingredient.product);
        label.appendChild(productName);
        //create brand
        const brand = createItems('li');
        productDetails.appendChild(brand);
        const brandName = createContent(ingredient.brand ? ingredient.brand : 'sin marca');
        brand.appendChild(brandName);
        //create quantity
        const quantity = createItems('li');
        productDetails.appendChild(quantity);
        const quantityNeeded = createContent(ingredient.quantity);
        quantity.appendChild(quantityNeeded);
        //create price 
        const price = createItems('p');
        listItem.appendChild(price);
        const priceAmmount = createContent(ingredient.price + ' €');
        price.appendChild(priceAmmount);
    }
}

function writeTotals() {
    totalPrice = subtotalPrice + shippingCost;
    itemsSelected.innerHTML = 'Items: ' + i;
    subtotalAmmount.innerHTML = subtotalPrice.toFixed(2) + ' €';
    totalAmmount.innerHTML= totalPrice.toFixed(2) + ' €';
    purchaseButton.innerHTML= `Comprar ingredientes: ${totalPrice.toFixed(2)} €`;
}

function selectAllItems () {
    i = 0;
    subtotalPrice = 0;
    for (const ingredient of ingredientsArray) {
        ingredient.checkbox.checked = true;
        i = i + ingredient.number;
        subtotalPrice = subtotalPrice + ingredient.subtotal;
    }
    writeTotals();
 }

 function unselectAllItems () {
    i = 0;
    subtotalPrice = 0;
    
    for (const ingredient of ingredientsArray) {
        ingredient.checkbox.checked = false;
    }
    writeTotals();
 }

 selectItems.addEventListener('click', selectAllItems);
 unselectItems.addEventListener('click', unselectAllItems);


 getRecipes();


