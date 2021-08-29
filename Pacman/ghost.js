function ghost(a,b, w_) {
	this.x = a*w;
	this.y = b*w;
	
	this.dir = 2;

	Math.round(this.speed = 1 + (difficulty * 0.01));

	this.seen = false;

	this.maxHP = 40
	this.hp = this.maxHP;

	this.weapon = w_;
	
	this.shoot = true;

	this.accuraty = 90;

	this.burning = false;
	this.h = "noch nix"

	this.show = function() {
		var x = this.x;
		var y = this.y;
		var d = this.dir; 	
		if (schutzzeit) {
			stroke('rgba(0,255,0, 0.05)');
		}
		else {
			stroke(0,255,0)
		}

		
		circle(this.x+w/2,this.y+w/2,w/2-3)
		if (this.burning) {
			var max = 20
			
			if (frameCount % 3 == 0 || this.h == "noch nix") {
				this.h = []
				for(let i = 3; i < max-3; i++) {
					this.h[i] = random(w/1.4)
				}					
			}
			for(let i = 3; i < max-3; i++) {
				stroke(color(255,random(0,255),0))
				line(map(i, 0, max, 0, w-1)+x, y+w/1.4, map(i, 0, max, 0, w-1)+x, y+w/2 - this.h[i])
			}
		}
		if (schutzzeit) {
			stroke('rgba(255,255,255, 0.05)');
		}
		else {
			stroke(255)
		}
		
		beginShape()
		vertex(x+w/2,y+w/2)
		
		if (d == 1) {
			vertex(x+4,y+w/2);
		}
		else if (d == 2) {
			vertex(x+w-4,y+w/2);
		}
		else if (d == 3) {
			vertex(x+w/2,y+w-4);
		}	
		else if (d == 4) {
			vertex(x+w/2,y+4);
		}
		endShape()
		noStroke()
		fill("red")
		rect(x+4,y,w-8,4, 3)
		fill("green")
		if (this.hp < 0) {this.hp = 0;}
		rect(x+4,y--,map(this.hp, 0,this.maxHP, 0, w-8),4, 3)
		fill("red")
		textSize(10);
		text(this.weapon, x, y+6)

	}
	this.shoot_ = function() {
		var a = []
		if (random(1,100)>this.accuraty && this.weapon != 2) {
			a[0] = random(1,5);
			while(a[0] == this.dir) {
				a[0] = random(1,5);
			}
		}
		else {
			a[0] = this.dir;
		}


		a[0] = this.dir; 	
		if (this.weapon == 4) {
			if (a[0] == 1 || a[0] == 2) {
				a[1] = 3;
				a[2] = 4;
			}
			else {
				a[1] = 2;
				a[2] = 3;	
			}	
			for (i = 0; i <= 2; i++) {
				bullets.push(new Bullet(this.x+w/2, this.y+w/2, a[i],9,"ghost", this.weapon))
			}
		}
		else {

			bullets.push(new Bullet(this.x+w/2, this.y+w/2, a[0],9,"ghost",this.weapon))
		}
	}

	this.update = function() {
		var d = this.dir;
		var x = this.x;
		var y = this.y;

		var ch = check(d,x,y)

		if (this.burning && frameCount % 100 == 0) {
			this.hp -= 1;
		}
		if(random(8000) == 6666) {
			this.weapon = Math.floor(Math.random()*5)+1
		}


		for(i = 0; i < bullets.length; i++) {
			if(bullets[i].x > x && bullets[i].x < x+w && bullets[i].y > y && bullets[i].y < y+w && bullets[i].player) {
				this.hp -= bullets[i].dam - difficulty * 0.02;
				player.hits += 2
			//	console.log(this.hp + "Ghost HP")
				if (bullets[i] && bullets[i].weapon == 2){
					bullets[i].explode();
				}
				bullets.splice(i,1)
				return true;
			}
		}
		for(i = 0; i < explosions.length; i++) {
			for(k = 0; k < explosions[i].circles.length; k++) {
				if(explosions[i].circles[k][2] >= dist(x,y,explosions[i].circles[k][0],explosions[i].circles[k][1]) && explosions[i].circles[k][3]) {
					this.hp -= 2;
					var expdeath = true;
					break
				}
			}
		}
		for(k = 0; k < fire.length; k++) {
			if(dist(fire[k].x, fire[k].y, x, y) < 27 && fire[k].player) {
				this.hp -= (0.8 - (difficulty * 0.002));
				fire.splice(k,1)
				this.burning = true;
				break
			}
		}
		if (this.burning) {
			let i = ghosts.indexOf(this)
			var t = setTimeout(function(){ghosts[i].burning = false}, 5000)
		}
		if (this.hp <= 0) {
			ghosts.splice(ghosts.indexOf(this), 1)
			console.log(ghosts)
			if (expdeath) {
				player.hits += 2;
			}
			expdeath = false;
			return true;
		}



		if (Math.round(player.x/w) == Math.round(x/w) && Math.round(player.y/w) == Math.round(y/w)) {
			message = "You were eaten by a ghost";
			gameover = true;
			timer = false;
			setTimeout(function() {timer = true}, 1000)
		}
		var stop = false;
		for (i = 1;i < 5; i++) {
			var ind = index(Math.round(this.x/w), Math.round(this.y/w))
			var cind = ind;
			var fin = false;
			var n = 0;
			if (fin) {
				break
			}
			
			while(!fin && n < 100) {
				n++;
			
				if (((ind == index(Math.round(player.x/w),Math.round(player.y/w)) && this.shoot) || (player.x == x && player.y == y)) && this.weapon != 2) {
					this.dir = i;
					this.shoot = false;
					this.shoot_()
					tim(this)
					fin = true;
					stop = true;
					break
				}			
				else if ((ind == index(Math.round(player.x/w),Math.round(player.y/w))  && this.shoot && x/w == Math.floor(x/w) && y/w == Math.floor(y/w))){
					this.dir = i;
					this.shoot = false;
					this.shoot_()
					tim(this)
					fin = true;
					stop = true;
					break;
				}
				if (!fin && (ind == index(Math.round(player.x/w),Math.round(player.y/w)) && x/w == Math.round(x/w) && y/w == Math.round(y/w)) || (player.x == x && player.y == y)){
					this.dir = i;
					fin = true;
					stop = true;
					break;
				}



				if (i == 1 && !stop) {
					if(grid[ind] && grid[ind].walls[3]) {
						break;
					}
					ind--
				}
				else if (i == 2 && !stop) {
					if(grid[ind] && grid[ind].walls[1]) {
						break;
					}
					ind++
				}
				else if (i == 3 && !stop) {
					if(grid[ind] && grid[ind].walls[2]) {
						break;
					}
					ind+=cols
				}
				else if (i == 4 && !stop) {
					if(grid[ind] && grid[ind].walls[0]) {
						break;
					}
					ind-=cols
				}
			}
			if (stop) {
				break;
				this.seen = true;
			}
		}
		
		var r = Math.floor(Math.random()*250)

		var cx = x;
		var cy = y;

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
		if (((this.x == cx && this.y == cy) || r == 1 && !this.seen) && !stop) {
			fin = false;
			n = 0;
			while(!fin && n < 1000) {
				var nd = Math.floor(Math.random()*4)+1
				var nch = check(nd,x,y)
				n++
				if (!nch[0][3] && !nch[1][3] && nch[2] || !nch[0][1] && !nch[1][1] && nch[2] || !nch[0][0] && !nch[1][0] && nch[2] || !nch[0][2] && !nch[1][2] && nch[2]) {
					this.dir = nd;
		   			fin = true;	
				} 
			}
			if (n > 999) {
				ghosts.splice(ghosts.indexOf(this), 1)
				return true;
			}
			if(r != 1) {
				this.seen = false;
			}
		}
		return false;
	}        
}
function tim(a) {
	setTimeout(function(){ a.shoot=true; }, weapons[a.weapon-1][0]*2-difficulty*0.005);
}