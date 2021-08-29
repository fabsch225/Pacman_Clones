function keycheck() {
	var nd;

	var x = player.x;
	var y = player.y;

	/*if (keyIsDown(87)) {
		var ch = check(4,x,y);	
		if (x >= 0 && !ch[0][2] && !ch[1][2] && ch[2]) {
		   	player.dir = 4;	
		} 
	}
	if (keyIsDown(68)) {
		var ch = check(2,x,y);	
		if (x <= width && !ch[0][1] && !ch[1][1] && ch[2]) {
		   	player.dir = 2;	
		} 
	}
	if (keyIsDown(83)) {
		var ch = check(3,x,y);	
		if (y <= height && !ch[0][0] && !ch[1][0] && ch[2]) {
		   	player.dir = 3;	
		} 
	}
	if (keyIsDown(65)) {
		var ch = check(1,x,y);	
		if (y >= 0 && !ch[0][3] && !ch[1][3] && ch[2]) {
		   	player.dir = 1;	
		} 
	}*/
	if ((keyIsDown(32) || mouseIsPressed) && !gameover && !schutzzeit) {
		if (shootPossible && !gameover) {
			
			if (mouseButton === LEFT && player.weapon != "free") {
				var we = player.weapon
				reload = weapons[we-1][0]/10;
				var interval = setInterval(function(){reload--}, 10)
				shootPossible = false;
			    setTimeout(function(){shootPossible = true; clearInterval(interval); reload = 0}, weapons[we-1][0])
			    player.shoot(false);
			}
			else if (mouseButton === RIGHT) {
				var we = player.inv[0]
				reload = swords[parseInt(we)][0]/10
				var cw = player.weapon;
				player.weapon = player.inv[0];
				var interval = setInterval(function(){reload--}, 10)
				shootPossible = false;
			 	setTimeout(function(){shootPossible = true; clearInterval(interval); reload = 0; player.weapon = cw},swords[parseInt(we)][0])
			 	player.shoot(true);
			}	
			
		}

	}
/*	if (keyIsDown(49) && player.inv[0] != "free" && !String(player.inv[0]).includes("k")) {
		player.weapon = player.inv[0];
		reload = weapons[player.inv[0]][0]/10;
	}
	else if (keyIsDown(49) && player.inv[0] != "free") {
		player.weapon =player.inv[0];

		reload = swords[parseInt(player.inv[0])][0]/10;
	}*/
	if (keyIsDown(49) && !String(player.inv[1]).includes("k")) {
		player.weapon = player.inv[1];
		if (player.inv[1] != "free") {
			reload = weapons[player.inv[1]-1][0]/10;
		}
	}

	if (keyIsDown(50) && !String(player.inv[2]).includes("k")) {
		player.weapon = player.inv[2];
		if (player.inv[2] != "free") {
			reload = weapons[player.inv[2]-1][0]/10;
		}
	}
	
	if (keyIsDown(51) && !String(player.inv[3]).includes("k")) {
		player.weapon = player.inv[3];
		if (player.inv[3] != "free") {
			reload = weapons[player.inv[3]-1][0]/10;
		}
	}
	
	if (keyIsDown(81) && player.inv.includes(player.weapon) ) {

		let d = player.dir;
		
		let dx = player.x + w * cos(radians(player_angle+180))
		let dy =  player.y + w * sin(radians(player_angle+180))

		let ind = index(Math.round(dx/w),Math.round(dy/w))

		//console

		if (mouseIsPressed && mouseButton === RIGHT && player.inv[0] != "0k" && player.weapon != "free") {
			grids[room][ind].crate_l = player.inv[0];
			player.inv[0] = "0k";
			grids[room][ind].crate = true;
		}	
		if (!String(player.weapon).includes("k") && player.weapon != "free") {
			grids[room][ind].crate_l = player.weapon;
			player.inv[player.inv.indexOf(player.weapon)] = "free";
			grids[room][ind].crate = true;
			player.weapon = "free"
		}
	}
}

function updateAll() {
	if (coinWidth > 10) {
		cop = -0.2;
	}
	if (coinWidth < 4) {
		cop = 0.2;
	}
	if (!gameover) {
	coinWidth += cop
	}
	//if (frameCount % Math.round(45 / w) == 0) {
		if (!gameover && !schutzzeit) {

			if (player.weapon == 3) {
				var s = player.speed /2;
			}
			/*else if (player.weapon == "free") {
				var s = player.speed*2
			}*/
			else {
				var s = player.speed;
			}

			for(var i = 0; i < s; i++) {
				keycheck()
				player.update()
			}
			for(i = 0; i < ghosts_ch[room].length; i++) {
				for(var j = 0; j < ghosts_ch[room][i].speed; j++) {
				    if(ghosts_ch[room][i].update()) {break}
				}	
			}
			
			for(i = 0; i < explosions.length; i++) {
				explosions[i].update();
			}
			for(i = 0; i < fire.length; i++) {
				if(fire[i].update()) {break}
			}
			for(i = 0; i < bullets.length; i++) {
				if (bullets[i]) {
					for(var j = 0; j < bullets[i].speed; j++) {
						if(bullets[i].update()) {break}
					}	
				}
			}
			for(i = 0; i < knifes.length; i++) {
				if (knifes[i]) {
					for(var j = 0; j < knifes[i].speed; j++) {
						if(knifes[i].update()) {break}
					}	
				}
			}
			for (i=0;i<messages.length;i++) {
				messages[i].update();
			}
		}
		else if (!gameover) {
			for(var i = 0; i < player.speed; i++) {
				keycheck()
				player.update()
			}
			for(i = 0; i < knifes.length; i++) {
				if (knifes[i]) {
					for(var j = 0; j < knifes[i].speed; j++) {
						if(knifes[i].update()) {break}
					}	
				}
			}
			for(i = 0; i < bullets.length; i++) {
				if (bullets[i]) {
					for(var j = 0; j < bullets[i].speed; j++) {
						if(bullets[i].update()) {break}
					}	
				}
			}
			for (i=0;i<messages.length;i++) {
				messages[i].update();
			}
		}
	//}
}
function showAll() {
	if (frameCount % Math.floor(60/background_fps) == 0){
		background(51);
	}	
	stroke(255);	
	strokeWeight(1);
	if (frameCount % Math.floor(60/background_fps) == 0){
		for (i = 0; i < grids[room].length; i++) { 
			grids[room][i].show(0,0);
		}
		if (room % room_cols != 0) {
			if (grids[room-1]) {
				for (i = 0; i < grids[room-1].length; i++) { 
					grids[room-1][i].show(-(cols*w),0);
				}
			}
		}
		if (room+1 % room_cols != 0) {
			if (grids[room+1]) {
				for (i = 0; i < grids[room+1].length; i++) { 
					grids[room+1][i].show((cols*w),0);
				}
			}
		}
		if (room >= room_cols) {
			if (grids[room-room_cols]) {
				for (i = 0; i < grids[room-room_cols].length; i++) { 
					grids[room-room_cols][i].show(0,-(rows*w));
				}
			}
		}
		if (room <= room_a - room_cols) {
			if (grids[room+room_cols]) {
				for (i = 0; i < grids[room+room_cols].length; i++) { 
					grids[room+room_cols][i].show(0,rows*w);
				}
			}	
		}
		for (i=0;i<messages.length;i++) {
			messages[i].show();
		}
	}
	for(i = 0; i < ghosts_ch[room].length; i++) {
		noFill()
		ghosts_ch[room][i].show()
	}





	noFill()
	player.show();
	noFill()
	for(i = 0; i < bullets.length; i++) {
		bullets[i].show()
	}
	for(i = 0; i < explosions.length; i++) {
		explosions[i].show()
	}
	for(i = 0; i < knifes.length; i++) {
		knifes[i].show()
	}
	if (gameover) {
		var h = player.hits;
		var m = player.lostHits;
		if (keyIsPressed === true && timer) {
			gameover = false;
			new_maze()
		}
		fill(11);
		stroke(0);
		strokeWeight(10);
		rect(100,100,width-200,height-200)
		fill(255,255,0)
		stroke(0);
		strokeWeight(3);
		textSize(42);
		text(message, width/2-textWidth(message)/2, 160);	
		text("Press any key to play", width/2-textWidth("Press any key to play")/2, 250);
		text("Move with WASD", width/2-textWidth("Move with WASD")/2, 300);
		text("Shoot with space", width/2-textWidth("Shoot with space")/2, 350);
		text("Use 12345 to change weapons", width/2-textWidth("Use 12345 to change weapons")/2, 400);
		text("Dont let  the ghosts_ch[room] touch you", width/2-textWidth("Dont let  the ghosts_ch[room] touch you")/2, 450);
		text("And dont let them hit you with their weapons", width/2-textWidth("And dont let them hit you with their weapons")/2, 500);
		if(!fullscreen()) {
			fill(150)
			noStroke()
			rect(120,120,100,100)
			noFill()
			strokeWeight(10)
			stroke(255)
			rect(140,140,60,60)
			stroke(150)
			line(170,125,170,215)
			line(125,170,215,170)
		}
		if (message != "Welcome to Pacman" && m  &&  h ) {
			fill(255)
			noStroke()
			text(Math.round(map(h, 0, h+m, 0, 100)) + "% Accuracy", width/2-textWidth(Math.round(map(player.hits, 0, player.hits+player.lostHits, 0, 100)) + "% Accuraty")/2, height-110);
		}

		if (mouseIsPressed && mouseX > width/2-250 && mouseX < width/2+250 && mouseY > 600 && mouseY < 700) {
			difficulty = (mouseX - width/2+250) / 2.5
		}
		if (mouseIsPressed && mouseX > 140 && mouseX < 200 && mouseY > 140 && mouseY < 200) {
			fullscreen(!fullscreen())
		}
		noFill()
		stroke(0)
		strokeWeight(4)
		rect(width/2-250, 600, 500, 100)		//mouseIsPressed
		fill("yellow")
		noStroke()
		rect(width/2-250, 602, difficulty*2.5, 96)	
		fill("blue")
		text("Difficulty: " + Math.round(difficulty), width/2-textWidth("Difficulty: " + Math.round(difficulty))/2, 670);
	}
	strokeWeight(1);
	textSize(32);
	/*if (ghosts_ch[room][0].speed == 4 && !schutzzeit && !gameover) {
		text(player.coins + " / " + allcoins + " Coins", 10, 30);	
	}*/
	if(schutzzeit && !gameover) {
		fill(255)
		text("Prepare to fight " + fr_timer, width/2-textWidth("Schutz " + fr_timer)/2, 30);
		fill(255,255,0)
	}
	if (!gameover) { 
		textSize(w);
		noStroke()
		fill(255,255,0)
		
		
		let wi = 0;
		stroke("black")
		for (a = 0; a < player.inv.length; a++) {
			noFill()
			if (player.inv[a] != "free") {
				if (player.weapon == player.inv[a]) {
					if (!String(player.weapon).includes("k")) {
						var p = map(reload, 0, weapons[player.weapon-1][0]/10, 0, textWidth(weapons[player.weapon-1][1]))
						stroke("blue")
						rect(wi, height-w*2, textWidth(weapons[player.inv[a]-1][1]), w)
						stroke("yellow")
						rect(wi, height-w*2, textWidth(weapons[player.inv[a]-1][1])-p, w)
						
						text(weapons[player.inv[a]-1][1], wi, height-w)
						wi += textWidth(weapons[player.inv[a]-1][1])
					}
					else {
						var wep = parseInt(player.inv[a])
						var p = map(reload, 0, swords[parseInt(player.weapon)][0]/10, 0, textWidth(swords[parseInt(player.weapon)][1]))
						stroke("blue")
						rect(wi, height-w*2, textWidth(swords[wep][1]), w)
						stroke("yellow")
						rect(wi, height-w*2, textWidth(swords[wep][1])-p, w)
					
						text(swords[wep][1], wi, height-w)
						wi += textWidth(swords[wep][1])
					}
				}
				else {
					if (!String(player.inv[a]).includes("k")) {
						rect(wi, height-w*2, textWidth(weapons[player.inv[a]-1][1]), w)
						text(weapons[player.inv[a]-1][1], wi, height-w)
						wi += textWidth(weapons[player.inv[a]-1][1])
					}
					else {
						rect(wi, height-w*2, textWidth(swords[parseInt(player.inv[a])][1]), w)
						text(swords[parseInt(player.inv[a])][1], wi, height-w)
						wi += textWidth(swords[parseInt(player.inv[a])][1])
					}
				}
				stroke("blue")
			}
			else {
				rect(wi, height-w*2, w, w)
				wi += w;
			}

		}
	let pox = 0
	let poy = 0
	for (a = 0; a < room_rows; a++) {
		for (b = 0; b < room_cols; b++) {

			let pos = b + a * room_cols
			if (rooms.includes(pos) && ((room_data[rooms.indexOf(pos)] && room_data[rooms.indexOf(pos)].visited) || (room_data[rooms.indexOf(pos+1)] && room_data[rooms.indexOf(pos+1)].visited) || (room_data[rooms.indexOf(pos-1)] && room_data[rooms.indexOf(pos-1)].visited) || (room_data[rooms.indexOf(pos+room_cols)] && room_data[rooms.indexOf(pos+room_cols)].visited) || (room_data[rooms.indexOf(pos-room_cols)] && room_data[rooms.indexOf(pos-room_cols)].visited))) {
				if (grids[pos].boss) {
					stroke("red")
				}
				else {
					stroke("blue")
				}
				if (pos == room) {
					stroke("yellow")
				}
				else if (ghosts_ch[pos].length == 0) {
					stroke("green")
				}
				noFill()
				
				rect(pox,poy,w,w)
			}
			pox += w+10
		}
	pox = 0		
	poy += w+10
	}

	}
	fill(255,255,0)
	strokeWeight(3);
	textSize(64);
	if (logo) {
		text("PACMAN", 0, 60);	
	}
	textSize(20)
	
	text(room, width-100, 60)
	
	if (dev_mode) {
		text(dev_debug, width-textWidth(dev_debug), 60)
	}
	v1 = createVector(width/2+w/2,0);

    v0 = createVector(width/2+w/4, height/2+w/4);
    v2 = createVector(mouseX-(width/2+w/4), mouseY-(height/2+w/4));

 	
    let angleBetween = v1.angleBetween(v2);
 
  	player_angle = degrees(angleBetween).toFixed(1)

  	if (mouseY < height/2) {
  		player_angle = 360 - player_angle;
  	}

  	stroke("red")
  	noFill();
  	ellipse(mouseX, mouseY, 20, 20)

  	

}
