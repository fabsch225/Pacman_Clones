var v0, v1, v2, player_angle;


function Bullet(x_, y_, d_,s_, shooter, weapon_) {
	this.x = x_;
	this.y = y_;

    
  	this.dir = d_;

	this.weapon = weapon_
	if (shooter == "player") {
		this.speed = weapons[this.weapon-1][2]*2;
		this.dam = weapons[this.weapon-1][3];
	}
	else {
		this.speed = g_weapons[this.weapon-1][2]*2;
		this.dam = g_weapons[this.weapon-1][3];
	}
	this.n = 0;

	if (shooter == "player") {
		this.player = true;
	}
	else {
		this.player = false;
	}

	this.show = function() {
		var d = this.dir
		var x = this.x;
		var y = this.y;
		if (this.player) {
			weapons[this.weapon - 1][4].draw(x,y,d)
		}
		else {
			g_weapons[this.weapon - 1][4].draw(x,y,d)
		}
	}
	this.explode = function() {
		var x = this.x;
		var y = this.y;
		var d = this.dir;
		var i = index(Math.round(x/w),Math.round(y/w))

		if (d == 1) {
			i -=cols;
		}
		else if (d == 2) {
			i-=1;
			i-=cols
		}
		else if (d == 4) {
			i-=1;
		}
		else if (d == 3) {
			i-=1;
		}
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
	this.update = function() {
		var d = this.dir;
		var x = this.x;
		var y = this.y;


		let check = true;
		let e;
		//console.log(x / w == Math.ceil(x/w))
		//console.log(x, x / w == Math.round(x/w), grids[room][index(Math.floor(x/w), Math.floor(y/w))].walls[3])
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
			console.log(e)
			if (this.weapon == 2 || this.weapon == 7){
				this.explode()
			}
			bullets.splice(bullets.indexOf(this), 1)
			player.lostHits += 2;
			return true;
		}
	}
}
function Explosion(a,b,c,d) {
	this.x = a*w
	this.y = b*w
	this.radius = 25;

	this.circles = []

	this.player = d;

	for(var i = 0; i < 5; i++) {
			//this.circles.push([random(this.x-30, this.x+30), random(this.y-30, this.y+30), random(this.radius-30, this.radius+40)])
	}

	this.timeout = setTimeout(function(){explosions.splice(explosions.indexOf(this), 1)}, c)

	this.update = function() {
		this.radius += 0.3
		if (frameCount % 2 == 0) {
			this.circles.push([random(this.x-60, this.x+60), random(this.y-60, this.y+60), random(this.radius-25, this.radius+25), color(255,random(55,255),0), this.player])
		}
	}
	this.show = function() {
		strokeWeight(4)
		noFill();
	
		for(var c = 0; c < this.circles.length; c++) {
			stroke(this.circles[c][3])
			circle(this.circles[c][0], this.circles[c][1], this.circles[c][2])
			//console.log([this.circles[i][0], this.circles[i][1], this.circles[i][2]])
		}
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