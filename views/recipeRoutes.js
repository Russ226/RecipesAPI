var express = require('express');
var manager = require("../controller/RecipeManager.js");
var app = express();

var router = express.Router();






router.get("/", (req,res) => {
	res.send("Its working");
});

router.post("/new/single/recipe" , (req, res) => {
	try{
		manager.insertSingleRecipe(req.body);
	}catch(err){
		res.satus(500).send({message: err});
	}finally{
		res.status(201).send({message:"success"});
	}
	
	
});

router.post("/new/multiple/recipe" , (req, res) => {
	try{
		manager.bulkInsertRecipe(req.body);
	}catch(err){
		res.satus(500).send({message: err});
	}finally{
		res.status(201).send({message:"success"});
	}
	
	
});

router.get("/get/recipe/:recipeName", (req,res) => {
	try{

		manager.queryByNameSingle(req.params.recipeName.replace(/%20/g , ' ') , (result) => {
			res.send(result);
		});
	}catch(err){
		res.send({message: err});
	}
});
	


module.exports = router;