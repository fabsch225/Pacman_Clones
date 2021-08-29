var dev_mode = true;
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

var room =4;
var grids = []
var room_cols = 3;
var room_rows = 3;
var bosses = [];


var ghosts_ch = []
for (i = 0; i <= 9; i++) {
	ghosts_ch.push([])
}

var difficulty = 10;

var coins = 0;
var allcoins = 0;
var fr_timer = 7;
var schutzzeit = true;

var draw_fps = 30
var background_fps = 30


var bullets = [];

var explosions = [];

var fire = [];

var knifes = [];

p5.disableFriendlyErrors = true;


document.oncontextmenu = function() {
    return false;
}

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
	keycheck()
	
	updateAll()
	let len = 0;
	for (i = 0; i < ghosts_ch.length; i++) {
		len += ghosts_ch[i].length
	}


	if(len == 0) {
		gameover = true;
		message = "You killed all ghosts"
		new_maze();
		timer = false;
		setTimeout(function() {timer = true}, 1000);
	}
	if (frameCount % Math.floor(60/draw_fps) == 0){
		showAll();
	}
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
	lib = height * width / (w * w) * 2
	cols = floor(width/w)
	rows = floor(height/w)
 	shootPossible = true
 	bullets = [];
	coins = 0;

	grids = []
	room = 4;
	bosses = [];
	for (i = 0; i < 9; i++) {
		room = i;
		grids[i] = []

		for (j = 0; j < rows; j++) {
			for (m = 0; m < cols; m++) {
				var newc = new cell(m,j);
				grids[i].push(newc);
			}
		}

		shootPossible = true
	 	bullets = [];
		coins = 0;
		
		stack = [];
		finished = false;
		var rx = Math.floor(Math.random()*cols);
		var ry = Math.floor(Math.random()*rows);
		if (room == 4) {
			player = new newPlayer(rx*w,ry*w);
			reload = 0;
		}
		current = grids[room][index(rx,ry)];
		console.log(room, "room")
		generate()


	}
	for (i = 0; i < grids[room].length; i++) { 
		grids[room][i].show();
	}
	loadPixels();
	background(51)
	console.log(grids, ghosts_ch)
	room = 4;
	console.log(bosses)
	schutzzeit = true;
	fr_timer = 5;
	var fr_time = setInterval(function(){fr_timer--},1000)
	setTimeout(function() {
		schutzzeit = false;
		clearInterval(fr_time)	
	}, 5000)

	for (a = 0; a < ghosts_ch.length; a++) {
		for(b=0;b<ghosts_ch[a].length; b++) {
			
			if(!grids[a][index(ghosts_ch[a][b].x/w,ghosts_ch[a][b].y/w)] || !grids[a][index(ghosts_ch[a][b].x/w,ghosts_ch[a][b].y/w)].visited) {
				ghosts_ch[a].splice(b, 1)
			}
		}
	}



}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
