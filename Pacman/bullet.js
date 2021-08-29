function Bullet(x_, y_, d_,s_, shooter, weapon_) {
	this.x = x_;
	this.y = y_;
	this.dir = d_;
	this.weapon = weapon_
	this.speed = weapons[this.weapon-1][2];
	this.dam = weapons[this.weapon-1][3];

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

		if (this.weapon == 1) {
			ellipseMode(CENTER);  
			stroke("red"); 
			ellipse(x, y, 9, 9);  
		}
		else if (this.weapon == 2) {
			fill(0)
			if (d == 1) {
				rect(x,y-4,24,8);
				triangle(x, y+4, x, y-4, x-6, y)
			}
			else if (d == 2) {
				rect(x,y+4,-24,-8);
				triangle(x, y+4, x, y-4, x+6, y) //OK
			}
			else if (d == 3) {
				rect(x-4,y,8,24);
				triangle(x-4, y+24, x+4, y+24, x, y+30)
			}	
			else if (d == 4) {
				rect(x-4,y,8,-24); 
				triangle(x-4, y-24, x+4, y-24, x, y-30)
				//triangle(x, y-24, x+3, y+6, x-3, y+6)
			}
		}
		else if (this.weapon == 3) {
			fill(0)
			stroke(0)
			strokeWeight(2)
			if (d == 1) {
				line(x,y,x+6,y)
			}
			else if (d == 2) {
				line(x,y,x-6,y)
			}
			else if (d == 3) {
				line(x,y,x,y-6)
			}	
			else if (d == 4) {
				line(x,y,x,y+6 )
			} 
		}
		else if (this.weapon == 4) {
			strokeWeight(4)
			fill(0)
			stroke(0)
			for (var i = 0; i < 5; i++) {
				point(x+(Math.floor(Math.random()*16)-8), y+(Math.floor(Math.random()*16)-8))
			}
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
		if (grid[i] && grid[i+1] && grid[i-1] && grid[i+cols] && grid[i-cols] && grid[i+2] && grid[i-2] && grid[i+(cols*2)] && grid[i-(cols*2)] && grid[i+cols-1] && grid[i-cols-1] && grid[i-cols+1] && grid[i+cols+1]) {
			setTimeout(function() {
				grid[i].walls = [false,false,false,false]
				grid[i+1].walls = [false,false,false,false]
				grid[i-1].walls = [false,false,false,false]
				grid[i+cols].walls = [false,false,false,false]
				grid[i-cols].walls = [false,false,false,false]
				grid[i+2].walls[3] = false
				grid[i-2].walls[1] = false;
				grid[i+(cols*2)].walls[0] = false;
				grid[i-(cols*2)].walls[2] = false;
				grid[i+cols-1].walls[0] = false; 
				grid[i+cols-1].walls[1] = false;
				grid[i-cols-1].walls[1] = false; 
				grid[i-cols-1].walls[2] = false;
				grid[i+cols+1].walls[0] = false; 
				grid[i+cols+1].walls[3] = false; 
				grid[i-cols+1].walls[2] = false; 
				grid[i-cols+1].walls[3] = false; 
				grid[i+1].visited = true;
				grid[i-1].visited = true;
				grid[i+cols].visited = true;
				grid[i-cols].visited = true;
				grid[i+2].visited = true;
				grid[i-2].visited = true;
				grid[i+(cols*2)].visited = true;
				grid[i-(cols*2)].visited = true;
				grid[i+cols-1].visited = true;
				grid[i-cols-1].visited = true;
				grid[i-cols+1].visited = true;
				grid[i+cols+1].visited = true;
			}, 120);
		}	
		explosions.push(new Explosion(Math.round(x/w),Math.round(y/w), 450, this.player))
	}
	this.update = function() {
		var d = this.dir;
		var x = this.x;
		var y = this.y;

		if (this.weapon == 5) {
			for (i=0;i<10;i++) {
				fire.push(new Flame(x,y,d,player.x, player.y, w/2-this.n/2.5, this.player))
			}
			bullets.splice(bullets.indexOf(this), 1)
			return true;
		}
		else {
			if (d == 1 && x > 0 && grid[index(Math.floor(x/w), Math.floor(y/w))] && !grid[index(Math.floor(x/w), Math.floor(y/w))].walls[1]) {
				this.x -= 1;
			}
			else if (d == 2 && x < width && grid[index(Math.floor(x/w), Math.floor(y/w))]  && !grid[index(Math.floor(x/w), Math.floor(y/w))].walls[3]) {
				this.x += 1;
			}
			else if (d == 3 && y < height && grid[index(Math.floor(x/w), Math.floor(y/w))]  && !grid[index(Math.floor(x/w), Math.floor(y/w))].walls[0]) {
				this.y += 1;
			}	
			else if (d == 4 && y > 0 && grid[index(Math.floor(x/w), Math.floor(y/w))]  && !grid[index(Math.floor(x/w), Math.floor(y/w))].walls[2]) {
				this.y -= 1;
			}
			else {
				if (this.weapon == 2){
					this.explode()
				}
				bullets.splice(bullets.indexOf(this), 1)
				player.lostHits += 2;
				return true;
			}
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
			if (d == 1 && x > 0 && grid[index(Math.floor(x/w),Math.floor(y/w))] && !grid[index(Math.floor(x/w),Math.floor(y/w))].walls[1]) {
				this.x -= 1;
			}
			else if (d == 2 && x < width && grid[index(Math.floor(x/w),Math.floor(y/w))] && !grid[index(Math.floor(x/w),Math.floor(y/w))].walls[3]) {
				this.x += 1;
			}
			else if (d == 3 && y < height && grid[index(Math.floor(x/w),Math.floor(y/w))] && !grid[index(Math.floor(x/w),Math.floor(y/w))].walls[0]) {
				this.y += 1;
			}	
			else if (d == 4 && y > 0 && grid[index(Math.floor(x/w),Math.floor(y/w))] && !grid[index(Math.floor(x/w),Math.floor(y/w))].walls[2]) {
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