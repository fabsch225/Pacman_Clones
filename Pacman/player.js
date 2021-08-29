function newPlayer(a,b) {
	this.x = a;
	this.y = b;

	this.dir = 2;
	this.speed = 3;
	this.coins = 0;
	this.maxHP = 40
	this.hp = this.maxHP;
	this.weapon = 1;

	this.hits = 0;
	this.lostHits = 0;

	this.burning =false;
	this.h = "noch nix"

	if (this.burning && frameCount % 300 == 0) {
		this.hp -= 0.5;
	}

	this.shoot = function() {
		var a = []
		a[0] = this.dir; 	
		if (this.weapon == 4) {
			if (a[0] == 1 || a[0] == 2) {
				a[1] = 3;
				a[2] = 4;
			}
			else {
				a[1] = 2;
				a[2] = 1;	
			}	
			for (i = 0; i <= 2; i++) {
				bullets.push(new Bullet(this.x+w/2, this.y+w/2, a[i],9,"player", this.weapon))
			}
		}
		else {
			bullets.push(new Bullet(this.x+w/2, this.y+w/2, a[0],9,"player", this.weapon))
		}
	}
	
	this.show = function() {
		var x = this.x;
		var y = this.y;
		var d = this.dir; 	

		
		stroke("yellow")
		circle(this.x+w/2,this.y+w/2,w/2-3)
		if (this.burning) {
			let max = 20
			
			if (frameCount % 3 == 0 || this.h == "noch nix") {
				
				this.h = []
				for(i = 3; i < max-3; i++) {
					this.h[i] = Math.floor(Math.random()*w/1.4)
				}					
			}
			for(i = 3; i < max-3; i++) {
				stroke(color(255,Math.floor(Math.random()*255),0))
				
				line(map(i, 0, max, 0, w-1)+x, y+w/1.4, map(i, 0, max, 0, w-1)+x, y+w/2 - this.h[i])
			}
		}
		stroke(0)
		strokeWeight(3)
		beginShape()
		vertex(x+w/2,y+w/2)
		if (d == 1) {
			vertex(x+3,y+w/2);
		}
		else if (d == 2) {
			vertex(x+w-3,y+w/2);
		}
		else if (d == 3) {
			vertex(x+w/2,y+w-3);
		}	
		else if (d == 4) {
			vertex(x+w/2,y+3);
		}

		endShape()
		noStroke()
		fill("red")
		rect(x+4,y,w-8,4, 3)
		fill("green")
		if (map(this.hp, 0, this.maxHP, 0, w-8) > 0) {
			rect(x+4,y--,map(this.hp, 0, this.maxHP, 0, w-8),4, 3)
		}
		fill("red")
		textSize(10);
		text(this.weapon, x, y+6)
	}
	this.update = function() {
		var d = this.dir;
		var x = this.x;
		var y = this.y;

		if (this.burning && frameCount % 100 == 0) {
			this.hp -= 1;
		}


		for(i = 0; i < bullets.length; i++) {
			if(bullets[i].x > x && bullets[i].x < x+w && bullets[i].y > y && bullets[i].y < y+w && !bullets[i].player) {
				this.hp -= bullets[i].dam / (3 - difficulty * 0.01);
				if (bullets[i].weapon == 2) {bullets[i].explode()}
				bullets.splice(i,1)
				if (this.hp <= 0) {
					message = "You were shot by a ghost"
					return
				}
			}
		}
		if (this.hp > 0) {
			for(i = 0; i < explosions.length; i++) {
				for(k = 0; k < explosions[i].circles.length; k++) {
					if(explosions[i].circles[k][2] >= dist(x,y,explosions[i].circles[k][0],explosions[i].circles[k][1])) {
						this.hp -= 0.5;
						var expdeath = true;
					}
				}
			}
			if (this.hp <= 0 && expdeath) {
				message = "You were killed by a nearby explosion"
				return
			}
			for(k = 0; k < fire.length; k++) {
				if(dist(fire[k].x, fire[k].y, x, y) < 27 && !fire[k].player) {
					this.hp -= 0.4;
					this.burning = true;
					fire.splice(k,1)
				}
			}
			if (this.burning) {
				var t = setTimeout(function(){player.burning = false}, 5000)
			}

			if (this.hp <= 0 && !expdeath) {
				message = "You were burned"
				return
			}
		}
		else {
			gameover = true;
			timer = false;
			setTimeout(function() {timer = true}, 1000);
			return;
		}
		var ch = check(d,x,y,)

		var i = index(Math.round(this.x/w), Math.round(this.y/w))

		
		if (d == 1 && x > 0 && !ch[0][3] && !ch[1][3] && ch[2]) {
			this.x -= 1;
		}
		else if (d == 2 && x < width && !ch[0][1] && !ch[1][1] && ch[2]) {
			this.x += 1;
		}
		else if (d == 3 && y < height && !ch[0][0] && !ch[1][0] && ch[2]) {
			this.y += 1;
		}	
		else if (d == 4 && y > 0 && !ch[0][2] && !ch[1][2] && ch[2]) {
			this.y -= 1;
		}
		if (!schutzzeit) {
			if (grid[i].coin) {
				grid[i].coin = false;
				coins--
				this.coins++;
			}
			else if (grid[i].freeze) {
				grid[i].freeze = false;
				for (var l = 0; l < ghosts.length; l++) {
					ghosts[l].speed = 1;
				}
				fr_timer = 5;
				var fr_time = setInterval(function(){fr_timer--},1000)
				setTimeout(function() {
					for (var l = 0; l < ghosts.length; l++) {
						clearInterval(fr_time)
						fr_timer = 7
						ghosts[l].speed = 4;
					}
				}, 5000)
			}
			else if (grid[i].heal) {
				if (this.maxHP - this.hp > 7) {
					this.hp += 7
				}
				else {
					this.hp = this.maxHP
				}
				grid[i].heal = false;

			}
		}
		if (coins < 1) {
			/*message = "you win";
			gameover = true;
			timer = false;
			setTimeout(function() {timer = true}, 1000)*/
		}
	}        
}