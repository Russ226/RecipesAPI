const assert = require('assert');
const mongoose = require("mongoose");
const RecipeManager = require("../controller/RecipeManager.js");
const Model = require("../model/RecipeModel.js");


describe("update", function(){
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

	it("updating recipe name", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateRecipeName("Basic Mashed Potatoes", "Mashed Potatoes", (returnValue) => {
				Model.Recipe.findOne({name: "Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['name'] === "Mashed Potatoes");
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});

	it("updating ingredient name field", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateIngredient("Basic Mashed Potatoes", "butter", "name", "lard",  (returnValue) => {
				Model.Recipe.findOne({name: "Basic Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['ingredients'][1]['name'] === "lard");
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});

	it("updating ingredient amount field", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateIngredient("Basic Mashed Potatoes", "butter", "amount", 44,  (returnValue) => {
				Model.Recipe.findOne({name: "Basic Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['ingredients'][1]['amount'] === 44);
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});

	it("updating ingredient name field", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateIngredient("Basic Mashed Potatoes", "butter", "name", "lard",  (returnValue) => {
				Model.Recipe.findOne({name: "Basic Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['ingredients'][1]['name'] === "lard");
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});

	it("updating ingredient unit field", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateIngredient("Basic Mashed Potatoes", "butter", "unit", "lb",  (returnValue) => {
				Model.Recipe.findOne({name: "Basic Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['ingredients'][1]['unit'] === "lb");
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});


	it("updating instruction stepNumber", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateInstructions("Basic Mashed Potatoes", 1, "stepNumber", 5,  (returnValue) => {
				Model.Recipe.findOne({name: "Basic Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['instructions'][0]['stepNumber'] === 5);
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});

	it("updating instruction stepNumber", function(done){
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
		new Promise((resolve, reject) => {
			try{
				resolve(RecipeManager.insertSingleRecipe(newRecipe1));
			}catch(err){
				done(err);
			}
		}).then(()=>{
			RecipeManager.updateInstructions("Basic Mashed Potatoes", 1, "description", "the gun is good",  (returnValue) => {
				Model.Recipe.findOne({name: "Basic Mashed Potatoes"}).exec().then((result) => {
					try{
						assert(result['instructions'][0]['description'] === "the gun is good");
						done();
					}catch(err){
						done(err);
					}
					
				});
			});
		});
		
	});

});