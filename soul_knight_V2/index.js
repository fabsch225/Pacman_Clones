p5.disableFriendlyErrors = true;

document.oncontextmenu = function() {
    return false;
}

function setup() {
	frameRate(60);
	pixelDensity(1);
	createCanvas(windowWidth, windowHeight);
	lib = height * width / (w * w)
	cols = floor(width/w/1.5)
	rows = floor(height/w/1.5)
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


	if(len == 0 && room_data[rooms.indexOf(room)].wave == max_waves) {
		gameover = true;
		message = "You killed all ghosts"
		new_maze();
		timer = false;
		setTimeout(function() {timer = true}, 1000);
	}
	if (ghosts_ch[room].length == 0 && room_data[rooms.indexOf(room)].wave != max_waves) {
		room_data[rooms.indexOf(room)].wave++
		spawnGhosts(room)
		fr_timer = 3;
		schutzzeit = true;
		var fr_time = setInterval(function(){fr_timer--},1000)
		setTimeout(function() {
			schutzzeit = false;
			clearInterval(fr_time)	
		}, 3000)
	}
	if (ghosts_ch[room].length == 0 && room_data[rooms.indexOf(room)].wave == max_waves && !player.clear[room]) {
		player.clear[room] = true;
		ms("clear")
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
	lib = height * width / (w * w)
	cols = floor(width/w)
	rows = floor(height/w)
	console.log(cols,rows)
 	shootPossible = true
 	bullets = [];
	coins = 0;
	
	
	grids = []
	room = 4;
	bosses = [];
	ghosts_ch = []
	for (i = 0; i <= room_a; i++) {
		ghosts_ch.push([])
	}
	for (i = 0; i < room_a; i++) {
		if (rooms.includes(i)) {
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
			
			var rx = Math.floor(Math.random()*(cols-6))+3;
			var ry = Math.floor(Math.random()*(rows-6))+3;
			
			
			if (room == 2) {
				player = new newPlayer(rx*w,ry*w);
				player.clear = [];
				reload = 0;
			}
			current = grids[room][index(rx,ry)];
			player.clear[room] = false;
			generate()
			spawnGhosts(i);
		}
	}
	for (i = 0; i < grids[room].length; i++) { 
		grids[room][i].show();
	}
	loadPixels();
	background(51)
	console.log(grids, ghosts_ch)
	room = 2;
	

	
	schutzzeit = true;
	fr_timer = 5;
	room_data[rooms.indexOf(room)].visited = true;
	var fr_time = setInterval(function(){fr_timer--},1000)
	setTimeout(function() {
		schutzzeit = false;
		clearInterval(fr_time)	
	}, 5000)

	

}

function spawnGhosts(r) {
	if (room_data[rooms.indexOf(r)].boss) {
		let m = 1;
		let c = 0;
		for (o=0;o<grids[r].length;o++) {
			if (grids[r][o].spawn && c < m) {
				c++
				ghosts_ch[r].push(new ghost(grids[r][o].x/w,grids[r][o].y/w,  Math.floor(Math.random()*b_weapons.length)+1,true))
			}
		}	
	}
	else {
		let m = ghost_a - (max_waves - room_data[rooms.indexOf(r)].wave);
		let c = 0;
		for (o=0;o<grids[r].length;o++) {
			if (grids[r][o].spawn && c < m) {
				c++
				ghosts_ch[r].push(new ghost(grids[r][o].x/w,grids[r][o].y/w, Math.floor(Math.random()*g_weapons.length)+1))
			}
		}
	}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function ms(s) {
	messages.push(new me(s))
}

function me(s_) {
	textSize(64)
	this.t = 64;
	this.s = s_;
	this.width = textWidth(s_)
	this.height = textSize();
	this.x = width/2-this.width/2
	this.y = 0;
	this.r = w/1.5;

	this.done = false;
	this.range = 70;

	this.kill = setTimeout(function(){
		messages.splice(messages.indexOf(this),1)
	}, 3000)
}

me.prototype.show = function() {
	textSize(this.t)
	console.log(this.s)
	strokeWeight(4)
	stroke("rgba(255,255,255,0.5)")
	noFill()
	rect(this.x,this.y,this.width,this.height)
	fill("rgba(255,255,255,0.5)")
	noStroke();
	text(this.s,this.x,this.y+this.height)
	strokeWeight(1)

}	

me.prototype.update = function() {
	if (!this.done) {
		this.y++
	}
	if (this.y > this.range) {
		this.done = true;
	}
}