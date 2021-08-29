var v0, v1, v2, player_angle;


function Bullet(x_, y_, d_,s_, shooter, weapon_,type, radius, explosive,next,star) {
	this.x = x_;
	this.y = y_;

	if (radius) {
		this.r = radius
	
	}
	else {
		this.r = 1
		
	}
    this.prog = 0;
  	this.dir = d_;
  	this.boss = false;
	this.weapon = weapon_

	if (explosive) {
		if (explosive == "bot") {
			this.bot = true;
		}
		else {
			this.ex = true;
		}
	}
	else {
		this.ex = false;
	}
	if (next) {
		this.ne = true
	}
	else {
		this.ne = false
	}
	this.n = 0;

	if (shooter == "player") {
		this.player = true;
	}
	else {
		this.player = false;
	}
	if (shooter == "boss") {
		this.boss = true;
		this.t = type;
	}
	if (shooter == "player") {
		if (star) {
			this.speed = 0;
			this.dam = 0;
		}
		else {	
			this.speed = weapons[this.weapon-1][2]*2;
			this.dam = weapons[this.weapon-1][3]*3;
		}
		
	}
	else if (shooter == "ghost"){
		this.speed = g_weapons[this.weapon-1][2]*2;
		this.dam = g_weapons[this.weapon-1][3];
	}
	else {
		console.log(b_weapons, this.weapon-1)
		this.speed = b_weapons[this.weapon-1][1][this.t][1]*2;
		this.dam = b_weapons[this.weapon-1][1][this.t][2];
	}
	
}
Bullet.prototype.show = function() {
	var d = this.dir
	var x = (width/2-player.x)+this.x//this.x;
	var y = (height/2-player.y)+this.y//this.y;

	if (this.player) {
		weapons[this.weapon - 1][4].draw(x,y,d,player,this.prog)
		
	}
	else {
		if (!this.boss) {
			g_weapons[this.weapon - 1][4].draw(x,y,d,this.prog)
		}
		else {
			
			b_weapons[this.weapon - 1][1][this.t][3].draw(x,y,d,this.prog)
		}
	}
}
Bullet.prototype.explode = function() {
	var x = this.x//this.x;
	var y = this.y//this.y;
	var d = this.dir;
	var i = index(Math.round(x/w),Math.round(y/w))

	
	if (x > w*2 && x < cols*w-w*2 && grids[room][i] && grids[room][i+1] && grids[room][i-1] && grids[room][i+cols] && grids[room][i-cols] && grids[room][i+2] && grids[room][i-2] && grids[room][i+(cols*2)] && grids[room][i-(cols*2)] && grids[room][i+cols-1] && grids[room][i-cols-1] && grids[room][i-cols+1] && grids[room][i+cols+1]) {
		setTimeout(function() {
			grids[room][i].walls = [false,false,false,false]
			grids[room][i+1].walls = [false,false,false,false]
			grids[room][i-1].walls = [false,false,false,false]
			grids[room][i+cols].walls = [false,false,false,false]
			grids[room][i-cols].walls = [false,false,false,false]
			grids[room][i+2].walls[3] = false
			grids[room][i-2].walls[1] = false;
			grids[room][i+(cols*2)].walls[0] = false;
			grids[room][i-(cols*2)].walls[2] = false;
			grids[room][i+cols-1].walls[0] = false; 
			grids[room][i+cols-1].walls[1] = false;
			grids[room][i-cols-1].walls[1] = false; 
			grids[room][i-cols-1].walls[2] = false;
			grids[room][i+cols+1].walls[0] = false; 
			grids[room][i+cols+1].walls[3] = false; 
			grids[room][i-cols+1].walls[2] = false; 
			grids[room][i-cols+1].walls[3] = false; 
			grids[room][i+1].visited = true;
			grids[room][i-1].visited = true;
			grids[room][i+cols].visited = true;
			grids[room][i-cols].visited = true;
			grids[room][i+2].visited = true;
			grids[room][i-2].visited = true;
			grids[room][i+(cols*2)].visited = true;
			grids[room][i-(cols*2)].visited = true;
			grids[room][i+cols-1].visited = true;
			grids[room][i-cols-1].visited = true;
			grids[room][i-cols+1].visited = true;
			grids[room][i+cols+1].visited = true;
		}, 120);
	}	
	
	explosions.push(new Explosion(Math.round(x/w),Math.round(y/w), 450, this.player))


	
}
Bullet.prototype.update = function() {
	var d = this.dir;
	var x = this.x;
	var y = this.y;
	
	this.prog++;
	let check = true;
	let e;

		
	if (this.weapon ==3 && this.t == 0 && this.boss && ghosts_ch[room][0]) {
		 
		let go = ghosts_ch[room][0]
		for (o=0;o<go.ls.length;o++) {
			let m1 = (player.y+w/4-go.ls[o][3])/(player.x+w/4-go.ls[o][2])
			if (Math.round(go.ls[o][4]*5) ==Math.round(m1*5) && dist(player.x+w/4,player.y+w/4,go.ls[o][2],go.ls[o][3]) <= dist(go.ls[o][0],go.ls[o][1],go.ls[o][2],go.ls[o][3])) {
				player.hp -= 0.01;
			}
		}
	}
	
	if(dist(this.x,this.y,player.x+w/4,player.y+w/4) <= this.r + 2 + w/4 && !this.player) {
		player.hp -= this.dam / (ghost_a*5);
		if (((this.weapon == 2 || this.weapon == 7) && !this.boss) || this.boss && this.weapon == 2 && this.t != 3) {this.explode()}
		bullets.splice(bullets.indexOf(this),1)
		if (player.hp <= 0) {
			message = "You were shot by a ghost"
		}
		return true;
	}
		
	
	if (this.boss && this.weapon == 2 && this.t == 1) {
		let v1 = createVector(this.x,0)
	    let v0 = createVector(this.x, this.y);
	    let v2 = createVector((player.x+w/2)-this.x,(player.y+w/2)-this.y);
	    let angle = v1.angleBetween(v2);

	  	angle = degrees(angle).toFixed(1)
	  	if (player.y+w/2 < this.y) {
			angle = 360 - angle;
		}
		let a = int(angle);
		
		if (a - d < 180 || a - d < -180) {
			if (a < d) {
				this.dir -= 0.2
			}
			if (a > d) {
				this.dir += 0.2;
			}
		}
		else {
			if (a < d) {
				this.dir += 0.2
			}
			if (a > d) {
				this.dir -= 0.2;
			}
		}

		if (this.dir < 0) {
			this.dir += 360
		}
		if (this.dir > 360) {
			this.dir -= 360
		}
	}

	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))-1] && Math.round(x) / w == Math.floor(x/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))-1].walls[1] && this.dir > 90 && this.dir < 270) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		check = false;
		e = 1;
	}
	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))+1] && Math.round(x) / w == Math.ceil(x/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))+1].walls[3] && (this.dir < 90 || this.dir > 270)) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		check = false;
		e = 2;
	}
	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))+cols] && Math.round(y) / w == Math.ceil(y/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))+cols].walls[0] && this.dir < 180 && this.dir > 0) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		check = false;
		e = 3;
	}
	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))-cols] && Math.round(y) / w == Math.floor(y/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))-cols].walls[2] && this.dir > 180 && this.dir < 360) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		check = false;
		e = 4;
	}
	if (check) {
		let new_x = 0.5 * cos(radians(this.dir));
		let new_y = 0.5 * sin(radians(this.dir));
		this.x += new_x;
		this.y += new_y;
		//this.y = Math.round(this.y)
		//this.x = Math.round(this.x)

	}
	else {
		
		if ((!this.boss && (this.weapon == 2 || this.weapon == 7))){
			this.explode()
			console.log(this.boss)
		}
		else if (this.boss && this.t == 0 && this.weapon == 2)  {
			console.log(this.t)
			explosions.push(new Explosion(Math.round(x/w),Math.round(y/w), 220, this.player))
		}
		if (this.boss && this.t == 0 && this.ex && this.ne) {
			for (o=0;o<9;o++) {
				let an = int(d) + 180 + random(-70,70)
				if (an > 360) {
					an -= 360
				}

				bullets.push(new Bullet(this.x, this.y, an,9,"boss", 2,0,35,true,false))
			}
		}
		else if (this.boss && this.t == 0 && this.ex) {
			for (o=0;o<3;o++) {
				let an = int(d) + 180 + random(-70,70)
				if (an > 360) {
					an -= 360
				}
				bullets.push(new Bullet(this.x, this.y, an,9,"boss", 2,0,35,false,false))
			}
		}
		if (this.weapon == 11 && this.player)  {
			
			bullets.shift(new Bullet(this.x, this.y,this.dir,0,"player", 11,false,false,true))
			console.log(bullets[0].speed)
			bullets.splice(bullets.indexOf(this), 1)
			setTimeout(function(){
				bullets.splice(0,1)
			}, 1000)
		}
		else {
			bullets.splice(bullets.indexOf(this), 1)
		}
		
		if (this.player) {
			player.lostHits += 2;
		}
		return true;
	}

}

function Explosion(a,b,c,d,e,f,g) {
	this.x = a*w
	this.y = b*w
	this.radius = 25;

	this.circles = []
	this.op = 2
	this.player = d;
	this.speed = 0.3

	if (e) {
		this.speed = e;
	}
	if (f) {
		this.radius = f;
	}
	if (g) {
		this.op = g;
	}
	for(var i = 0; i < 5; i++) {
			//this.circles.push([random(this.x-30, this.x+30), random(this.y-30, this.y+30), random(this.radius-30, this.radius+40)])
	}

	this.timeout = setTimeout(function(){explosions.splice(explosions.indexOf(this), 1)}, c)

	if (grids[room][index(a,b)] && !grids[room][index(a,b)].visited) {
		//clearTimeout(this.timeout)
		explosions.splice(explosions.indexOf(this), 1)
	}
}
Explosion.prototype.update = function() {
	this.radius += this.speed
	if (frameCount % this.op == 0) {
		this.circles.push([random(this.x-60, this.x+60), random(this.y-60, this.y+60), random(this.radius-25, this.radius+25), color(255,random(55,255),0), this.player])
	}
	if (this.radius > 80) {
		explosions.splice(explosions.indexOf(this), 1)
	}
}
Explosion.prototype.show = function() {
	strokeWeight(6)
	noFill();
	
	for(var c = 0; c < this.circles.length; c++) {
		stroke(this.circles[c][3])
		circle((width/2-player.x)+this.circles[c][0], (height/2-player.y)+this.circles[c][1], this.circles[c][2])
		//console.log([this.circles[i][0], this.circles[i][1], this.circles[i][2]])
	}
}

function Flame(a,b,c, d, e,f,g) {
	this.x = random(a-f, a+f);
	this.y = random(b-f, b+f);

	this.ox = d
	this.oy = e

	this.color = color(255,random(55,255),0)

	this.dir = c

	this.timeout = setTimeout(function(){fire.splice(fire.indexOf(this), 1)}, 300)

	this.speed = f

	this.limit = f/10;

	this.radius = random(2,15)

	this.player = g;

	this.show = function() {
		var d = this.dir;
		stroke(this.color)
		
		if (d == 1 || d == 2) {
			ellipse(this.x,this.y, this.radius, this.radius/2);
		}
		else {
			ellipse(this.x,this.y, this.radius/2, this.radius);
		}
	}

	this.update = function() {
		var d = this.dir;
		var x = this.x;
		var y = this.y;

	
		for (var i = 0; i < this.speed; i++) {
			if (d == 1 && x > 0 && grids[room][index(Math.floor(x/w),Math.floor(y/w))] && !grids[room][index(Math.floor(x/w),Math.floor(y/w))].walls[1]) {
				this.x -= 1;
			}
			else if (d == 2 && x < width && grids[room][index(Math.floor(x/w),Math.floor(y/w))] && !grids[room][index(Math.floor(x/w),Math.floor(y/w))].walls[3]) {
				this.x += 1;
			}
			else if (d == 3 && y < height && grids[room][index(Math.floor(x/w),Math.floor(y/w))] && !grids[room][index(Math.floor(x/w),Math.floor(y/w))].walls[0]) {
				this.y += 1;
			}	
			else if (d == 4 && y > 0 && grids[room][index(Math.floor(x/w),Math.floor(y/w))] && !grids[room][index(Math.floor(x/w),Math.floor(y/w))].walls[2]) {
				this.y -= 1;
			}
			else {
				fire.splice(fire.indexOf(this), 1)
				break
				return true;
			}
		}

		if (frameCount % 100 && this.speed > this.limit) {
			this.speed -= 1;
		}
		return false;
	}
}