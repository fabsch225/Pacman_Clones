const weapons = [[500,"Tomato rifle", 18, 10,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 9, 9);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 1))
}
}],
[3800,"Rocket Launcher", 5, 100,{draw: function(x,y,d){
	fill(0)
	noStroke();
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,0+4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 2))
}}], 
[110,"Minigun",20, 1.5,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(3)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,-9,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	
	let tmp_angle1 = int(d) + Math.floor(Math.random()*8)-4

	if (tmp_angle1 > 360) {
		tmp_angle1 -= 360;
	}
	else if (tmp_angle1 < 0) {
		tmp_angle1 += 360;
	}
	let tmp_angle2 = int(d) + Math.floor(Math.random()*8)-4

	if (tmp_angle2 > 360) {
		tmp_angle2 -= 360;
	}
	else if (tmp_angle2 < 0) {
		tmp_angle2 += 360;
	}

	if ((int(d) > 45 && int(d) < 135) || (int(d) > 225 && int(d) < 315)) {
		bullets.push(new Bullet(x+w/4+5, y+w/4, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x+w/4-5, y+w/4, tmp_angle2,9,n, 3))
	}
	else {
		bullets.push(new Bullet(x+w/4, y+w/4+5, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x+w/4, y+w/4-5, tmp_angle2,9,n, 3))
	}
}}],
 [1250, "Shotgun 2",18,9,{draw: function(x,y,d){
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


	bullets.push(new Bullet(x+w/4, y+w/4, angle1,9,n, 4))
	bullets.push(new Bullet(x+w/4, y+w/4, angle2,9,n, 4))
	bullets.push(new Bullet(x+w/4, y+w/4, angle3,9,n, 4))
	bullets.push(new Bullet(x+w/4, y+w/4, angle4,9,n, 4))	
	bullets.push(new Bullet(x+w/4, y+w/4, angle5,9,n, 4))
	bullets.push(new Bullet(x+w/4, y+w/4, angle6,9,n, 4))	
}}], 
[1300,"Assoult Rifle", 20, 3,{draw: function(x,y,d){
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
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(p.shoot_angle),9,n,5))
	}, 80)
	setTimeout(function(){clearInterval(p.shooter)},700)

}}],
[700, "Apple Rifle", 20, 12,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("green"); 
	ellipse(x, y, 10, 10);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 6))
}}],
[1800,"Rocket Launcher 2", 8, 100,{draw: function(x,y,d){
	fill(0)
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 7))
}}], 
[700, "Shotgun", 18, 4,{draw: function(x,y,d){
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

	bullets.push(new Bullet(x+w/4, y+w/4, angle1,9,n, 8))
	bullets.push(new Bullet(x+w/4, y+w/4, angle2,9,n, 8))
	bullets.push(new Bullet(x+w/4, y+w/4, angle3,9,n, 8))
	bullets.push(new Bullet(x+w/4, y+w/4, angle4,9,n, 8))	
}}], 
[820,"Assoult Rifle 2", 20,6,{draw: function(x,y,d){
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
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(p.shoot_angle),9,n,5))
	}, 60)
	setTimeout(function(){clearInterval(p.shooter)},300)
}}], 
[3400,"Assoult Rifle 3", 20, 5,{draw: function(x,y,d){
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
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(p.shoot_angle),9,n,5))
	}, 100)
	setTimeout(function(){clearInterval(p.shooter)},1500)
}}],

[1200,"Throwing stars", 10, 9,{draw: function(x,y,d,p,r){
	
	strokeWeight(3)
	stroke(0)
	push()
	translate(x,y)
	rotate(radians(degrees(r*10)))
	line(4,0,0-4,0)
	line(0,4,0,0-4)
	pop()
}, shoot: function(x,y,d,p,n) {
	let angles = [int(d)-14, int(d), int(d) + 14]

	if (angles[2] > 360) {angles[1] -= 360}

	if (angles[0] < 0) {angles[2] += 360}

	for (o=0;o<3;o++) {
		weapons[10][4].time(x,y,d,n,angles[o],o*50)
		console.log(angles[o])
	}
}, time: function(x,y,d,n,a,b) {
	setTimeout(function(){
		bullets.push(new Bullet(x+w/4, y+w/4,int(a),9,n, 11))
	},b)
}}],
[2000,"Sniper", 60,25,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(5)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-10,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	p.sniping = true
	setTimeout(function(){
		bullets.push(new Bullet(player.x+w/4, player.y+w/4,int(player.shoot_angle),9,n, 12))
		p.sniping = false
	},1000)
}}],
[1000,"Laser gun", 6,25,{draw: function(x,y,d){
	var h1 = (width/2-player.x)
	var h2 = (height/2-player.y)

	for (o = 0; o < player.ls.length; o++) {
		strokeWeight(5)
		stroke('rgba(255,255,0, 0.3)')
		noFill()
		if (o==0) {
			line(width/2,height/2,h1+player.ls[o][2],h2+player.ls[o][3] )
		}
		else {
			line(h1+player.ls[o][0],h2+player.ls[o][1], h1+player.ls[o][2], h2+player.ls[o][3])
		}
	}
}, shoot: function(x,y,d,p,n) {
	player.ls = []
	let vx = x;
	let vy = y;
	let an = player.shoot_angle;
	for (o = 0; o < 10; o++) {
		let res = view(vx,vy,an,false,true)
		let m = (vy-res[2])/(vx-res[1])
		player.ls.push([vx,vy,res[1], res[2], m])
		vx = res[1];
		vy = res[2];
		an = an + 180 + Math.floor(Math.random()*40)-20
	}
	
	bullets.push(new Bullet(player.x+w/4, player.y+w/4,int(player.shoot_angle),9,n, 13))
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
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			//line(w/4, 0,w/4+p, 0)
			circle(w/4+p, 0, 6)

			pop()
		}
	}},true, 50],
	[500, "dagger",19,5,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			line(w/4, 0,w/4+p, 0)
			line(w/4, 1,w/4+p-4, 1)
			line(w/4, -1,w/4+p-4, -1)
			line(w/4+6, 2,w/4+p-8, 2)
			line(w/4+6, -2,w/4+p-8, -2)
			line(w/4+5, 3,w/4+5, -3)
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
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			rotate(radians(r/2-p*2))
			line(w/4, 0,w/4+r/2, 0)
			line(w/4, 1,w/4+r/2, 1)
			line(w/4, -1,w/4+r/2, -1)
			translate(w/4+r/2, 0)
			rotate(radians(180-map(p,0,r/2,0,180)))
			line(0, 0,r/2, 0)
			line(1, 0,r/2-3, 1)
			line(-1, 0,r/2-3, -1)
			//circle(w/4+p, 0, 6)

			pop()
		}
	}},true, 30],
	[1000, "lance",14,10,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(1)
			
			stroke("black")
			push()

			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			line(w/4, 0,w/4+p, 0)
			line(w/4+p-20, 1,w/4+p-2, 1)
			line(w/4+p-20, -1,w/4+p-2, -1)
			line(w/4+p-15, 2,w/4+p-6, 2)
			line(w/4+p-15, -2,w/4+p-6, -2)
			//circle(w/4+p, 0, 6)

			pop()
		}
	}},true, 90],
	[1000, "brass knuckels",19,5,{draw: function(d,p,pl) {
		if (pl) {
			strokeWeight(3)
			stroke("grey")
			noFill()
			push()

			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			//line(w/4, 0,w/4+p, 0)
			circle(w/4+p, 0, 6)

			pop()
		}
	}},true, 40],
	[1100, "longsword",30,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			line(w/4, 0,l, 0)
			line(w/4, 1,l-4, 1)
			line(w/4, -1,l-4, -1)
			line(w/4+6, 2,l-8, 2)
			line(w/4+6, -2,l-8, -2)
			line(w/4+5, 3,w/4+5, -3)
			pop()
		}
	}},false, 80,90],
	[1000, "shortsword",35,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			line(w/4, 0,l, 0)
			line(w/4, 1,l-4, 1)
			line(w/4, -1,l-4, -1)
			line(w/4+6, 2,l-8, 2)
			line(w/4+6, -2,l-8, -2)
			line(w/4+5, 3,w/4+5, -3)
			pop()
		}
	}},false, 120,60],
	[2000, "katana",25,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(1)
			stroke("black")
			noFill()
			push()
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			beginShape()
			vertex(w/4,0)
			vertex(w/4+5,5)
			vertex(w/4+35,5)
			vertex(l,0)
			endShape()
			beginShape()
			vertex(w/4,1)
			vertex(w/4+5,6)
			vertex(w/4+35,6)
			vertex(l-3,1)
			endShape()
			beginShape()
			vertex(w/4,-1)
			vertex(w/4+5,4)
			vertex(w/4+35,4)
			vertex(l-3,-1)
			endShape()
			pop()
			line(w/4+5, 3,w/4+5, -3)
		}
	}},false, 360,80],
	[1000, "light saber",19,10,{draw: function(l,d,pl) {
		
		if (pl) {
			strokeWeight(7)
			stroke('rgba(255,0,0, 0.5)')
			noFill()
			push()
			translate(pl.sx+w/4,pl.sy+w/4)
			rotate(radians(d))
			line(w/4, 0,l, 0)
			stroke("black")
			line(w/4, 0,10, 0)
			pop()
		}
	}},false, 120,80]
]
const g_weapons = [[600,"Tomato rifle", 8, 10,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 9, 9);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 1))
}, shoot2: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		for (o=0;o<360;o+=20) {
			bullets.push(new Bullet(p.x, p.y, int(o),9,n, 1))
		}
	}, 120)
	setTimeout(function(){clearInterval(p.shooter)},1000)
}
}],
[1800,"Rocket Launcher", 3, 10,{draw: function(x,y,d){
	fill(0)
	noStroke();
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,0+4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x, p.y, int(d),9,n, 2))
}, shoot2: function(x,y,d,p,n) {

}
}], 
[190,"Minigun",3, 3,{draw: function(x,y,d){
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
		bullets.push(new Bullet(x+5, y, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x-5, y, tmp_angle2,9,n, 3))
	}
	else {
		bullets.push(new Bullet(x, y+5, tmp_angle1,9,n, 3))
		bullets.push(new Bullet(x, y-5, tmp_angle2,9,n, 3))
	} 
}, shoot2: function(x,y,d,p,n) {

}
}],
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


	bullets.push(new Bullet(x, y, angle1,9,n, 4))
	bullets.push(new Bullet(x, y, angle2,9,n, 4))
	bullets.push(new Bullet(x, y, angle3,9,n, 4))
	bullets.push(new Bullet(x, y, angle4,9,n, 4))	
	bullets.push(new Bullet(x, y, angle5,9,n, 4))
	bullets.push(new Bullet(x, y, angle6,9,n, 4))	
}, shoot2: function(x,y,d,p,n) {

}}], 
[1600,"Assoult Rifle", 5, 3,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(4)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-10,0)
	pop()
}, shoot: function(x,y,d,p,n) {
    p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x, p.y, int(p.shoot_angle),9,n,5))
	}, 120)
	setTimeout(function(){clearInterval(p.shooter)},1000)

}, shoot2: function(x,y,d,p,n) {

}}],
[1250, "Apple Rifle", 8, 12,{draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("green"); 
	noFill()
	strokeWeight(2)
	ellipse(x, y, 10, 10);  
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x, p.y, int(d),9,n, 6))
}, shoot2: function(x,y,d,p,n) {

}}],
[2800,"Rocket Launcher 2", 7, 14,{draw: function(x,y,d){
	fill(0)
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
}, shoot: function(x,y,d,p,n) {
	bullets.push(new Bullet(p.x, p.y, int(d),9,n, 7))
}, shoot2: function(x,y,d,p,n) {

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

	bullets.push(new Bullet(x, y, angle1,9,n, 8))
	bullets.push(new Bullet(x, y, angle2,9,n, 8))
	bullets.push(new Bullet(x, y, angle3,9,n, 8))
	bullets.push(new Bullet(x, y, angle4,9,n, 8))	
}, shoot2: function(x,y,d,p,n) {

}}], 
[920,"Assoult Rifle 2", 4, 4.2,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(4)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-10,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x, p.y, int(p.shoot_angle),9,n,5))
	}, 80)
	setTimeout(function(){clearInterval(p.shooter)},700)
}, shoot2: function(x,y,d,p,n) {

}}], 
[3400,"Assoult Rifle 3", 5, 4.2,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(4)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-10,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	 p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x, p.y, int(p.shoot_angle),9,n,5))
	}, 150)
	setTimeout(function(){clearInterval(p.shooter)},2000)
}, shoot2: function(x,y,d,p,n) {

}}],
[1800,"Sniper", 500,20,{draw: function(x,y,d){
	fill(0)
	stroke(0)
	strokeWeight(5)
	push()
	translate(x,y)
	rotate(radians(d))
	line(0,0,0-10,0)
	pop()
}, shoot: function(x,y,d,p,n) {
	p.sniping = true
	setTimeout(function(){
		
		bullets.push(new Bullet(p.x, p.y,int(p.shoot_angle),9,n, 11))
		p.sniping = false
		
	},2000)
}, shoot2: function(x,y,d,p,n) {

}}]
];




