var dev_mode = true;
var dev_debug = "dev_mode: enabled";
var lastCalledTime, fps;

var lib;

var gameover = true;
var message = "Welcome to Pacman"
var timer = true;

var cols, rows;
var w = 50;
var logo = false;

var grid = [];
var current;
var stack = [];
var finished = false;
var coinWidth = 11;
var cop = 0.2;
var ghost_a =8

var player;
var shootPossible;
var reload = 0;

var room = 4;
var grids = []
var room_cols = 5;
var room_rows = 5;
var room_a = room_cols * room_rows
var rooms = [2,6,7,8,10,12,16,15,17,18,19,20,23]
var boss_rooms = [10,20,23,19]
var room_data = []
var max_waves =3;
for (i=0;i<rooms.length;i++) {
	if (boss_rooms.includes(rooms[i])) {
		room_data.push({boss: true, visited: false,wave: max_waves})	
	}
	else {
		room_data.push({boss: false, visited: false,wave: 1})
	}
}


var bosses = [];


var ghosts_ch = []
for (i = 0; i <= room_a; i++) {
	ghosts_ch.push([])
}

var difficulty = 10;

var coins = 0;
var allcoins = 0;
var fr_timer = 7;
var schutzzeit = true;

var draw_fps = 30
var background_fps = 30


var bullets = [];

var explosions = [];

var fire = [];

var knifes = [];

var messages = [];