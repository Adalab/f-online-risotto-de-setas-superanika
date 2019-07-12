'use strict';

let recipe = {};

function getRecipes () {
    fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
        .then(response => response.json())
        .then( data => {recipe = data;
            console.log(recipe);}
            )
}

getRecipes();