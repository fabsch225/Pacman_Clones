function newPlayer(a,b) {
	this.x = a;
	this.y = b;

	this.dir = 2;
	this.speed = 3;
	this.coins = 0;
	this.maxHP = 40
	this.hp = this.maxHP;
	

	this.hits = 0;
	this.lostHits = 0;

	this.burning =false;
	this.h = "noch nix"

	this.inv = ["0k", 1, "free","free"]
	this.weapon = this.inv[1];
	this.shoot_angle
	if (this.burning && frameCount % 300 == 0) {
		this.hp -= 0.5;
	}

	this.shoot = function(a) {
	
		if (a || this.weapon == "free") {
			knifes.push(new sword(this.x,this.y,int(player_angle),parseInt(this.inv[0]),true))
		}
		if (!a && this.weapon != "free") {
			weapons[this.weapon-1][4].shoot(this.x,this.y,player_angle,this,"player")
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
		this.shoot_angle = player_angle;

		if (this.burning && frameCount % 100 == 0) {
			this.hp -= 1;
		}
		for(i = 0; i < bullets.length; i++) {
			if(dist(bullets[i].x,bullets[i].y,x+w/2,y+w/2) <= w/2 && !bullets[i].player) {
				this.hp -= bullets[i].dam / 5;
				if (bullets[i].weapon == 2 || bullets[i].weapon == 7 ) {bullets[i].explode()}
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

		var i = index(Math.floor(this.x/w), Math.floor(this.y/w))

		
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
			i = index(Math.floor(this.x/w), Math.floor(this.y/w))
			if (grids[room][i].coin) {
				grids[room][i].coin = false;
				coins--
				this.coins++;
			}
			else if (grids[room][i].freeze) {
				grids[room][i].freeze = false;
				for (var l = 0; l < ghosts_ch[room].length; l++) {
					ghosts_ch[room][l].speed = 1;
				}
				fr_timer = 5;
				var fr_time = setInterval(function(){fr_timer--},1000)
				setTimeout(function() {
					for (var l = 0; l < ghosts_ch[room].length; l++) {
						clearInterval(fr_time)
						fr_timer = 7
						ghosts_ch[room][l].speed = 4;
					}
				}, 5000)
			}
			else if (grids[room][i].heal) {
				if (this.maxHP - this.hp > 28) {
					this.hp += 28
				}
				else {
					this.hp = this.maxHP
				}
				grids[room][i].heal = false;
			}
			else if (grids[room][i].crate) {
				if (String(grids[room][i].crate_l).includes("k")) {
					if (this.inv[0] == "0k") {
						this.inv[0] = grids[room][i].crate_l;
						grids[room][i].crate = false
						for (a = 0; a < grids.length; a++) {
							for (b = 0; b < grids[a].length; b++) {
								if (grids[a][b].crate && grids[a][b].crate_l == grids[room][i].crate_l) {
									grids[a][b].crate = false;
								}
							}
						}
					}
				}
				else {
					let inv_index = "full";
					for (a = 0; a < this.inv.length; a++) {
						if (this.inv[a] == "free") {
							inv_index = a;
							break
						}
					}
					if (inv_index != "full") {
						this.inv[inv_index] = grids[room][i].crate_l;
						if (player.weapon == "free" || String(player.weapon).includes("w")) {
							player.weapon = this.inv[inv_index]
						}

						grids[room][i].crate = false
						for (a = 0; a < grids.length; a++) {
							for (b = 0; b < grids[a].length; b++) {
								if (grids[a][b].crate && grids[a][b].crate_l == grids[room][i].crate_l) {
									grids[a][b].crate = false;
								}
							}
						}
					}	
				}	
			}
			else if (grids[room][i].portal && ghosts_ch[room].length == 0) {
				
					if (grids[room][i].pos == 1) {
						room = room - 3;
						
						player.x = Math.floor((width/2)/w)*w
						player.y = rows*w-w
					}
					else if (grids[room][i].pos == 2) {
						room = room + 3;
						
						player.x = Math.floor((width/2)/w)*w
						player.y = 0
					}
					else if (grids[room][i].pos == 3) {
						room = room - 1;
						
						player.x = cols*w-w
						player.y = Math.floor((height/2)/w)*w
					}
					else if (grids[room][i].pos == 4) {
						room = room + 1;
						
						player.x = 0
						player.y = Math.floor((height/2)/w)*w
					}
					schutzzeit = true;
					fr_timer = 3;
					var fr_time = setInterval(function(){fr_timer--},1000)
					setTimeout(function() {
						schutzzeit = false;
						clearInterval(fr_time)	
					}, 3000)
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
function inter2(a) {
	console.log(a)
    player.shooter = setInterval(function(){
		bullets.push(new Bullet(a.x+w/2, a.y+w/2, int(player_angle),9,"player",a.weapon))
	}, 120)
}
function tim3(a) {
	setTimeout(function(){clearInterval(player.shooter)},700)
}