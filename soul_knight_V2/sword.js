function sword(x_,y_,d_,w_,p_,gi) {
	this.dir = d_;
	this.weapon = w_;
	this.prog = 0;
	this.done = false;
	this.done_dam = false
	this.player = p_;

	if (!p_) {
		this.ghost_index = gi
		this.dam = swords[this.weapon][2];
	}
	else {
		this.dam = swords[this.weapon][2]*2
	}
	this.speed = swords[this.weapon][3]
    this.range = swords[this.weapon][6]
	this.stab = swords[this.weapon][5]
	if (!this.stab) {
		this.len = swords[this.weapon][7]
		this.prog = this.dir - this.range/2;
		this.count = 0;
		this.done_dam = [];
	}
}
sword.prototype.show = function() {

	if (this.stab) {
		if (this.player) {
			swords[this.weapon][4].draw(this.dir, this.prog,player)
		}
		else {
			swords[this.weapon][4].draw(this.dir, this.prog,ghosts_ch[room][this.ghost_index])	
		}
	}
	else {
		if (this.player) {
			swords[this.weapon][4].draw(this.len, this.prog,player)
		}
		else {
			swords[this.weapon][4].draw(this.len, this.prog,ghosts_ch[room][this.ghost_index])	
		}
	}
}
sword.prototype.update = function() {
	if (this.stab) {
		if (!this.done) {
			this.prog += 1;
		}
		else {
			this.prog -= 0.5;
		}
		if (this.prog >= this.range) {
			this.done = true;
		}
		else if (this.prog <= 0) {
			knifes.splice(knifes.indexOf(this), 1)
			return true;
		}
		var d = this.dir;
		if (this.player) {
			var x = player.x+w/2 + this.prog * Math.round(cos(radians(this.dir)));
			var y =  player.y+w/2 + this.prog *Math.round(sin(radians(this.dir)));
		}
		else {
			if (ghosts_ch[room][this.ghost_index]) {
				var x = ghosts_ch[room][this.ghost_index].x+w/2 + this.prog * Math.round(cos(radians(this.dir)));
				var y =  ghosts_ch[room][this.ghost_index].y+w/2 + this.prog *Math.round(sin(radians(this.dir)));	
			}
		}

		let check = true;
		let e;
		
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
		
		if (!check) {
			if (this.weapon == 0) {
				player.hp -= 0.2;
			}
			this.done = true;
			return true;
		}
		var g = ghosts_ch[room]
		for(a=0;a<g.length;a++) {
			if (dist(x,y,g[a].x+w/2, g[a].y+w/2) < w/2+this.prog && !this.done_dam && this.player) {
				g[a].hp -= this.dam;
				this.done_dam = true;
			}
		}
		if (dist(x,y,player.x+w/2, player.y+w/2) < w/2+this.range && !this.done_dam && !this.player) {
			player.hp -= this.dam/3;
			this.done_dam = true;
		}
	}
	else {
		if (!this.done) {
			this.prog = int(this.prog) + 1
			this.count += 1;
		}
		if (this.prog > 360) {
			this.prog -= 360;
		}
		if (this.prog < 0) {
			this.prog += 360;
		}
		
		
		if (this.count >= this.range) {
			this.done = true;
		}

		let x = player.x+w/2 + this.len * Math.round(cos(radians(this.prog)))
		let y = player.y+w/2 + this.len * Math.round(sin(radians(this.prog)))

		
		let check = true;
		let e;
		
		if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))-1] && Math.round(x) / w == Math.floor(x/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))-1].walls[1] && this.prog > 90 && this.prog < 270) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
			check = false;
			e = 1;
		}
		if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))+1] && Math.round(x) / w == Math.ceil(x/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))+1].walls[3] && (this.prog < 90 || this.prog > 270)) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
			check = false;
			e = 2;
		}
		if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))+cols] && Math.round(y) / w == Math.ceil(y/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))+cols].walls[0] && this.prog < 180 && this.prog > 0) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
			check = false;
			e = 3;
		}
		if ((grids[room][index(Math.floor(x/w), Math.floor(y/w))-cols] && Math.round(y) / w == Math.floor(y/w) && grids[room][index(Math.floor(x/w), Math.floor(y/w))-cols].walls[2] && this.prog > 180 && this.prog < 360) || !grids[room][index(Math.floor(x/w), Math.floor(y/w))]) {
			check = false;
			e = 4;
		}
		
		if (!check || this.done) {
			knifes.splice(knifes.indexOf(this), 1)
			return true;
		} 
		var g = ghosts_ch[room]
		for(a=0;a<g.length;a++) {
			for (b=0;b<=this.len;b+=20) {
				x = player.x+w/2 + b * Math.round(cos(radians(this.prog)))
				y = player.y+w/2 + b * Math.round(sin(radians(this.prog)))

			
				if (dist(x,y,g[a].x+w/2, g[a].y+w/2) < w/2 && this.player && !this.done_dam.includes(g[a])) {
					g[a].hp -= this.dam;
					this.done_dam.push(g[a])
				}
			}
		}
		if (this.weapon == 8) {
			for(a=0;a<bullets.length;a++) {
				if (dist(bullets[a].x,bullets[a].y,player.x+w/4,player.y+w/4) <= this.range+w/4) {
					bullets[a].dir = int(bullets[a].dir + 180)
					if (bullets[a].dir > 360) {
						bullets[a].dir -= 360;
					}
					if (bullets[a].dir < 0) {
						bullets[a].dir += 360;
					}
					
				}
			}
		}
	}
}