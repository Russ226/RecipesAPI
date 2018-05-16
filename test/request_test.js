const assert = require("assert");
const mongoose = require("mongoose");
const recipe = require("../model/RecipeModel.js");
const request = require("../views/recipeRoutes.js");
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = 'localhost:3000';



describe("post new recipe request", function(){
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

	it("single recipe post", function(done){
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

		chai.request(app).post("/new/single/recipe").send(newRecipe).end(function(err,res){
	
			recipe.Recipe.findOne({name:"Basic Mashed Potatoes"}).then(function(result){
				try{
					assert(result['name'] === "Basic Mashed Potatoes");
					done(console.log(res));
				}catch(err){
					done()
				}
				

			});
		});

	});

	it("Post duplicates", function(done){
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

		chai.request(app).post("/new/single/recipe").send(newRecipe).end(function(err1,res1){
			chai.request(app).post("/new/single/recipe").send(newRecipe).end(function(err2,res2){
				try{
					assert(null === null);
					done(console.log(res2));
				}catch(err){
					done(err);
				}
			});
		});

	});




});