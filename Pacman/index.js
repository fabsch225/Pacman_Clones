var dev_mode = false;
var dev_debug = "dev_mode: enabled";
var lastCalledTime, fps;

var lib;

var gameover = true;
var message = "Welcome to Pacman"
var timer = true;

var cols, rows;
var w = 50;
var logo = false;

var grid = [];
var current;
var stack = [];
var finished = false;
var coinWidth = 11;
var cop = 0.2;
var ghost_a = 5

var player;
var shootPossible;
var reload = 0;
var weapons = [[600,"Tomato rifle", 8, 10],[6000,"Rocket Launcher", 5, 100], [120,"Assault rifle", 20, 4.2], [1250, "Shotgun", 20, 12], [100, "Flamethrower", 1,0]]
/*
*/
var difficulty = 10;

var coins = 0;
var allcoins = 0;
var fr_timer = 7;
var schutzzeit = true;

var ghosts = []

var bullets = [];

var explosions = [];

var fire = [];
p5.disableFriendlyErrors = true;
function setup() {
	frameRate(60);
	pixelDensity(1);
	createCanvas(windowWidth, windowHeight);
	lib = height * width / (w * w)
	cols = floor(width/w)
	rows = floor(height/w)
	//Math.seedrandom('Deine Mutter')

	new_maze()
}
function draw() {
	if (dev_mode) {
		if(!lastCalledTime) {
		    lastCalledTime = Date.now();
		    fps = 0;
		    var fps_counter = setInterval(function(){dev_debug = fps + " | " + getFrameRate()+ " | " + 60},500)
		}
		
		var delta = (Date.now() - lastCalledTime)/1000;
		lastCalledTime = Date.now();
		fps = 1/delta;
	}
	var nd;

	var x = player.x;
	var y = player.y;

	if (keyIsDown(87) || (mouseIsPressed && mouseX > width/2-100 && mouseX < width/2-100+200 && mouseY > 100 && mouseY < 175 )) {
		var ch = check(4,x,y);	
		if (x >= 0 && !ch[0][2] && !ch[1][2] && ch[2]) {
		   	player.dir = 4;	
		} 
	}
	if (keyIsDown(68) || (mouseIsPressed && mouseX > width-175 && mouseX < width-75 && mouseY > height/2-100 && mouseY < height/2+100 )) {
		var ch = check(2,x,y);	
		if (x <= width && !ch[0][1] && !ch[1][1] && ch[2]) {
		   	player.dir = 2;	
		} 
	}
	if (keyIsDown(83) || (mouseIsPressed && mouseX > width/2-100 && mouseX < width/2-100+200 && mouseY > height-175 && mouseY < height-75 )) {
		var ch = check(3,x,y);	
		if (y <= height && !ch[0][0] && !ch[1][0] && ch[2]) {
		   	player.dir = 3;	
		} 
	}
	if (keyIsDown(65) || (mouseIsPressed && mouseX > 75 && mouseX < 175 && mouseY > height/2-100 && mouseY < height/2+100 )) {
		var ch = check(1,x,y);	
		if (y >= 0 && !ch[0][3] && !ch[1][3] && ch[2]) {
		   	player.dir = 1;	
		} 
	}
	if (keyIsDown(32)) {
		var we = player.weapon
		if (shootPossible) {
			player.shoot();
			shootPossible = false;
			reload = weapons[we-1][0]/10;
			var interval = setInterval(function(){reload--}, 10)
			setTimeout(function(){shootPossible = true; clearInterval(interval); reload = 0}, weapons[we-1][0])
		}
	}
	if (keyIsDown(49)) {
		player.weapon = 1;
		reload = weapons[0][0]/10;
	}
	if (keyIsDown(50)) {
		player.weapon = 2;
		reload = weapons[1][0]/10;
	}
	if (keyIsDown(51)) {
		player.weapon = 3;
		reload = weapons[2][0]/10;
	}
	if (keyIsDown(52)) {
		player.weapon = 4;
		reload = weapons[3][0]/10;
	}
	if (keyIsDown(53)) {
		player.weapon = 5;
		reload = weapons[4][0]/10;
	}
	updateAll()
	if(!ghosts[0]) {
		gameover = true;
		message = "You killed all ghosts"
		new_maze();
		timer = false;
		setTimeout(function() {timer = true}, 1000);
	}
	showAll();
}
function menu() {
	stroke("red")
	noFill();
	strokeWeight(2)
	rect(width/2-100,75,200,100)
	rect(width-175,height/2-100,100,200)
	rect(width/2-100,height-175,200,100)
	rect(75,height/2-100,100,200)
}
function new_maze() {
	lib = height * width / (w * w)
	cols = floor(width/w)
	rows = floor(height/w)
	frameRate(60 / (45 / w))
	if (dev_mode && !document.getElementById("dev")) {
		var para = document.createElement("P");
  		para.innerHTML = "<p id='dev'></p>";
  		document.body.appendChild(para);
 	}
 	if (message == "You killed all ghosts") {
 		difficulty += 10;
 	}
 	shootPossible = true
 	bullets = [];
	coins = 0;
	grid = [];
	current = null;
	stack = [];
	finished = false;
	var rx = Math.floor(Math.random()*cols);
	var ry = Math.floor(Math.random()*rows);

	player = new newPlayer(rx*w,ry*w);
	reload = weapons[0][0]/10;
	for (var j = 0; j < rows; j++) {
		for (i = 0; i < cols; i++) {
			var newc = new cell(i,j);
			grid.push(newc);
		}
	}
	current = grid[index(rx,ry)];
	
	current.player = true

	generate()

	schutzzeit = true;
	fr_timer = 5;
	var fr_time = setInterval(function(){fr_timer--},1000)
	setTimeout(function() {
		schutzzeit = false;
		clearInterval(fr_time)	
	}, 5000)
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
