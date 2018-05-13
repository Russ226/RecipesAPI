const assert = require('assert');
const mongoose = require("mongoose");
const RecipeManager = require("../controller/RecipeManager.js");


describe("querying", function(){
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


	it("query by single name", function(done){
		var newRecipe1 = {
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


		new Promise((resolve, reject)=>{
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
			
		}).then(() => {
			RecipeManager.queryByNameSingle(newRecipe1['name'], (callback)=>{
				try{
					assert(callback['name'] === newRecipe1['name']);
					done();

				}catch(err){
					done(err);
				}
		
			});

		});

		new Promise((resolve, reject)=>{
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
			
		}).then(() => {
			RecipeManager.queryByNameSingle("fdsfsdf", (callback)=>{
				 	try{
				 		assert(callback === null);
				 		
				 	}catch(err){
				 		done(err);
				 	}
				 	
				});
		});

	});


	it("query by multiple name ", function(done){
		var newRecipe1 = {
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


		var newRecipe2 = {
			name: "Mom's Scalloped Potatoes",
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


		new Promise((resolve, reject)=>{
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
			
		}).then(() => {
			try{
				return RecipeManager.insertSingleRecipe(newRecipe2);
			}catch(err){
				done(err);
			}
		}).then(() => {
			RecipeManager.queryByNameMultiple(newRecipe1['name'].split(" "), new Set(),(callback)=>{
				
				try{
					assert(callback !== null);
					done();

				}catch(err){
					done(err);
				}
			});
		});
	});

	it("search by ingredient" , function(done){
		var newRecipe1 = {
			name: "Basic Mashed Potatoes",
			ingredients: [
				{
					name:"baking potatoes, peeled and quartered",
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


		var newRecipe2 = {
			name: "Mom's Scalloped Potatoes",
			ingredients: [
				{
					name:"baking potatoes, peeled and quartered",
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


		new Promise((resolve, reject)=>{
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
			
		}).then(() => {
			try{
				return RecipeManager.insertSingleRecipe(newRecipe2);
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.searchByIngredient("butter", (result) =>{
				try{
					assert(result.length != null);
					done(console.log(result));
				}catch(err){
					done(err);
				}
				
			});
		});
	});
});