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


module.exports = router;