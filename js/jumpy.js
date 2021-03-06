var		HERO_IMAGE = 'assets/hero.png',
		PLATFORM_IMAGE = 'assets/platform.png';
var imgRobotRun = new Image();
var score;

function _game()
{
	window.Game = this;
	var self = this,
		ticks = 0,
		canvas,
		ctx,
		stage,
		world,
		hero,
		w = getWidth(),
		h = getHeight(),
		assets = [],
		keyDown = false;
	score = 0;

	// holds all collideable objects
	var collideables = [];
	self.getCollideables = function() { return collideables; };

	// starts to load all the assets
	self.preloadResources = function() {
		self.loadImage();
	}

	var requestedAssets = 0,
		loadedAssets = 0;
	// loads the assets and keeps track 
	// of how many assets where there to
	// be loaded
	self.loadImage = function() {
		var img = new Image();
		img.onload = self.onLoadedAsset;
		img.src = HERO_IMAGE;
		//imgRobotRun.onload = self.onLoadedAsset;
		//imgRobotRun.src = 'daxbotsheet_0.png'
		
		var img2 = new Image();
		img2.onload = self.onLoadedAsset;
		img2.src = PLATFORM_IMAGE;

		assets[HERO_IMAGE] = img;
		assets[PLATFORM_IMAGE] = img2;

		requestedAssets = 2;
	}
	// each time an asset is loaded
	// check if all assets are complete
	// and initialize the game, if so
	self.onLoadedAsset = function(e) {
		++loadedAssets;
		if ( loadedAssets == requestedAssets ) {	
			self.initializeGame();  
		}
	}

	self.initializeGame = function() {
		// creating the canvas-element
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		canvas.width = w;
		canvas.height = h;
		document.body.appendChild(canvas);

		// initializing the stage
		stage = new Stage(canvas);
		world = new Container();
		stage.addChild(world);
		
		circle = new Shape();
		circle.graphics.beginFill("red").drawCircle(100, 100, 40);
		stage.addChild(circle);
		stage.update();
		
		// Check for click listener
		circle.onClick = function(evt) { Ticker.setPaused(false); }
		
		Ticker.setPaused(true);
		
		score = new Text(0, '20px Arial', '#A3FF24');
		score.x = 50;
		score.y = 20;
		stage.addChild(score);
		
		// SpriteSheet Loading
		//var spriteSheet = new createjs.SpriteSheet({
			// Image to Use
			//images: [imgRobotRun],
			//frames: {width: 64, height: 68, regX: 32, regY: 34},
			//animations: {
				//walk: [0, 3, "walk"]
			//}
		//});

		// creating the Hero, and assign an image
		// also position the hero in the middle of the screen
		hero = new Hero(assets[HERO_IMAGE]);

		self.reset();

		// Setting the listeners
		if ('ontouchstart' in document.documentElement) {
			canvas.addEventListener('touchstart', function(e) {
				self.handleKeyDown();
			}, false);

			canvas.addEventListener('touchend', function(e) {
				self.handleKeyUp();
			}, false);
		} else {
			document.onkeydown = self.handleKeyDown;
			document.onkeyup = self.handleKeyUp;
			document.onmousedown = self.handleKeyDown;
			document.onmouseup = self.handleKeyUp;
		}
		
		Ticker.setFPS(30);
		Ticker.addListener(self.tick, self);
	}
	self.reset = function()
	{
		collideables = [];
		self.lastPlatform = null;
		world.removeAllChildren();
		world.x = world.y = 0;

		hero.x = 50;
		hero.y = h/2 + 50;
		hero.reset();
		ticks = 0;
		score.text = 0;
		world.addChild(hero);

		// add a platform for the hero to collide with
		self.addPlatform(50 - assets[PLATFORM_IMAGE].width/2, h/1.25);

		var c, l = w / assets[PLATFORM_IMAGE].width * 1.5, atX=0, atY = h/1.25;

		for ( c = 1; c < l; c++ ) {
			var atX = (c-.5) * assets[PLATFORM_IMAGE].width*2 + (Math.random()*assets[PLATFORM_IMAGE].width-assets[PLATFORM_IMAGE].width/2);
			var atY = atY + Math.random() * 300 - 150;
			self.addPlatform(atX,atY);
		}
	}

	self.tick = function(e)
	{
		ticks++;
		score.text = ticks;
		hero.tick();

		if ( hero.y > h*3 ) {
			ticks--;
			score.text = ticks;
			alert('Games! Score is ' + score.text);
			self.reset();
		}
		// if the hero "leaves" it's bounds of
		// screenWidth * 0.3 and screenHeight * 0.3(to both ends)
		// we will reposition the "world-container", so our hero
		// is allways visible
		if ( hero.x > w*.3 ) {
			world.x = -hero.x + w*.3;
		}
		if ( hero.y > h*.7 ) {
			world.y = -hero.y + h*.7;
		} else if ( hero.y < h*.3 ) {
			world.y = -hero.y + h*.3;
		}

		for ( var c = 0; c < collideables.length; c++ ) {
			var p = collideables[c];
			if ( p.localToGlobal(p.image.width,0).x < -10 ) {
				self.movePlatformToEnd(p);
			}
		}

		stage.update();
		
	}
	
	// this method adds a platform at the
	// given x- and y-coordinates and adds
	// it to the collideables-array
	self.lastPlatform = null;
	self.addPlatform = function(x,y) {
		x = Math.round(x);
		y = Math.round(y);

		var platform = new Bitmap(assets[PLATFORM_IMAGE]);
		platform.x = x;
		platform.y = y;
		platform.snapToPixel = true;

		world.addChild(platform);
		collideables.push(platform);
		self.lastPlatform = platform;
	}
	self.movePlatformToEnd = function(platform) {
		platform.x = self.lastPlatform.x + platform.image.width*2 + Math.random()*platform.image.width*2 - platform.image.width;
		platform.y = self.lastPlatform.y + Math.random() * 300 - 150;
		self.lastPlatform = platform;
	}

	self.handleKeyDown = function(e)
	{
		if ( !keyDown ) {
			keyDown = true;
			hero.jump();
		}
	}

	self.handleKeyUp = function(e)
	{
		keyDown = false;
	}

	self.preloadResources();
};

new _game();