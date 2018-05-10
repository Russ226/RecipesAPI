/*
add new recipe
	- bulk or single insert

delete recipe

update recipes

query recipes
	- by name
	- by ingredient	
*/

const recipe = require("../model/RecipeModel.js");


function insertSingleRecipe(potRecipe){

	var newRecipe = new recipe.Recipe(potRecipe);

	newRecipe.save(function(err){
		if(err) return err;
	});

	return true;

}

function bulkInsertRecipe(recipes){

	
	for(var i = 0; i < recipes.length; i++){
		var newRecipe = new recipe.Recipe(recipes[i]);
		newRecipe.save(function(err){
			if(err) throw err;

		});
	}

	return true;

}

module.exports = {insertSingleRecipe, bulkInsertRecipe};