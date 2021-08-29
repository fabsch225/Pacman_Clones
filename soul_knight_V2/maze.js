function generate() {
	var n = 0;
	var boss = false
	grids[room].boss = false;
	
	if (room_data[rooms.indexOf(room)].boss) {
		lib *= 4.4;
	}

	for (k = 0;k < lib; k++) {
		current.visited = true;

		var next = current.checkNeighbors();

		if (next) {

			next.visited = true;

			stack.push(current);

			removeWalls(current, next);

			current = next;

			if(k == 12 && !current.coin) {
				current.heal = true;
			}
			if (Math.floor(Math.random()*480) == 66 && !room_data[rooms.indexOf(room)].boss) {
				current.crate = true;
				current.crate_l = Math.floor(Math.random()*(weapons.length-1))+1;
			}
			if (Math.floor(Math.random()*480) == 66 && !room_data[rooms.indexOf(room)].boss) {
				current.crate = true;
				current.crate_l = Math.floor(Math.random()*(swords.length-1))+ 1 + "k";
			}
			allcoins = coins;
		
				
			if(k/Math.round(lib/ghost_a) == Math.round(k/Math.round(lib/ghost_a))) {
				current.spawn = true;
				n++
			}
		}
		
		else if (stack.length > 0){
			var cell = stack[Math.floor(Math.random()*stack.length)]
			//stack = stack.pop();

			current = cell;
		}	
		else {
			return
		}
	}
	if (room_data[rooms.indexOf(room)].boss) {
		lib /= 4.4;
	}
	for (o=0; o < grids[room].length; o++) {
		if (grids[room][o].visited) {
			if (grids[room][o+1] && grids[room][o+1].visited && o % cols != cols - 1) {
				grids[room][o].walls[1] = false;
			}
			if (grids[room][o-1] && grids[room][o-1].visited && o % cols != 0) {
				grids[room][o].walls[3] = false;
			}
			if (grids[room][o+cols] && grids[room][o+cols].visited) {
				grids[room][o].walls[2] = false;
			}
			if (grids[room][o-cols] && grids[room][o-cols].visited) {
				grids[room][o].walls[0] = false;
			}
		}
	}
	if (grids[room][5]) {
		let fin = false;
		let li = 0;
		if (room % room_cols != 0 && rooms.includes(room-1)) {
			grids[room][Math.floor(rows/2)*cols+li].portal = true;
			grids[room][Math.floor(rows/2)*cols+li].pos = 3;
			while (!fin && li < cols) {
				
				if (!grids[room][Math.floor(rows/2)*cols+li].visited) {
					grids[room][Math.floor(rows/2)*cols+li].walls[1] = false;
				    grids[room][Math.floor(rows/2)*cols+li].walls[3] = false;
					grids[room][Math.floor(rows/2)*cols+li].visited = true
					li++
				}
				else {
					grids[room][Math.floor(rows/2)*cols+li].walls[3] = false;
					fin = true;
					break
				}
			}
		//	grids[room][Math.floor(rows/2)*cols].walls[3] = true;
			if (li == cols) {
				grids[room][Math.floor(rows/2)*cols+(-1)].walls[1] = true;
			}
		}
		fin = false;
		li = cols - 1;
		
		if ((room+1) % room_cols != 0 && rooms.includes(room+1)) {
			grids[room][Math.floor(rows/2)*cols+li].portal = true;
			grids[room][Math.floor(rows/2)*cols+li].pos = 4;
			while (!fin && li > 0) {
				if (!grids[room][Math.floor(rows/2)*cols+li].visited) {
					grids[room][Math.floor(rows/2)*cols+li].walls[1] = false;
				    grids[room][Math.floor(rows/2)*cols+li].walls[3] = false;
					grids[room][Math.floor(rows/2)*cols+li].visited = true
					li--
				}
				else {
					grids[room][Math.floor(rows/2)*cols+li].walls[1] = false;
					fin = true;
					break
				}
			}
		//	grids[room][Math.floor(rows/2)*cols+(cols-1)].walls[1] = true;
			if (li == cols) {
				grids[room][Math.floor(rows/2)*cols+(li-1)].walls[3] = true;
			}
		}
		fin = false;
		li = 0;
		if (room >= room_cols && rooms.includes(room-room_cols)) {
			grids[room][Math.floor(cols/2)+li*cols].portal = true;
			grids[room][Math.floor(cols/2)+li*cols].pos = 1;

			while (!fin && li < rows) {
				if (!grids[room][Math.floor(cols/2)+li*cols].visited) {
					grids[room][Math.floor(cols/2)+li*cols].walls[0] = false;
				    grids[room][Math.floor(cols/2)+li*cols].walls[2] = false;
					grids[room][Math.floor(cols/2)+li*cols].visited = true
					li++
				}
				else {
					grids[room][Math.floor(cols/2)+li*cols].walls[0] = false;
					fin = true;
					break
				}
			}
		//	grids[room][Math.floor(cols/2)].walls[0] = true;
			if (li == rows) {
				grids[room][Math.floor(cols/2)+(li-1)*cols].walls[2] = true;
			}
		}
		fin = false;
		li = rows-1;
		if (room < room_a - room_cols && rooms.includes(room+room_cols)) {
			grids[room][Math.floor(cols/2)+li*cols].portal = true;
			grids[room][Math.floor(cols/2)+li*cols].pos = 2;
			while (!fin && li > 0) {
				
				if (!grids[room][Math.floor(cols/2)+li*cols].visited) {
					grids[room][Math.floor(cols/2)+li*cols].walls[0] = false;
				    grids[room][Math.floor(cols/2)+li*cols].walls[2] = false;
					grids[room][Math.floor(cols/2)+li*cols].visited = true
					li--
				}
				else {
					grids[room][Math.floor(cols/2)+li*cols].walls[2] = false;
					fin = true;
					break
				}
			}
		//	grids[room][Math.floor(cols/2)+(rows-1)*cols].walls[2] = true;
			if (li == rows) {
				grids[room][Math.floor(cols/2)+(li+1)*cols].walls[0] = true;
			}
		}
	}
}
function check(d,i,j, B) {
	var x = i / w;
	var y = j / w;

	var nx1, ny1, nx2, ny2;
	var res = [];
	if (!B) {
		if (d == 1) {nx1 = Math.ceil(x);nx2 = Math.ceil(x);ny1 = Math.ceil(y);ny2 = Math.floor(y);}
		if (d == 2) {nx1 = Math.floor(x);nx2 = Math.floor(x);ny1 = Math.ceil(y);ny2 = Math.floor(y);}
		if (d == 3) {nx1 = Math.ceil(x);nx2 = Math.floor(x);ny1 = Math.ceil(y);ny2 = Math.ceil(y);}	
		if (d == 4) {nx1 = Math.ceil(x);nx2 = Math.floor(x);ny1 = Math.floor(y);ny2 = Math.floor(y);}

		if (ny1 == y) {
			if (d == 3) {
				ny1++
				ny2++	
			}
			if (d == 4) {
				ny1--
				ny2--
			}
		}
	}
	else {
		nx1 = Math.floor(x);

		if (d == 1) {nx1++;}
		if (d == 2) {nx1--;}
		nx2 = nx1

		ny1 = Math.floor(y);
		ny2 = ny1;
	}
	if (grids[room][index(nx1,ny1)]) {
		res.push(grids[room][index(nx1,ny1)].walls)
	}
	else {
		res.push([true,true,true,true,"error"])
	}
	if (grids[room][index(nx2,ny2)]) {
		res.push(grids[room][index(nx2,ny2)].walls)
	}
	else {
		res.push([true,true,true,true,"error"])
	}

	var h = true;	

	var xr = Math.round(x)
	var yr = Math.round(y)

	if (x == xr && y != yr) {
		if (d == 1 && grids[room][index(nx2,ny2)-1] && grids[room][index(nx2,ny2)-1].walls[2]){h=false;}
		if (d == 2 && grids[room][index(nx2,ny2)+1] && grids[room][index(nx2,ny2)+1].walls[2]){h=false;}
	}

	if (y == yr && x != xr && grids[room][index(nx1,ny1)]) {
		if (d == 3 && grids[room][index(nx1,ny1)].walls[3]){h=false;}
		if (d == 4 && grids[room][index(nx1,ny1)].walls[3]){h=false;}
	}

	res.push(h);
	
	return res
}


function index(i,j) {
	if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
		return -1;
	}

	return i + j * cols; 
}


function removeWalls(a,b) {
	var x = a.i - b.i;
	var y = a.j - b.j;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}	
	else if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

function cell(i_,j_) {
	this.i = i_;
	this.j = j_;

	this.x = i_ * w;
	this.y = j_ * w;
	this.spawn = false;

	this.walls = [true,true,true,true]
	this.visited = false;
	this.coin = false;	
	this.freeze = false;

	this.portal = false;
	this.pos = 0;

	this.crate = false;
	this.crate_l = 0;
}
cell.prototype.checkNeighbors = function(t,r,b,l) {
	
	var neighbors = [];

	var ws = [];

	var top = grids[room][index(this.i, this.j-1)]
	var right = grids[room][index(this.i+1, this.j)]
	var bottom = grids[room][index(this.i, this.j+1)]
	var left = grids[room][index(this.i-1, this.j)]

	if (top && top.i < cols-3 && top.i > 3 && top.j < rows-3 && top.j > 3) {
		neighbors.push(top)
	}
	if (right && right.i < cols-3 && right.i > 3 && right.j < rows-3 && right.j > 3) {
		neighbors.push(right)
	}
	if (bottom && bottom.i < cols-3 && bottom.i > 3 && bottom.j < rows-3 && bottom.j > 3) {
		neighbors.push(bottom)
	}
	if (left && left.i < cols-3 && left.i > 3 && left.j < rows-3 && left.j > 3) {
		neighbors.push(left)
	}
	
	if (neighbors.length > 0) {	
		var r = floor(random(0,neighbors.length))
		return neighbors[r]
	}
	else {
		return undefined;
	}
}

cell.prototype.show = function(a,b) {
	var x = (width/2-player.x)+this.x+a//this.x;
	var y = (height/2-player.y)+this.y+b//this.y;
	if (x > -w && x < width+w && y > -w && y < height+w) {
		var walls = this.walls;
		
		if (this.visited) {
			
			if (walls[0]) { line(x, y, x + w, y);}

			if (walls[1]) {line(x + w, y, x + w, y + w);}

			if (walls[2]) {line(x + w, y + w, x, y + w);}

			if (walls[3]) {line(   x, y + w, x, y);}

		}
		if (this.coin) {
			
			fill(255,255,0)
			strokeWeight(1)
			circle(x+w/2,y+w/2,coinWidth)
			
		}		
		else if (this.freeze) {
			stroke(0);
			fill(0,0,255)
			strokeWeight(1)
			circle(x+w/2,y+w/2,coinWidth)
		}
		else if (this.heal) {
			stroke(255);
			fill("red")
			strokeWeight(1)
			circle(x+w/2,y+w/2,coinWidth)
			fill(255)
			line(x+w/2-1, (y+w/2)+coinWidth, x+w/2-1, (y+w/2)-coinWidth)
			line(x+w/2, (y+w/2)+coinWidth, x+w/2, (y+w/2)-coinWidth)
			line((x+w/2)+coinWidth, y+w/2, (x+w/2)-coinWidth, y+w/2)
			line((x+w/2)+coinWidth, y+w/2-1, (x+w/2)-coinWidth, y+w/2-1)
			strokeWeight(1)
		}
		else if (this.crate) {
			textSize(7)
			
			if (String(this.crate_l).includes("k")) {
				text(swords[parseInt(this.crate_l)][1], x, y+w/2, w, w)
			}
			else {
				text(weapons[this.crate_l-1][1], x, y+w/2, w, w)
			}
		}
		else if (this.portal) {
			if (ghosts_ch[room].length != 0) {
				line(x, y, x + w, y)
				line(x + w, y, x + w, y + w)
				line(x + w, y + w, x, y + w)
				line(   x, y + w, x, y)
			}
		}
	}
}