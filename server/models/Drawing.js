/*
 * Drawing Model
 */

var mongoose = require('mongoose');

var DrawingSchema = new mongoose.Schema({
	initColor: String,
	initSize: Number,
	initCanvas: String  //no idea how to store canvas, just guessing
});

mongoose.model('drawing', DrawingSchema);

module.exports = {
	initColor: "#FF4000",
	initSize:5
};