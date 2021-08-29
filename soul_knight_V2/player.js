function newPlayer(a,b) {
	this.x = a;
	this.y = b;

	d = 2;
	this.speed = 6;
	this.coins = 0;
	this.maxHP = 40
	this.hp = this.maxHP;
	

	this.hits = 0;
	this.lostHits = 0;

	this.burning =false;
	this.h = "noch nix"


	this.inv = ["0k", 1, 11,"free"]
	this.weapon = this.inv[1];
	this.shoot_angle
	if (this.burning && frameCount % 300 == 0) {
		this.hp -= 0.5;
	}
}
newPlayer.prototype.shoot = function(a) {
	var d = d;
	var x = this.x;
	var y = this.y;

	let sc = 10000;
	let n_g = null;

	if (ghosts_ch[room].length != 0) {
		for (g=0;g<ghosts_ch[room].length;g++) {
			if (dist(x+w/4,y+w/4,  ghosts_ch[room][g].x+w/2, ghosts_ch[room][g].y+w/2) < sc) {
				n_g = ghosts_ch[room][g];
				sc = dist(x+w/4,y+w/4,  ghosts_ch[room][g].x+w/2, ghosts_ch[room][g].y+w/2);
			}
		}
		v1 = createVector(player.x+w/4,0);

	  
	    v2 = createVector((n_g.x+w/2)-(player.x+w/4), (n_g.y+w/2)-(player.y+w/4));

	 	
	    let angleBetween = v1.angleBetween(v2);
	 
	  	this.shoot_angle = degrees(angleBetween).toFixed(1)

	  	if (n_g.y+w/2 < player.y+w/4) {
	  		this.shoot_angle = 360 - this.shoot_angle;
	  	}
	}  			
  	else {
  		this.shoot_angle = player_angle
  	}
	if (a || this.weapon == "free") {
		knifes.push(new sword(this.x,this.y,int(this.shoot_angle),parseInt(this.inv[0]),true))
	}
	if (!a && this.weapon != "free") {
		weapons[this.weapon-1][4].shoot(this.x,this.y,this.shoot_angle,this,"player")
	}
}
newPlayer.prototype.show = function() {
	var x = width/2//this.x;
	var y = height/2//this.y;
	this.sx = x;
	this.sy = y;

	var d = d; 	

	
	stroke("yellow")
	circle(x+w/4,y+w/4,w/4)
	



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
	if (this.sniping) {
		let vi = view(this.x+w/4,this.y+w/4,this.shoot_angle,true)
		strokeWeight(2)
		stroke('rgba(255,0,0, 0.5)')
		noFill()
		line(width/2+w/4,height/2+w/4,(width/2-player.x)+vi[1],(height/2-player.y)+vi[2])
	}
}
newPlayer.prototype.update = function() {
	var d = d;
	var x = this.x;
	var y = this.y;
	if (!room_data[rooms.indexOf(room)].visited) {
		room_data[rooms.indexOf(room)].visited = true;
	}
	if  (this.weapon == 5 || 8 || 9 && !shootPossible) {
		let sc = 10000;
		let n_g = null;

		if (ghosts_ch[room].length != 0) {
			for (g=0;g<ghosts_ch[room].length;g++) {
				if (dist(x+w/4,y+w/4,  ghosts_ch[room][g].x+w/2, ghosts_ch[room][g].y+w/2) < sc) {
					n_g = ghosts_ch[room][g];
					sc = dist(x+w/4,y+w/4,  ghosts_ch[room][g].x+w/2, ghosts_ch[room][g].y+w/2);
				}
			}
			v1 = createVector(player.x+w/4,0);

		  
		    v2 = createVector((n_g.x+w/2)-(player.x+w/4), (n_g.y+w/2)-(player.y+w/4));

		 	
		    let angleBetween = v1.angleBetween(v2);
		 
		  	this.shoot_angle = degrees(angleBetween).toFixed(1)

		  	if (n_g.y+w/2 < player.y+w/4) {
		  		this.shoot_angle = 360 - this.shoot_angle;
		  	}
		}  			
	  	else {
	  		this.shoot_angle = player_angle
	  	}
	}
		
	

	if (this.burning && frameCount % 100 == 0) {
		this.hp -= 1;
	}
	
	if (this.hp > 0) {
		for(i = 0; i < explosions.length; i++) {
			for(k = 0; k < explosions[i].circles.length; k++) {
				if(explosions[i].circles[k][2] >= dist(x,y,explosions[i].circles[k][0],explosions[i].circles[k][1])) {
					this.hp -= 0.009;
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
	d = int(player_angle);
	var d = d;

	let ind = index(Math.floor((this.y+w/4)/w), Math.floor((this.y+w/4)/w))
	
	if (dist(mouseX, mouseY,width/2+w/4,height/2+w/4) > w/4) {
		var new_x = 0.5 * Math.cos(radians(d));
		
		this.x += new_x;
		let ox = this.x + w/4;
		let oy = this.y +w/4;
		for (var m = 0; m < 90; m++) {
			let x1 = ox + (w/4+0) * Math.cos(radians(d+m))
			let y1 = oy + (w/4+0)* Math.sin(radians(d+m))

			let x2= ox +(w/4+0) * Math.cos(radians(d-m))
			let y2 = oy + (w/4+0) * Math.sin(radians(d-m))
			

			var check = check2(ind,Math.floor(x1), Math.floor(y1),d) && check2(ind,Math.floor(x2), Math.floor(y2),d) && check2(ind,Math.ceil(x1), Math.ceil(y1),d) && check2(ind,Math.ceil(x2), Math.ceil(y2),d)
			if (!check) {
				this.x -= new_x;
				break
			}
		}
		
		var new_y = 0.5 * Math.sin(radians(d));
		
		this.y += new_y;
		oy = this.y +w/4;
		ox = this.x +w/4;
		for (var m = 0; m < 90; m++) {
			let x1 = ox + (w/4+0) * Math.cos(radians(d+m))
			let y1 = oy + (w/4+0)* Math.sin(radians(d+m))

			let x2= ox +(w/4+0) * Math.cos(radians(d-m))
			let y2 = oy + (w/4+0) * Math.sin(radians(d-m))
			

			var check = check2(ind,Math.floor(x1), Math.floor(y1),d) && check2(ind,Math.floor(x2), Math.floor(y2),d) && check2(ind,Math.ceil(x1), Math.ceil(y1),d) && check2(ind,Math.ceil(x2), Math.ceil(y2),d)
			if (!check) {
				
				this.y -= new_y;
				break
			}
		}
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
						if (grids[a]) {
							for (b = 0; b < grids[a].length; b++) {
								if (grids[a][b].crate && grids[a][b].crate_l == grids[room][i].crate_l) {
									grids[a][b].crate = false;
								}
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
						if (grids[a]) {
							for (b = 0; b < grids[a].length; b++) {
								if (grids[a][b].crate && grids[a][b].crate_l == grids[room][i].crate_l) {
									grids[a][b].crate = false;
								}
							}
						}	
					}
				}	
			}	
		}
		else if (grids[room][i].portal && ghosts_ch[room].length == 0 && room_data[rooms.indexOf(room)].wave == max_waves) {
			
				if (grids[room][i].pos == 1) {
					room = room - room_cols;
					
					player.x = Math.floor(cols/2)*w
					player.y = rows*w-w
				}
				else if (grids[room][i].pos == 2) {
					room = room + room_cols;
					
					player.x = Math.floor(cols/2)*w
					player.y = 0
				}
				else if (grids[room][i].pos == 3) {
					room = room - 1;
					
					player.x = cols*w-w
					player.y = Math.floor(rows/2)*w
				}
				else if (grids[room][i].pos == 4) {
					room = room + 1;
					
					player.x = 0
					player.y = Math.floor(rows/2)*w
				}
				schutzzeit = true;
				fr_timer = 3;
				if (room_data[room] && room_data[room].boss && boss_rooms.includes(room)) {
					ms(b_weapons[ghosts_ch[room][0].weapon-1][0])
				}
				v1 = createVector(width/2+w/2,0);

			    v0 = createVector(width/2+w/4, height/2+w/4);
			    v2 = createVector(mouseX-(width/2+w/4), mouseY-(height/2+w/4));

			 	
			    let angleBetween = v1.angleBetween(v2);
			 
			  	player_angle = degrees(angleBetween).toFixed(1)

			  	if (mouseY < height/2) {
			  		player_angle = 360 - player_angle;
			  	}
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

function inter2(a) {
	console.log(a)
    player.shooter = setInterval(function(){
		bullets.push(new Bullet(a.x+w/2, a.y+w/2, int(player_angle),9,"player",a.weapon))
	}, 120)
}
function tim3(a) {
	setTimeout(function(){clearInterval(player.shooter)},700)
}
function check2(ind,i,j,d) {
	let c = true;
	let e = "no Wall"
	let v = 2;
	let x = i;
	let y = j;


	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))] && x / w == Math.floor(x/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))].walls[3] && d > 90 && d < 270) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
			c = false;
			e = 1;
	}
	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))-1] && x / w == Math.ceil(x/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))-1].walls[1] && (d < 90 || d > 270)) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		c = false;
		e = 2;
	}
	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))-cols] && y / w == Math.ceil(y/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))-cols].walls[2] && d < 180 && d > 0) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		c = false;
		e = 3;
	}
	if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))] && y / w == Math.floor(y/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))].walls[0] && d > 180 && d < 360) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
		c = false;
		e = 4;
	}
	
	return c;
}