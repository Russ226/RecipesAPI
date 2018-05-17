var express = require('express');
var manager = require("../controller/RecipeManager.js");
var app = express();

var router = express.Router();





// test route
router.get("/", (req,res) => {
	res.send("Its working");
});

//new recipe
router.post("/new/single/recipe" , (req, res) => {
	try{
		manager.insertSingleRecipe(req.body);
	}catch(err){
		res.satus(500).send({message: err});
	}finally{
		res.status(201).send({message:"success"});
	}
});

// multipe inserts
router.post("/new/multiple/recipe" , (req, res) => {
	try{
		manager.bulkInsertRecipe(req.body);
	}catch(err){
		res.satus(500).send({message: err});
	}finally{
		res.status(201).send({message:"success"});
	}
});
// get by recipe name
router.get("/get/recipe/:recipeName", (req,res) => {
	try{

		manager.queryByNameSingle(req.params.recipeName.replace(/%20/g , ' ') , (result) => {
			res.send(result);
		});
	}catch(err){
		res.send({message: err});
	}
});
// get by ingredient name
router.get("/get/ingredient/:ingredientName", (req, res) =>{
	manager.searchByIngredient(req.params.ingredientName, (result) => {
		if(result == null || result.length < 1){
			res.send({message: "none found"})
		}else{
			res.send(result);
		}
	});
		
});
	
//update recipe name
router.put("/update/recipe/:recipeName/:newName" , (req,res) =>{
	manager.updateRecipeName(req.params.recipeName.replace(/%20/g , ' '), req.params.newName.replace(/%20/g , ' '), (result) => {
		if(result){ 
			res.status(200).send({messaage:"success"})
		}else{
			res.status(400).send({messaage:"fail"})
		}

	});
});

//update ingredient of recipe
router.put("/update/ingredient/:recipeName/:ingredientToUpdate/:field/:newUpdate" , (req,res) =>{
	manager.updateIngredient(req.params.recipeName.replace(/%20/g , ' '), req.params.ingredientToUpdate.replace(/%20/g , ' '), 
		req.params.field.replace(/%20/g , ' '), req.params.newUpdate.replace(/%20/g , ' '), (result) => {
		if(result){ 
			res.status(200).send({messaage:"success"})
		}else{
			res.status(400).send({messaage:"fail"})
		}

	});
});

//update instructions
router.put("/update/instructions/:recipeName/:instructionStep/:field/:newUpdate" , (req,res) =>{
	manager.updateInstructions(req.params.recipeName.replace(/%20/g , ' '), req.params.instructionStep.replace(/%20/g , ' '), 
		req.params.field.replace(/%20/g , ' '), req.params.newUpdate.replace(/%20/g , ' '), (result) => {
		if(result){ 
			res.status(200).send({messaage:"success"})
		}else{
			res.status(400).send({messaage:"fail"})
		}

	});
});

module.exports = router;