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
/*queries*/
/*recipes name*/
function queryByNameSingle(recipeName, callback){
	
	try{
		var query = recipe.Recipe.findOne({name : recipeName}).exec();	
	}finally{
		
			query.then((result) => {
				if(result != null){
					callback(result);

				}else{
					callback(null);
				}
				
			});
				
		
	}
	
}

/*stuck with this for now will look into it later*/
function helperMultipleNames(searchItem, callback){
	// {$regex: ".*" + "Potatoes" +".*"}
	recipe.Recipe.find({name: {$regex: ".*"+ searchItem +".*"} }).exec().then((searchResult) =>{
		if(searchResult != null){
			callback(searchResult);
		}else{
			callback(null);
		}
	});
}

function queryByNameMultiple(recipeNames, newSet ,callback){

	new Promise((resolve, reject) => {
		resolve(recipeNames.forEach((recipe) => {
					helperMultipleNames(recipe, (result)=>{
						//console.log(result);
					});
					
				}));

	}).then(() =>{
		callback(Array.from(newSet));
	});
}

/*ingredients*/

function searchByIngredient(ingredient, callback){
	recipe.Recipe.find({ingredients: {$elemMatch: {name: ingredient}}}).exec().then((result) =>{
		callback(result);
	});
}

module.exports = {insertSingleRecipe, bulkInsertRecipe, queryByNameSingle, queryByNameMultiple, searchByIngredient};