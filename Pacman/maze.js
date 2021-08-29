function generate() {
	var n = 0;

	background(51);

	for (var k = 0;k < lib; k++) {
		current.visited = true;

		var next = current.checkNeighbors();
		if (next) {

			next.visited = true;

			stack.push(current);

			removeWalls(current, next);

			current = next;

			if(k/101 == Math.round(k/100) && !current.coin) {
				//current.coin = true;
				//coins++;
			}	
			if(k == 666 && !current.coin) {
				current.heal = true;
			}


			allcoins = coins;
			if(k/Math.round(lib/ghost_a) == Math.round(k/Math.round(lib/ghost_a)) && k != 0 && current.visited) {
				ghosts[n] = new ghost(grid.indexOf(current) % cols,Math.floor(grid.indexOf(current) / cols),Math.floor(Math.random()*5)+1);
				console.log(ghosts[n].speed)
				n++
			}
		}
		else if (stack.length > 0){
			var cell = stack[Math.floor(Math.random()*stack.length)]
			//stack = stack.pop();

			current = cell;
		}	
	}
	for (i=0; i < grid.length; i++) {
		if (grid[i].visited) {
			if (grid[i+1] && grid[i+1].visited && i % cols != cols - 1) {
				grid[i].walls[1] = false;
			}
			if (grid[i-1] && grid[i-1].visited && i % cols != 0) {
				grid[i].walls[3] = false;
			}
			if (grid[i+cols] && grid[i+cols].visited) {
				grid[i].walls[2] = false;
			}
			if (grid[i-cols] && grid[i-cols].visited) {
				grid[i].walls[0] = false;
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
	if (grid[index(nx1,ny1)]) {
		res.push(grid[index(nx1,ny1)].walls)
	}
	else {
		res.push([true,true,true,true,"error"])
	}
	if (grid[index(nx2,ny2)]) {
		res.push(grid[index(nx2,ny2)].walls)
	}
	else {
		res.push([true,true,true,true,"error"])
	}

	var h = true;	

	var xr = Math.round(x)
	var yr = Math.round(y)

	if (x == xr && y != yr) {
		if (d == 1 && grid[index(nx2,ny2)-1] && grid[index(nx2,ny2)-1].walls[2]){h=false;}
		if (d == 2 && grid[index(nx2,ny2)+1] && grid[index(nx2,ny2)+1].walls[2]){h=false;}
	}

	if (y == yr && x != xr && grid[index(nx1,ny1)]) {
		if (d == 3 && grid[index(nx1,ny1)].walls[3]){h=false;}
		if (d == 4 && grid[index(nx1,ny1)].walls[3]){h=false;}
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


	this.walls = [true,true,true,true]
	this.visited = false;
	this.coin = false;	
	this.freeze = false;

	this.checkNeighbors = function(t,r,b,l) {
		
		var neighbors = [];

		var ws = [];

		var top = grid[index(this.i, this.j-1)]
		var right = grid[index(this.i+1, this.j)]
		var bottom = grid[index(this.i, this.j+1)]
		var left = grid[index(this.i-1, this.j)]

		if (top) {
			neighbors.push(top)
		}
		if (right) {
			neighbors.push(right)
		}
		if (bottom) {
			neighbors.push(bottom)
		}
		if (left) {
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

	this.show = function() {
		var x = this.x;
		var y = this.y;
	
		var walls = this.walls;
		
		if (this.visited) {
			
			if (walls[0]) { line(x, y, x + w, y);}

			if (walls[1]) {line(x + w, y, x + w, y + w);}

			if (walls[2]) {line(x + w, y + w, x, y + w);}

			if (walls[3]) {line(   x, y + w, x, y);}

		}
		if (this.coin) {
			stroke(0);
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
	}
}
