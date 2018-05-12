const assert = require("assert");
const mongoose = require("mongoose");
const recipe = require("../model/RecipeModel.js");

describe("creating a new recipe entry", function(){
	
	
	beforeEach(function(done){
		mongoose.connect('mongodb://localhost/recipe',function(){
    		/* Drop the DB */
    		mongoose.connection.db.dropDatabase();
    		done();
		});
	});

	afterEach(function(done){
		mongoose.connect('mongodb://localhost/recipe',function(){
    		/* Drop the DB */
    		mongoose.connection.db.dropDatabase();
    		done();
		});
	});

	it("new recipe", function(done){
		

		var newRecipe = new recipe.Recipe({
			name: "Basic Mashed Potatoes",
			ingredients: [
				{
					name:" baking potatoes, peeled and quartered",
					amount: 2,
					unit: "pounds"
				},
				{
					name: "butter",
					amount: 2,
					unit: "tablespoons"
				},
				{
					name: "milk",
					amount: 1,
					unit: "cup"
				},
				{
					name: "salt and pepper",
					amount: 0,
					unit: "to taste"
				}
			],
			instructions:[
				{
					stepNumber: 1,
					description: "Bring a pot of salted water to a boil. Add potatoes and cook until tender but still firm, about 15 minutes; drain."
				},
				{
					stepNumber: 2,
					description: "In a small saucepan heat butter and milk over low heat until butter is melted. Using a potato masher or electric beater, slowly blend milk mixture into potatoes until smooth and creamy. Season with salt and pepper to taste. "
				}
			]
		});

		newRecipe.save().then(function(){
			recipe.Recipe.findOne({name:"Basic Mashed Potatoes"}).then(function(result){
				assert(result.ingredients.length === 4);
				done();

			});
		});

	});

	it("check for duplicates" , function(done){
		var newRecipe1 = new recipe.Recipe({
			name: "Basic Mashed Potatoes",
			ingredients: [
				{
					name:" baking potatoes, peeled and quartered",
					amount: 2,
					unit: "pounds"
				},
				{
					name: "butter",
					amount: 2,
					unit: "tablespoons"
				},
				{
					name: "milk",
					amount: 1,
					unit: "cup"
				},
				{
					name: "salt and pepper",
					amount: 0,
					unit: "to taste"
				}
			],
			instructions:[
				{
					stepNumber: 1,
					description: "Bring a pot of salted water to a boil. Add potatoes and cook until tender but still firm, about 15 minutes; drain."
				},
				{
					stepNumber: 2,
					description: "In a small saucepan heat butter and milk over low heat until butter is melted. Using a potato masher or electric beater, slowly blend milk mixture into potatoes until smooth and creamy. Season with salt and pepper to taste. "
				}
			]
		});

		var newRecipe2 = new recipe.Recipe({
			name: "Basic Mashed Potatoes",
			ingredients: [
				{
					name:" baking potatoes, peeled and quartered",
					amount: 2,
					unit: "pounds"
				},
				{
					name: "butter",
					amount: 2,
					unit: "tablespoons"
				},
				{
					name: "milk",
					amount: 1,
					unit: "cup"
				},
				{
					name: "salt and pepper",
					amount: 0,
					unit: "to taste"
				}
			],
			instructions:[
				{
					stepNumber: 1,
					description: "Bring a pot of salted water to a boil. Add potatoes and cook until tender but still firm, about 15 minutes; drain."
				},
				{
					stepNumber: 2,
					description: "In a small saucepan heat butter and milk over low heat until butter is melted. Using a potato masher or electric beater, slowly blend milk mixture into potatoes until smooth and creamy. Season with salt and pepper to taste. "
				}
			]
		});

		newRecipe1.save().then(function(){
			recipe.Recipe.findOne({name:"Basic Mashed Potatoes"}).then(function(result){
				assert(result.ingredients.length === 4);
				
			}).then(function(){
				newRecipe2.save(function(err){
					assert.ifError(err);
					done();
				});
			});
		});



	});
});

