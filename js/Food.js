/*
 * 
 */
function Food(x,y,img) {
	this.row = x;
	this.col = y;
	this.img = img;
}

Food.prototype.reset = function(x,y) {
	this.row = x;
	this.col = y;
}
