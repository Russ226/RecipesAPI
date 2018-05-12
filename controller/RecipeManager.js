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

function quertByNameMultiple(recipeNames, callback){
	// try{
	// 	var results = [];
	// }finally{
	// 	recipeName.forEach((recipe)=> {
	// 		queryByNameSingle(recipe, ()
	// 	});
	// }
}


module.exports = {insertSingleRecipe, bulkInsertRecipe, queryByNameSingle};