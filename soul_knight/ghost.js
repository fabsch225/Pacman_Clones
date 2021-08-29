function ghost(a,b, w_) {
	this.x = a*w;
	this.y = b*w;
	
	this.dir = 2;

	Math.round(this.speed = 1 + (difficulty * 0.01));

	this.seen = false;

	this.maxHP = 40
	this.hp = this.maxHP;

	this.weapon = w_;
	this.knife = random(0,8) + "k";


	this.shoot = true;
	this.shooter;

	this.accuraty = 90;

	this.shoot_angle = 0;


	this.burning = false;
	this.h = "noch nix"
	this.possible = true;
	this.k_possible = true;
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
		v1 = createVector(this.x+w/2,0);

	    v0 = createVector(this.x+w/2, this.y+w/2);
	    v2 = createVector((player.x)-this.x,(player.y)-this.y);
	 	
	    let angle = v1.angleBetween(v2);
	 	
	  	this.shoot_angle = degrees(angle).toFixed(1)

	  	if (player.y+w/2 < this.y) {
  			this.shoot_angle = 360 - this.shoot_angle;
  		}

	}
	this.shoot_ = function() {
		if (this.possible && !schutzzeit)  {
			g_weapons[this.weapon-1][4].shoot(this.x,this.y,this.shoot_angle,this,"ghost")
			this.possible = false;
			tim(this)
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
		


		for(i = 0; i < bullets.length; i++) {
			if(bullets[i].x > x && bullets[i].x < x+w && bullets[i].y > y && bullets[i].y < y+w && bullets[i].player) {
				this.hp -= bullets[i].dam - difficulty * 0.02;
				player.hits += 2
			//	console.log(this.hp + "Ghost HP")
				if (bullets[i] && (bullets[i].weapon == 2 || bullets[i].weapon == 7) ){
					bullets[i].explode();
				}
				bullets.splice(i,1)
				return true;
			}
		}
		for(i = 0; i < explosions.length; i++) {
			for(k = 0; k < explosions[i].circles.length; k++) {
				if(explosions[i].circles[k][2] >= dist(x,y,explosions[i].circles[k][0],explosions[i].circles[k][1]) && explosions[i].circles[k][3] && explosions[i].player) {
					this.hp -= 2;
					var expdeath = true;
					break
				}
			}
		}
	/*	for(k = 0; k < fire.length; k++) {
			if(dist(fire[k].x, fire[k].y, x, y) < 27 && fire[k].player) {
				this.hp -= (0.8 - (difficulty * 0.002));
				fire.splice(k,1)
				this.burning = true;
				break
			}
		}*/
		if (this.burning) {
			let i = ghosts_ch[room].indexOf(this)
			var t = setTimeout(function(){ghosts_ch[room][i].burning = false}, 5000)
		}
		if (this.hp <= 0) {
			ghosts_ch[room].splice(ghosts_ch[room].indexOf(this), 1)
			console.log(ghosts_ch[room])
			if (expdeath) {
				player.hits += 2;
			}
			expdeath = false;
			return true;
		}



		
		var stop = false;

	  	if (swords[parseInt(this.knife)][5] && this.k_possible) {
	  		if (dist(this.x+w/2,this.y+w/2,player.x+w/2,player.y+w/2) < w+swords[parseInt(this.knife)][6]) {
		  		knifes.push(new sword(this.x,this.y,int(this.shoot_angle),parseInt(this.knife),false, ghosts_ch[room].indexOf(this)))
		  		this.k_possible = false;
				tim(this, true)
			}
	  	}
	  	else if (this.k_possible) {
	  		if (dist(this.x+w/2,this.y+w/2,player.x+w/2,player.y+w/2) < w+swords[parseInt(this.knife)][7] && this.k_possible) {
		  		knifes.push(new sword(this.x,this.y,int(this.shoot_angle),parseInt(this.knife),false, ghosts_ch[room].indexOf(this)))
		  		this.k_possible = false;
				tim(this, true)
			}
	  	}
	  	if (this.possible) {
	  		let vx = x
	  		let vy = y
	  		let angle = this.shoot_angle;
	  		let found = false;

	  		for (a = 0; a <= w; a++) {
	  			vx += Math.cos(radians(angle));
				vy += Math.sin(radians(angle));
				if (vx / w == Math.round(vx/w) && vy / w == Math.round(vy/w)) {
					break
				}
	  		}
	  		let count = 0;
	  		let done = false;
	  		while (count < 200 && !done) {
	  			if ((grids[room][index(Math.floor(vx/w), Math.floor(vy/w))-1]  && grids[room][index(Math.floor(vx/w), Math.floor(vy/w))-1].walls[1] && angle > 90 && angle < 270) || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))] || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))].visited) {
					done = true;
				}
				else if ((grids[room][index(Math.floor(vx/w), Math.floor(vy/w))+1]  && grids[room][index(Math.floor(vx/w), Math.floor(vy/w))+1].walls[3] && (angle < 90 || angle > 270)) || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))] || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))].visited) {
					done = true;
				}
				else if ((grids[room][index(Math.floor(vx/w), Math.floor(vy/w))+cols] && grids[room][index(Math.floor(vx/w), Math.floor(vy/w))+cols].walls[0] && angle < 180 && angle > 0) || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))] || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))].visited) {
					done = true;
				}
				else if ((grids[room][index(Math.floor(vx/w), Math.floor(vy/w))-cols] &&  grids[room][index(Math.floor(vx/w), Math.floor(vy/w))-cols].walls[2] && angle > 180 && angle < 360) || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))] || !grids[room][index(Math.floor(vx/w), Math.floor(vy/w))].visited) {
					done = true;
		  		}
		  		if (Math.floor(vx/w) == Math.floor(player.x/w) && Math.floor(vx/w) == Math.floor(player.x/w)) {
		  			done = true;
		  			found = true;
		  		}
		  		vx += w * Math.round(Math.cos(radians(angle)));
				vy += w * Math.round(Math.sin(radians(angle)));
	  		}
	  		if (found) {
	  			this.shoot_();
	  		}
	  	}
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
			
				if (!fin && (ind == index(Math.round(player.x/w),Math.round(player.y/w)) && x/w == Math.round(x/w) && y/w == Math.round(y/w)) || (player.x == x && player.y == y)){
					this.dir = i;
					fin = true;
					stop = true;
					break;
				}

				if (i == 1 && !stop) {
					if(grids[room][ind] && grids[room][ind].walls[3]) {
						break;
					}
					ind--
				}
				else if (i == 2 && !stop) {
					if(grids[room][ind] && grids[room][ind].walls[1]) {
						break;
					}
					ind++
				}
				else if (i == 3 && !stop) {
					if(grids[room][ind] && grids[room][ind].walls[2]) {
						break;
					}
					ind+=cols
				}
				else if (i == 4 && !stop) {
					if(grids[room][ind] && grids[room][ind].walls[0]) {
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

		var gin = grid[index(Math.round(x/w),Math.round(y/w))]

		var pin = grid[index(Math.round(player.x/w),Math.round(player.y/w))]

		if ((d == 1 && x > 0 && !ch[0][3] && !ch[1][3] && ch[2]) || pin == gin-1) {
			this.x -= 1;
		}
		else if ((d == 2 && x < width && !ch[0][1] && !ch[1][1] && ch[2]) || pin == gin+1) {
			this.x += 1;
		}
		else if ((d == 3 && y < height && !ch[0][0] && !ch[1][0] && ch[2]) || pin == gin+cols) {
			this.y += 1;
		}	
		else if ((d == 4 && y > 0 && !ch[0][2] && !ch[1][2] && ch[2]) || pin == gin-cols)  {
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
				ghosts_ch[room].splice(ghosts_ch[room].indexOf(this), 1)
				return true;
			}
			if(r != 1) {
				this.seen = false;
			}
		}
		return false;
	}        
}
function tim(a,b) {
	if (!b) {
		setTimeout(function(){a.possible = true;}, weapons[a.weapon-1][0]*3)
	}
	else {
		setTimeout(function(){a.k_possible = true;}, swords[parseInt(a.knife)][0]*3)
	}	
}
function inter(a) {
	console.log(a)
    a.shooter = setInterval(function(){
		bullets.push(new Bullet(a.x+w/2, a.y+w/2, a.shoot_angle,9,"ghost",a.weapon))
	}, 80)
}
function tim2(a) {
	setTimeout(function(){clearInterval(a.shooter)}, 500)
}


