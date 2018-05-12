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

function queryByNameMultiple(recipeNames, callback){
	// try{
	// 	var results = new Set();

	// }finally{
	// 	try{
	// 		recipeName.forEach((recipe) => {
	// 			queryByNameSingle(recipe, (result) => {
	// 				if(result != null){
	// 					results.add(result);
	// 				}
	// 			});
	// 		});
	// 	}catch(err){
	// 		console.log(err);

	// 	}finally{
	// 		callback(Array.from(results));

	// 	}
		

	// }

	new Promise((resolve, reject) => {
		resolve(new Set);
	}).then((newSet) => {
		try{
			recipeNames.forEach((recipe) => {
				queryByNameSingle(recipe, (result) => {
					if(result != null){
						newSet.add(result)
					}
				
				});
			});
		}finally{
			callback(Array.from(newSet));
		}
		
	});
}


module.exports = {insertSingleRecipe, bulkInsertRecipe, queryByNameSingle, queryByNameMultiple};