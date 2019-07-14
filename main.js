'use strict';

let recipe = {};
let i = 0;
let subtotalPrice = 0;
let totalPrice = 0;
let shippingCost= 0;
let ingredientsArray = [];
const selectItems = document.querySelector('.select__item');
const unselectItems = document.querySelector('.unselect__item');
const itemsSelected = document.querySelector('.items__number__selected');
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
        writeTotals();
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
        listItem.classList.add('list-group-item');
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
             const number = ingredientObj.number;
             const price = ingredient.price;
            if(checkbox.checked) {
                i = i + number;
                subtotalPrice= subtotalPrice + (number * price);
                numberOfItems.setAttribute('disabled', true);
                numberOfItems.classList.add('disabled');
            }
            else {
                if(i === 0) {
                    i = 0;
                    subtotalPrice = 0;
                }else {
                    i = i - number;
                    subtotalPrice= subtotalPrice - (number * price);
                }
                numberOfItems.classList.remove('disabled');
                numberOfItems.removeAttribute('disabled');

            }
            writeTotals();
        });
        //create items needed
        const numberOfItems = createItems('input');
        numberOfItems.classList.add('border', 'border-primary', 'items__number');
        listItem.appendChild(numberOfItems);
        numberOfItems.value = ingredient.items;
        numberOfItems.type = 'number';
        numberOfItems.addEventListener('change', (event => {
            const newNumber = event.currentTarget.value;
            ingredientObj = {...ingredientObj, number: newNumber};
            
            numberOfItems.value = ingredientObj.number;
        }))
        //create div with product details
        const productDetails = createItems('ul');
        productDetails.classList.add('list-group');
        listItem.appendChild(productDetails);
        //create name
        const product = createItems('li');
        product.classList.add('list-item');
        const label = createItems('label');
        label.setAttribute('for', id);
        label.classList.add('font-weight-bold', 'product__name');
        product.appendChild(label);
        productDetails.appendChild(product);
        const productName = createContent(ingredient.product);
        label.appendChild(productName);
        //create brand
        const brand = createItems('li');
        brand.classList.add('list-item', 'brand__name');
        productDetails.appendChild(brand);
        const brandName = createContent(ingredient.brand ? ingredient.brand : '');
        brand.appendChild(brandName);
        //create quantity
        const quantity = createItems('li');
        quantity.classList.add('list-item', 'quantity__needed');
        productDetails.appendChild(quantity);
        const quantityNeeded = createContent(ingredient.quantity);
        quantity.appendChild(quantityNeeded);
        //create price 
        const price = createItems('p');
        price.classList.add('price__container', 'text-success');
        listItem.appendChild(price);
        const priceAmmount = createContent(ingredient.price + ' €');
        price.appendChild(priceAmmount);

        let ingredientObj = {
            checkbox: checkbox,
            number: ingredient.items,
            price: ingredient.price,
            numberInput: numberOfItems
        }
        ingredientsArray.push(ingredientObj);
    }
}

function writeTotals() {
    totalPrice = subtotalPrice + shippingCost;
    itemsSelected.innerHTML = i;
    subtotalAmmount.innerHTML = subtotalPrice.toFixed(2) + ' €';
    totalAmmount.innerHTML= totalPrice.toFixed(2) + ' €';
    purchaseButton.innerHTML= `Comprar ingredientes: ${totalPrice.toFixed(2)} €`;
}

function selectAllItems () {
    i = 0;
    subtotalPrice = 0;
    for (const ingredient of ingredientsArray) {
        const numberOfItems= ingredient.numberInput;
        const number = ingredient.numberInput.value;
        const price = ingredient.price;
        ingredient.checkbox.checked = true;
        i = i + ingredient.number;
        subtotalPrice = subtotalPrice + (number * price);
        numberOfItems.setAttribute('disabled', true);
        numberOfItems.classList.add('disabled');
    }
    writeTotals();
 }

 function unselectAllItems () {
    i = 0;
    subtotalPrice = 0;
    
    for (const ingredient of ingredientsArray) {
        const numberOfItems= ingredient.numberInput;
        ingredient.checkbox.checked = false;
        numberOfItems.classList.remove('disabled');
        numberOfItems.removeAttribute('disabled');
    }
    writeTotals();
 }

 selectItems.addEventListener('click', selectAllItems);
 unselectItems.addEventListener('click', unselectAllItems);


 getRecipes();


