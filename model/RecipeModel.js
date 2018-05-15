var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connection  =  mongoose.connect("mongodb://localhost/recipe");

const ingredientSchema = new Schema({
	name: String,
	amount: Number,
	unit: String
});

const instructionSchema = new Schema({
	stepNumber: Number,
	description: String
});

const recipeSchema = new Schema({
	name: {
			type: String, 
			unique: true
		},
	ingredients: [ingredientSchema],
	instructions : [instructionSchema]
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = {Recipe, connection};