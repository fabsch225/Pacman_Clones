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
			for(var i = 0; i < player.speed; i++) {
				player.update()
			}
			for(i = 0; i < ghosts.length; i++) {
				for(var j = 0; j < ghosts[i].speed; j++) {
					if(ghosts[i].update()) {break}
				}	
			}
			for(i = 0; i < bullets.length; i++) {
				if (bullets[i]) {
					for(var j = 0; j < bullets[i].speed; j++) {
						if(bullets[i].update()) {break}
					}	
				}
			}
			for(i = 0; i < explosions.length; i++) {
				explosions[i].update();
			}
			for(i = 0; i < fire.length; i++) {
				if(fire[i].update()) {break}
			}
		}
		else if (!gameover) {
			for(var i = 0; i < player.speed; i++) {
				player.update()
			}

			for(i = 0; i < bullets.length; i++) {
				if (bullets[i]) {
					for(var j = 0; j < bullets[i].speed; j++) {
						if(bullets[i].update()) {break}
					}	
				}
			}
			for(i = 0; i < explosions.length; i++) {
				explosions[i].update();
			}
			for(i = 0; i < fire.length; i++) {
				if(fire[i].update()) {break}
			}
		}
	//}
}
function showAll() {
	background(51);
	stroke(255);	
	strokeWeight(1);
	for (i = 0; i < grid.length; i++) { 
		grid[i].show();
	}
	for(i = 0; i < ghosts.length; i++) {
		noFill()
		ghosts[i].show()
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
	noFill()
	strokeWeight(1)
	for(i = 0; i < fire.length; i++) {
		fire[i].show()
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
		text("Dont let  the ghosts touch you", width/2-textWidth("Dont let  the ghosts touch you")/2, 450);
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
	if (ghosts[0].speed == 4 && !schutzzeit && !gameover) {
		text(player.coins + " / " + allcoins + " Coins", 10, 30);	
	}
	else if(schutzzeit && !gameover) {
		fill(255)
		text("Prepare to fight " + fr_timer, width/2-textWidth("Schutz " + fr_timer)/2, 30);
		fill(255,255,0)
	}
	if (!gameover) { 
		textSize(w);
		noStroke()
		fill(255,255,0)
		var p = map(reload, 0, weapons[player.weapon-1][0]/10, 0, textWidth(weapons[player.weapon-1][1]))
		rect(width-textWidth(weapons[player.weapon-1][1]), height-12, textWidth(weapons[player.weapon-1][1]),-textSize()-12)
		fill(255,0,255)
		rect(width-textWidth(weapons[player.weapon-1][1]), height-12, textWidth(weapons[player.weapon-1][1])-p ,-textSize()-12)
		fill(0)
		text(weapons[player.weapon-1][1],  width-textWidth(weapons[player.weapon-1][1]), height-textSize()+12);
		fill(255,255,0)
	}
	fill(255,255,0)
	strokeWeight(3);
	textSize(64);
	if (logo) {
		text("PACMAN", 0, 60);	
	}
	textSize(20)
	if (dev_mode) {
		text(dev_debug, width-textWidth(dev_debug), 60)
	}
}
