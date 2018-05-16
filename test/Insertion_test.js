const assert = require('assert');
const mongoose = require("mongoose");
const RecipeManager = require("../controller/RecipeManager.js");
const recipe = require("../model/RecipeModel.js");


describe("inserting using functions", function(){
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


	it("single insert", function(done){
		var newRecipe = {
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
		};

		assert(RecipeManager.insertSingleRecipe(newRecipe) === true);
		recipe.Recipe.findOne({name:"Basic Mashed Potatoes"}).then(function(result){
				try{
					assert(result.ingredients.length === 4);
					done();

				}catch(err){
					done(err);
				}

		});
		

	});

	it("bulk insert", function(done){
		var newRecipes = [{
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
		},
		{
			name: "Basic Mashed Potatoes1",
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
		}];


		assert(RecipeManager.bulkInsertRecipe(newRecipes) === true);
		recipe.Recipe.findOne({name:"Basic Mashed Potatoes"}).then(function(result){
				try{
					assert(result.ingredients.length === 4);
					done();

				}catch(err){
					done(err);
				}

		});

	});


	it("bulk insert with duplicates", function(done){
		var newRecipes = [{
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
		},
		{
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
		},
		{
			name: "Basic Mashed Potatoes1",
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
		}];


		assert(RecipeManager.bulkInsertRecipe(newRecipes) === true);
		recipe.Recipe.findOne({name:"Basic Mashed Potatoes"}).then(function(result){
				try{
					assert(result.ingredients.length === 4);
					done();

				}catch(err){
					done(err);
				}
				

		});
		
	});


});