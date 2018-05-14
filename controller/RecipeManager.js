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
	
	
		
	recipe.Recipe.findOne({name : recipeName}).exec().then((result) => {
		if(result != null){
			callback(result);

		}else{
			callback(null);
		}

	});

		
	
	
}

/*still working on this shit ugghhh*/
function helperMultipleNames(searchItem, callback){
	recipe.Recipe.find({name: '/^'+ searchItem +'/'}).exec().then((searchResult) =>{
		if(searchResult != null){
			callback(searchResult);
		}else{
			callback(null);
		}
	});
}

function queryByNameMultiple(recipeNames,callback){
	helperMultipleNames(recipeNames, (result)=>{
		callback(result);
	});
}

/*ingredients*/

function searchByIngredient(ingredient, callback){
	recipe.Recipe.find({ingredients: {$elemMatch: {name: ingredient}}}).exec().then((result) =>{
		callback(result);
	});
}


/*update fields*/

/*update name*/
function updateRecipeName(recipeName, newName, callback){
	
	recipe.Recipe.findOne({name: recipeName}).exec().then((result) => {
		if(result != null){
			try{
				result.name = newName;
			}finally{
				result.save((err, success) => {
					if(err) throw err;
					callback(true)
				});
			}
			
		}else{
			callback(false);
		}
	});
	
}

//update ingredients
//fuck the mongodb db docs they didnt work =(
function updateIngredient(recipeName, ingredientToUpdate, field, newUpdate, callback){
	// try{
	// 	recipe.Recipe.updateOne({name: recipeName, "ingredients.name": ingredientToUpdate}, {$set: {'ingredients.$.name': "fsdfsd"}});
	// }finally{
	// 	callback(true)
	// }
	
	recipe.Recipe.findOne({name: recipeName}).exec().then((result) => {
		if(result != null){
			result.ingredients.forEach((ingredient) =>{
				if(field == 'name'){
					if(ingredient.name == ingredientToUpdate){
						try{
							ingredient.name = newUpdate;
						}finally{
							result.save((err, success) => {
								if(err) throw err;
								callback(true)
							});
						}					
					}
				}else if(field == 'amount'){
					if(ingredient.name == ingredientToUpdate){
						try{
							ingredient.amount = newUpdate;
						}finally{
							result.save((err, success) => {
								if(err) throw err;
								callback(true)
							});
						}					
					}
				}else if(field == "unit"){
					if(ingredient.name == ingredientToUpdate){
						try{
							ingredient.unit = newUpdate;
						}finally{
							result.save((err, success) => {
								if(err) throw err;
								callback(true)
							});
						}					
					}
				}else{
					callback(false);
				}

				
			});
		
			
		}else{
			callback(false);
		}
	});
		
}

// update instructions
function updateinstructions(recipeName, instructionStep, field, newUpdate, callback){
	recipe.Recipe.findOne({name: recipeName}).exec().then((result) => {
		if(result != null){
			result.instructions.forEach((instruction) =>{
				if(field == stepNumber){
					if(instruction.stepNumber == instructionStep{
						try{
							instruction.stepNumber = newUpdate;
						}finally{
							result.save((err, success) => {
								if(err) throw err;
								callback(true)
							});
						}					
					}
				}else if(field == description){
					if(instruction.description == instructionStep){
						try{
							instruction.description = newUpdate;
						}finally{
							result.save((err, success) => {
								if(err) throw err;
								callback(true)
							});
						}					
					}
				}else{
					callback(false);
				}

				
			});
		
			
		}else{
			callback(false);
		}
	});
}

module.exports = {insertSingleRecipe, bulkInsertRecipe, queryByNameSingle, queryByNameMultiple, searchByIngredient, updateRecipeName, updateIngredient};