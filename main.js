'use strict';

let recipe = {};
let i = 0;
const selectItems = document.querySelector('.select__item');
const unselectItems = document.querySelector('.unselect__item');
const itemsSelected = document.querySelector('.items__selected');
let ingredientsArray = [];


function getRecipes () {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then( data => {
        recipe = data.recipe;
        console.log(recipe);
        changeTitle (recipe);
        createIngredient(recipe);
        changeShippingCost(recipe);
    })}
    
    
function changeTitle (data) {
    const headerSubtitle = document.querySelector('.header__subtitle');
    headerSubtitle.innerHTML = data.name;
}
function changeShippingCost(data) {
    const shippingCost = document.querySelector('.shipping__cost');
    shippingCost.innerHTML = data['shipping-cost'] + ' €';
}

function createItems(element) {
    return document.createElement(element);
}

function createContent(text) {
    return document.createTextNode(text);
}


function createIngredient (data){
    for (const ingredient of data.ingredients) {
        const list = document.querySelector('.main__list');
        const id = ingredient.product.replace(/ /g, "")
        //create li
        const listItem = createItems('li');
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
            if(checkbox.checked) {
                i = i + parseInt(ingredient.items);
                return   itemsSelected. innerHTML ='Items: ' + i;
            }
            else {
                if(i === 0) {
                    i = 0;
                    return     itemsSelected. innerHTML ='Items: ' + i;

                }else {
                    i = i - parseInt(ingredient.items);
                    return     itemsSelected. innerHTML ='Items: ' + i;

                }
            }
        });

        let ingredientObj = {
            checkbox: checkbox,
            number: ingredient.items
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


function selectAllItems () {
    i = 0;
    for (const ingredient of ingredientsArray) {
        ingredient.checkbox.checked = true;
        i = i + parseInt(ingredient.number);
    }
    itemsSelected.innerHTML = 'Items: ' + i;
 }
 selectItems.addEventListener('click', selectAllItems);

 function unselectAllItems () {
    i = 0;
    for (const ingredient of ingredientsArray) {
        ingredient.checkbox.checked = false;
    }
    itemsSelected.innerHTML = 'Items: ' + i;
 }

 unselectItems.addEventListener('click', unselectAllItems);


 getRecipes();


