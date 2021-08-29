const weapons = [[600,"Tomato rifle", 8, 10,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 9, 9);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 1))
}
}],
[3800,"Rocket Launcher", 3, 100,{draw: function(x,y,d){
	fill(0)
	noStroke();
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,0+4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 2))
}}], 
[320,"Minigun",6, 1.5,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(3)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,-9,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	
	let tmp_angle1 = int(d) + Math.floor(Math.random()*24)-12

	if (tmp_angle1 > 360) {
		tmp_angle1 -= 360;
	}
	else if (tmp_angle1 < 0) {
		tmp_angle1 += 360;
	}
	let tmp_angle2 = int(d) + Math.floor(Math.random()*24)-12

	if (tmp_angle2 > 360) {
		tmp_angle2 -= 360;
	}
	else if (tmp_angle2 < 0) {
		tmp_angle2 += 360;
	}

	if ((int(d) > 45 && int(d) < 135) || (int(d) > 225 && int(d) < 315)) {
		bullets.push(new Bullet(x+w/2+5, y+w/2, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x+w/2-5, y+w/2, tmp_angle2,9,n, 3))
	}
	else {
		bullets.push(new Bullet(x+w/2, y+w/2+5, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x+w/2, y+w/2-5, tmp_angle2,9,n, 3))
	}
}}],
 [1250, "Shotgun 2",6,3,{draw: function(x,y,d){
	strokeWeight(4)
	fill(0)
	stroke(0)
	for (var i = 0; i < 5; i++) {
		point(x+(Math.floor(Math.random()*16)-8), y+(Math.floor(Math.random()*16)-8))
	}	
}, shoot: function(x,y,d,p,n) {
	let angle1 = int(d) + 6;
	if (angle1 > 360) {angle1 -= 360}

	let angle2 = int(d) - 6;
	if (angle2 < 0) {angle2 += 360}

	let angle3 = int(d) + 24;
	if (angle3 > 360) {angle3 -= 360}

	let angle4 = int(d) - 24;
	if (angle4 < 0) {angle4 += 360}	

	let angle5 = int(d) + 15;
	if (angle5 > 360) {angle5 -= 360}

	let angle6 = int(d) - 15;
	if (angle6 < 0) {angle6 += 360}	


	bullets.push(new Bullet(x+w/2, y+w/2, angle1,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle2,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle3,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle4,9,n, 4))	
	bullets.push(new Bullet(x+w/2, y+w/2, angle5,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle6,9,n, 4))	
}}], 
[1300,"Assoult Rifle", 10, 3,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(2)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-6,0)
	pop()
}, shoot: function(x,y,d,p,n) {
    p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(p.shoot_angle),9,n,5))
	}, 120)
	setTimeout(function(){clearInterval(p.shooter)},700)

}}],
[1250, "Apple Rifle", 8, 12,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("green"); 
	ellipse(x, y, 10, 10);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 6))
}}],
[5800,"Rocket Launcher 2", 5, 100,{draw: function(x,y,d){
	fill(0)
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 7))
}}], 
[900, "Shotgun", 7, 1,{draw: function(x,y,d){
	strokeWeight(4)
	fill(0)
	stroke(0)
	for (var i = 0; i < 5; i++) {
		point(x+(Math.floor(Math.random()*16)-8), y+(Math.floor(Math.random()*16)-8))
	}	
}, shoot: function(x,y,d,p,n) {
	let angle1 = int(d) + 1;
	if (angle1 > 360) {angle1 -= 360}

	let angle2 = int(d) - 1;
	if (angle2 < 0) {angle2 += 360}

	let angle3 = int(d) + 3;
	if (angle3 > 360) {angle3 -= 360}

	let angle4 = int(d) - 3;
	if (angle4 < 0) {angle4 += 360}	

	bullets.push(new Bullet(x+w/2, y+w/2, angle1,9,n, 8))
	bullets.push(new Bullet(x+w/2, y+w/2, angle2,9,n, 8))
	bullets.push(new Bullet(x+w/2, y+w/2, angle3,9,n, 8))
	bullets.push(new Bullet(x+w/2, y+w/2, angle4,9,n, 8))	
}}], 
[720,"Assoult Rifle 2", 7, 4.2,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(2)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-6,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(p.shoot_angle),9,n,5))
	}, 80)
	setTimeout(function(){clearInterval(p.shooter)},500)
}}], 
[3400,"Assoult Rifle 3", 7, 4.2,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(2)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-6,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(p.shoot_angle),9,n,5))
	}, 150)
	setTimeout(function(){clearInterval(p.shooter)},1500)
}}]


];

const swords = [
	[1000, "fists",15,5,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(1)
			if (pl == player) {
				stroke("yellow")
			}
			else {
				stroke(0,255,0)
			}
			noFill()
			push()
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			//line(w/2, 0,w/2+p, 0)
			circle(w/2+p, 0, 6)

			pop()
		}
	}},true, 50],
	[500, "dagger",19,5,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			line(w/2, 0,w/2+p, 0)
			line(w/2, 1,w/2+p-4, 1)
			line(w/2, -1,w/2+p-4, -1)
			line(w/2+6, 2,w/2+p-8, 2)
			line(w/2+6, -2,w/2+p-8, -2)
			line(w/2+5, 3,w/2+5, -3)
			pop()
		}
	}},true, 30],
	[500, "butterfly knife",19,3,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			let r = swords[2][6]
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			rotate(radians(r/2-p*2))
			line(w/2, 0,w/2+r/2, 0)
			line(w/2, 1,w/2+r/2, 1)
			line(w/2, -1,w/2+r/2, -1)
			translate(w/2+r/2, 0)
			rotate(radians(180-map(p,0,r/2,0,180)))
			line(0, 0,r/2, 0)
			line(1, 0,r/2-3, 1)
			line(-1, 0,r/2-3, -1)
			//circle(w/2+p, 0, 6)

			pop()
		}
	}},true, 30],
	[1000, "lance",14,10,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(1)
			
			stroke("black")
			push()

			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			line(w/2, 0,w/2+p, 0)
			line(w/2+p-20, 1,w/2+p-2, 1)
			line(w/2+p-20, -1,w/2+p-2, -1)
			line(w/2+p-15, 2,w/2+p-6, 2)
			line(w/2+p-15, -2,w/2+p-6, -2)
			//circle(w/2+p, 0, 6)

			pop()
		}
	}},true, 90],
	[1000, "brass knuckels",19,5,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(3)
			stroke("grey")
			noFill()
			push()

			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			//line(w/2, 0,w/2+p, 0)
			circle(w/2+p, 0, 6)

			pop()
		}
	}},true, 40],
	[1100, "longsword",30,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			line(w/2, 0,l, 0)
			line(w/2, 1,l-4, 1)
			line(w/2, -1,l-4, -1)
			line(w/2+6, 2,l-8, 2)
			line(w/2+6, -2,l-8, -2)
			line(w/2+5, 3,w/2+5, -3)
			pop()
		}
	}},false, 80,90],
	[1000, "shortsword",35,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			line(w/2, 0,l, 0)
			line(w/2, 1,l-4, 1)
			line(w/2, -1,l-4, -1)
			line(w/2+6, 2,l-8, 2)
			line(w/2+6, -2,l-8, -2)
			line(w/2+5, 3,w/2+5, -3)
			pop()
		}
	}},false, 120,60],
	[2000, "katana",25,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			beginShape()
			vertex(w/2,0)
			vertex(w/2+5,5)
			vertex(w/2+35,5)
			vertex(l,0)
			endShape()
			beginShape()
			vertex(w/2,1)
			vertex(w/2+5,6)
			vertex(w/2+35,6)
			vertex(l-3,1)
			endShape()
			beginShape()
			vertex(w/2,-1)
			vertex(w/2+5,4)
			vertex(w/2+35,4)
			vertex(l-3,-1)
			endShape()
			pop()
			line(w/2+5, 3,w/2+5, -3)
		}
	}},false, 360,80],
	[1000, "light saber",19,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(7)
			stroke('rgba(255,0,0, 0.5)')
			noFill()
			push()
			translate(pl.x+w/2,pl.y+w/2)
			rotate(radians(d))
			line(w/2, 0,l, 0)
			stroke("black")
			line(w/2, 0,10, 0)
			pop()
		}
	}},false, 120,80]
]
const g_weapons = [[600,"Tomato rifle", 8, 10,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 9, 9);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 1))
}
}],
[3800,"Rocket Launcher", 3, 100,{draw: function(x,y,d){
	fill(0)
	noStroke();
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,0+4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 2))
}}], 
[320,"Minigun",3, 3,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(3)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,-9,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	
	let tmp_angle1 = int(d) + Math.floor(Math.random()*24)-12

	if (tmp_angle1 > 360) {
		tmp_angle1 -= 360;
	}
	else if (tmp_angle1 < 0) {
		tmp_angle1 += 360;
	}
	let tmp_angle2 = int(d) + Math.floor(Math.random()*24)-12

	if (tmp_angle2 > 360) {
		tmp_angle2 -= 360;
	}
	else if (tmp_angle2 < 0) {
		tmp_angle2 += 360;
	}

	if ((int(d) > 45 && int(d) < 135) || (int(d) > 225 && int(d) < 315)) {
		bullets.push(new Bullet(x+w/2+5, y+w/2, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x+w/2-5, y+w/2, tmp_angle2,9,n, 3))
	}
	else {
		bullets.push(new Bullet(x+w/2, y+w/2+5, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x+w/2, y+w/2-5, tmp_angle2,9,n, 3))
	}
}}],
 [1250, "Shotgun 2",4,3,{draw: function(x,y,d){
	strokeWeight(4)
	fill(0)
	stroke(0)
	for (var i = 0; i < 5; i++) {
		point(x+(Math.floor(Math.random()*16)-8), y+(Math.floor(Math.random()*16)-8))
	}	
}, shoot: function(x,y,d,p,n) {
	let angle1 = int(d) + 6;
	if (angle1 > 360) {angle1 -= 360}

	let angle2 = int(d) - 6;
	if (angle2 < 0) {angle2 += 360}

	let angle3 = int(d) + 24;
	if (angle3 > 360) {angle3 -= 360}

	let angle4 = int(d) - 24;
	if (angle4 < 0) {angle4 += 360}	

	let angle5 = int(d) + 15;
	if (angle5 > 360) {angle5 -= 360}

	let angle6 = int(d) - 15;
	if (angle6 < 0) {angle6 += 360}	


	bullets.push(new Bullet(x+w/2, y+w/2, angle1,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle2,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle3,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle4,9,n, 4))	
	bullets.push(new Bullet(x+w/2, y+w/2, angle5,9,n, 4))
	bullets.push(new Bullet(x+w/2, y+w/2, angle6,9,n, 4))	
}}], 
[1300,"Assoult Rifle", 5, 3,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(2)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-6,0)
	pop()
}, shoot: function(x,y,d,p,n) {
    p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(p.shoot_angle),9,n,5))
	}, 120)
	setTimeout(function(){clearInterval(p.shooter)},700)

}}],
[1250, "Apple Rifle", 8, 12,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("green"); 
	ellipse(x, y, 10, 10);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 6))
}}],
[5800,"Rocket Launcher 2", 5, 100,{draw: function(x,y,d){
	fill(0)
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(d),9,n, 7))
}}], 
[900, "Shotgun", 5, 1,{draw: function(x,y,d){
	strokeWeight(4)
	fill(0)
	stroke(0)
	for (var i = 0; i < 5; i++) {
		point(x+(Math.floor(Math.random()*16)-8), y+(Math.floor(Math.random()*16)-8))
	}	
}, shoot: function(x,y,d,p,n) {
	let angle1 = int(d) + 1;
	if (angle1 > 360) {angle1 -= 360}

	let angle2 = int(d) - 1;
	if (angle2 < 0) {angle2 += 360}

	let angle3 = int(d) + 3;
	if (angle3 > 360) {angle3 -= 360}

	let angle4 = int(d) - 3;
	if (angle4 < 0) {angle4 += 360}	

	bullets.push(new Bullet(x+w/2, y+w/2, angle1,9,n, 8))
	bullets.push(new Bullet(x+w/2, y+w/2, angle2,9,n, 8))
	bullets.push(new Bullet(x+w/2, y+w/2, angle3,9,n, 8))
	bullets.push(new Bullet(x+w/2, y+w/2, angle4,9,n, 8))	
}}], 
[720,"Assoult Rifle 2", 4, 4.2,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(5)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-9,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(p.shoot_angle),9,n,5))
	}, 80)
	setTimeout(function(){clearInterval(p.shooter)},500)
}}], 
[3400,"Assoult Rifle 3", 5, 4.2,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(5)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-9,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/2, p.y+w/2, int(p.shoot_angle),9,n,5))
	}, 150)
	setTimeout(function(){clearInterval(p.shooter)},1500)
}}]


];




