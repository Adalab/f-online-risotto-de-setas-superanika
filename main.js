'use strict';

let recipe = {};

function getRecipes () {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then( data => {
        recipe = data.recipe;
        console.log(recipe);
        changeTitle (recipe);
        createIngredients(recipe);
    }
        )
    }
    
    
function changeTitle (data) {
    const header__subtitle = document.querySelector('.header__subtitle');
    header__subtitle.innerHTML = data.name;
}

function createItems(element) {
    return document.createElement(element);
}

function createContent(text) {
    return document.createTextNode(text);
}

function createIngredients (data){
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

getRecipes();