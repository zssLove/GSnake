/*
 * 
 */
function Game(block,food,map,snake) {
	this.block = block;
	this.food = food;
	this.map = map;
	this.snake = snake;
	this.flag = null;
	this.timer = null;
	this.init();
}

Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}

Game.prototype.renderMap = function() {
	this.map.fill();
}

Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	
//	this.map.arr[row][col].style.backgroundColor = "red";
	this.map.arr[row][col].style.backgroundImage = "url("+this.food.img+")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}

Game.prototype.renderSnake = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url("+this.snake.head_pic[this.snake.head_idx]+")";
	for(var i = 1; i < this.snake.arr.length - 1; i ++) {
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url("+this.snake.body_pic[0]+")";
	}
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url("+this.snake.tail_pic[this.snake.tail_idx]+")"
}

Game.prototype.start = function() {
	this.flag = true;
	var me = this;
	this.timer = setInterval(function() {
		me.snake.move();
		me.checkMap();
		me.checkFood();
		me.checkSnake();
		me.checkBlock();
		if(me.flag) {
			me.map.clear();
			me.renderFood();
			me.renderSnake();
			me.renderBlock();
		}
	},160)
}

Game.prototype.bindEvent = function() {
	var me = this;
	document.onkeydown = function(e) {
		var code = e.keyCode;
		if(code === 37 || code === 38 || code === 39 || code === 40) {
			me.snake.change(code);
		}
	}
}

Game.prototype.gameOver = function() {
	this.flag = false;
	clearInterval(this.timer);
}

Game.prototype.checkMap = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
//		console.log("撞墙了");
		this.gameOver();
	}
}

Game.prototype.checkFood = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	var food = this.food;
	if(head.row === food.row && head.col === food.col) {
//		console.log("吃到食物了");
		this.snake.growUp();
		this.resetFood();
	}
}

Game.prototype.resetFood = function() {
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	
	for (var i = 0; i < this.snake.arr.length; i++) {
		var one = this.snake.arr[i];
		if(one.row === row && one.col === col) {
//			alert("与蛇的身体重合了");
			this.resetFood();
			return;
		}
	}
	for (var i = 0 ; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (one.row === row && one.col === col) {
//			alert("食物与障碍物重合了");
			this.resetFood();
			return;
		}
	}
	this.food.reset(row,col);
}

Game.prototype.checkSnake = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	for (var i = 0 ; i < this.snake.arr.length - 1; i++) {
		var one = this.snake.arr[i];
		if(head.row === one.row && head.col === one.col) {
//			console.log("吃到自己身上了");
			this.gameOver();
		}
	}
}

Game.prototype.renderBlock = function() {
	for (var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url("+this.block.img+")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}

Game.prototype.checkBlock = function() {
	var head = this.snake.arr[this.snake.arr.length -1];
	for (var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (one.row === head.row && one.col === head.col) {
//			console.log("撞到障碍物了");
			this.gameOver();
		}
	}
}
