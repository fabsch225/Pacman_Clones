const b_weapons = [["Tomato monster", [
[600, 12, 20, {
draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 70, 70);  
}, 
shoot: function(x,y,d,p,n) {
	for (o=0;o<20;o++) {
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 1,0,35))
	}
}
}], 
[600, 8, 20, { 
draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 9, 9);  
},  
shoot: function(x,y,d,p,n) {
	p.shooter = setInterval(function(){
		for (o=0;o<360;o+=12) {
			bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(o),9,n, 1,1))
		}
	}, 120)
	setTimeout(function(){clearInterval(p.shooter)},1000)
}
}], 
[1200 , 8, 20, { 
draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 9, 9);  
},  
shoot: function(x,y,d,p,n) {
	p.prog = 0;
	p.shooter = setInterval(function(){
		let a1 = int(p.prog*10)+180
		if (a1 > 360) {
			a1 -= 360;
		}	
		let a2 = int(p.prog*10)+90
		if (a2 > 360) {
			a2 -= 360;
		}
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(p.prog*10),9,n, 1,2))
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, a1,9,n, 1,2))
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, a2,9,n, 1,2))
		p.prog++;
	}, 60)
	setTimeout(function(){clearInterval(p.shooter)},4000)
}
}], 
[600, 2, 20, { 
draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("red"); 
	ellipse(x, y, 30, 30);  
},  
shoot: function(x,y,d,p,n) {
	p.shooter = setInterval(function(){
		for (o=0;o<360;o+=12) {
			bullets.push(new Bullet(p.x+w/4, p.y+w/4, Math.floor(Math.random()*360),9,n, 1,3, 15))
		}
	}, 120)
	setTimeout(function(){clearInterval(p.shooter)},1000)
}
}],

]],["Chief blaster", [
[600, 5, 20, {
draw: function(x,y,d){
	ellipseMode(CENTER);  
	stroke("black");
	fill("black") 
	ellipse(x, y, 50, 50);  
}, 
shoot: function(x,y,d,p,n) {
	
	bullets.push(new Bullet(p.x+w/4, p.y+w/4, int(d),9,n, 2,0,25,true,true))
	
}
}], 
[1100, 3, 30, { 
draw: function(x,y,d){
	fill(0)
	push()
	translate(x,y)
	rotate(radians(d))
	rect(0,4,-24,-8);
	triangle(0, 0+4, 0, 0-4, 0+6, 0) //OK
	pop()
},  
shoot: function(x,y,d,p,n) {
	p.shooter = setInterval(function(){
		bullets.push(new Bullet(p.x+w/4, p.y+w/4, random(360),9,n, 2,1))
	}, 100)
	setTimeout(function(){clearInterval(p.shooter)},1000)	
}
}], 
[700, 8, 20, { 
draw: function(x,y,d){
	return
},  
shoot: function(x,y,d,p,n) {
	p.shooter = setInterval(function(){
		explosions.push(new Explosion(Math.floor(Math.random()*(cols-6)+3),Math.floor(Math.random()*(rows-8)+4), 800, false, 0.1,40,9))
	}, 20)
	setTimeout(function(){
		clearInterval(p.shooter)
		
	},2400)
}
}], 
[800, 10, 10, { 
draw: function(x,y,d){
	ellipseMode(CENTER);  
	fill(33); 
	noStroke();
	ellipse(x, y, 6, 6);  
},  
shoot: function(x,y,d,p,n) {
	p.shooter = setInterval(function(){
		for (o=0;o<120;o+=12) {
			let a1 = int(d) + Math.random()*60-30
			//console.log(a1)
			if (a1 > 360) {
				a1 -= 360;
			}	
			bullets.push(new Bullet(p.x+w/4+Math.random()*20, p.y+w/4+Math.random()*20,a1 ,9,n, 2,3,false,false))
		}
	}, 50)
	setTimeout(function(){clearInterval(p.shooter)},2000)
}
}]

]],["Jedi Master", [
[600, 5, 20, {
draw: function(x,y,d){
	var h1 = (width/2-player.x)
	var h2 = (height/2-player.y)
	var p = ghosts_ch[room][0];
	if (p) {
		for (o = 0; o < p.ls.length; o++) {
			strokeWeight(9)
			stroke('rgba(255,0,0, 0.3)')
			noFill()
			if (o==0) {
				line(h1+p.x,h2+p.y,h1+p.ls[o][2],h2+p.ls[o][3])
			}
			else {
				line(h1+p.ls[o][0],h2+p.ls[o][1], h1+p.ls[o][2], h2+p.ls[o][3])
			}
		}
	}   
}, 
shoot: function(x,y,d,p,n) {
	p.ls = []
	let vx = x;
	let vy = y;
	let an = p.shoot_angle;
	for (o = 0; o < 30; o++) {
		let res = view(vx,vy,an,false,true)
		let m = (vy-res[2])/(vx-res[1])
		p.ls.push([vx,vy,res[1], res[2], m])
		vx = res[1];
		vy = res[2];
		an = an + 180 + Math.floor(Math.random()*60)-30
	}
	
	bullets.push(new Bullet(p.x+w/4, p.y+w/4,int(p.shoot_angle),9,n, 3,0,false,false))
	
}
}], 
[1100, 8, 30, { 
draw: function(x,y,d){
	ellipseMode(CENTER);  
	fill(33); 
	noStroke();
	ellipse(x, y, 21, 21);  
},  
shoot: function(x,y,d,p,n) {
	let r = 90;

	let x2 =  x + r * cos(radians(int(d)))
	let y2 =  y + r * sin(radians(int(d)))
	let a1 = int(d)-90
	if (a1 < 0) {
		a1 += 360;
	}	
	let a2 = int(d)+90
	if (a2 > 360) {
		a2 -= 360;
	}

	for (o=0;o<360;o+=6) {
		let x1 = x2 + r * cos(radians(o))
		let y1 = y2 + r * sin(radians(o))
		bullets.push(new Bullet(x1, y1,int(d),9,n, 3,1))
		bullets[bullets.length-1].ch_dir = true;
		bullets[bullets.length-1].ch_dir_d = o;
		bullets.push(new Bullet(x1, y1,int(a2),9,n, 3,1))
		bullets[bullets.length-1].ch_dir = true;
		bullets[bullets.length-1].ch_dir_d = o;
		bullets.push(new Bullet(x1, y1,int(a1),9,n, 3,1))
		bullets[bullets.length-1].ch_dir = true;
		bullets[bullets.length-1].ch_dir_d = o;
	}
	setTimeout(function(){
		for (o=0;o<bullets.length;o++) {
			if (bullets[o].ch_dir) {
				bullets[o].dir = bullets[o].ch_dir_d;
			}
		}
	},500)
}
}], 
[700, 12, 100, { 
draw: function(x,y,d){
	
	let l = 100
	strokeWeight(7)
	stroke('rgba(255,0,0, 0.5)')
	noFill()
	push()
	translate(x,y)
	rotate(radians(ghosts_ch[room][0].prog*10))
	line(w/4-l/2, 0,l/2, 0)
	stroke("black")
	line(w/4-l/2, 0,20-l/2, 0)
	pop()
},  
shoot: function(x,y,d,p,n) {
	ghosts_ch[room][0].prog = 0;
	for (o=0;o<360;o+=15) {
		bullets.push(new Bullet(x, y,int(o),9,n, 3,2,50))
	}
	let t = setInterval(function(){
		ghosts_ch[room][0].prog+=1.4;
	},10)
	setTimeout(function(){
		clearInterval(t)
	}, 1800)
} 
}], 
[1200, 10, 10, { 
draw: function(x,y,d){
	return
},  
shoot: function(x,y,d,p,n) {
	let ps = []
	for (o=0;o<26;o++) {
		let x1 = Math.floor(Math.random()*(cols-6))+3
		let y1 =  Math.floor(Math.random()*(cols-6))+3

		let ind = index(x1,y1)
		

		if (grids[room][ind] && grids[room][ind].visited) {
			bullets.push(new Bullet(x1*w, y1*w,int(d),9,n, 3,4,0))
			bullets[bullets.length-1].bot = true;
			ps.push([x1*w,y1*w])
		}
	}
	let t = setInterval(function(){
		for (o=0;o<ps.length;o++) {
			let x2 = ps[o][0]
			let y2 = ps[o][1]

			v1 = createVector(x2,0);

		    v0 = createVector(x2, y2);
		    v2 = createVector((player.x)-x2,(player.y)-y2);
		 	
		    let angleBetween = degrees(v1.angleBetween(v2));

			if (v1.y > v2.y) {
				angleBetween = int(360 - int(angleBetween));
			}
			 	
		  	let a  = angleBetween;

		  	bullets.push(new Bullet(x2, y2, int(a),9,"ghost",5))
		  	bullets[bullets.length-1].speed = 12;
		  	bullets[bullets.length-1].dam = 9;
		}
	},100)
	setTimeout(function(){
		clearInterval(t)
		for(o=0;o<bullets.length;o++) {
			if (bullets[o].bot) {
				bullets.splice(o,1)
			}
		}
	},2100)
}
}], 
[0, 0, 0, { 
draw: function(x,y,d){
	fill(0); 
	noStroke();
	ellipse(x,y,33,33)

},  
shoot: function(x,y,d,p,n) {
	return
}
}]

]]

];