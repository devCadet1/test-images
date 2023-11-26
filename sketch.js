let player;
let platforms = [];
let gravity = 0.6;
let backgroundImage;
let playerImage;
let tileImage;
let debugMode = false;
// let cameraX = 0
// let smoothness = 0.1

let zoomLevel = 1.0

function preload() {
    // backgroundImage = loadImage('https://test-devcadet.s3.ap-south-1.amazonaws.com/assets/BG1.png')
    // playerImage = loadImage('https://test-devcadet.s3.ap-south-1.amazonaws.com/assets/Bird.png')
    // tileImage = loadImage('https://test-devcadet.s3.ap-south-1.amazonaws.com/assets/Tile2.png')
    backgroundImage = loadImage('./assets/BG1.png')
    playerImage = loadImage('./assets/Bird.png')
    tileImage = loadImage('./assets/Tile2.png')
    
}

function setup() {
  // createCanvas(window.innerWidth , window.innerHeight);
      createCanvas(1920, 1080)
//   loadImage('./GMonks/Sprites/Tile2.png' , img => {
//     image(img , 0 , 0)
//   })
  player = new Player();
  platforms.push(new Platform(-500, height /2 + 250, width + 2000 + 2000, 200));
  platforms.push(new Platform(800, height / 2 - 350, 300, 200));
  platforms.push(new Platform(1650, height / 2 - 250, 350, 200));
}

function draw() {
    image(backgroundImage , 0 , 0 , width , height);

  // Update and display player
  player.update();
  player.display();

  scale(zoomLevel)

//   let targetCameraX = player.position.x - width /2;
//   translate(-cameraOffsetX , 0)

  // Update and display platforms
  for (let platform of platforms) {
    platform.display();
  }

  // Check for collisions between player and platforms
  for (let platform of platforms) {
    player.checkCollision(platform);
  }

  // Apply gravity to the player
  player.applyGravity();

  camera.x = player.x
}

if(debugMode) {
    !drawDebug 
}

function keyPressed() {
//   if (key === '' || player.isOnGround) {
//     player.jump();
//   }
  if (key === 'D' || key === 'd') {
    drawDebug()
  }
  else if(key === 'Z' || key === 'z') {
    zoomLevel = (zoomLevel === 1.0) ? 0.5 : 1.0
  }
}

class Player {
  constructor() {
    // image("./GMonks/Sprites/bird.png");
    this.width = 100;
    this.height = 100;
    this.position = createVector(0, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(10, 1);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration
  }

  display() {
    image(playerImage , this.position.x , this.position.y  , this.width , this.height)
  }

  applyGravity() {
    this.acceleration.y = gravity;
  }

  jump() {
    this.velocity.y = -5;
  }

  checkCollision(platform) {
    // Check if player is above the platform and vertically overlapping
    if (
      this.position.y < platform.y &&
      this.position.y + this.height > platform.y &&
      this.position.x + this.width > platform.x - platform.width / 2 &&
      this.position.x < platform.x + platform.width / 2
    ) {
      this.position.y = platform.y - this.height; // Snap to the top of the platform
      this.velocity.y = 0;
    }

    // Check if player is colliding with the sides of the platform
    if (
      this.position.x + this.width > platform.x - platform.width / 2 &&
      this.position.x < platform.x + platform.width / 2 &&
      this.position.y + this.height > platform.y &&
      this.position.y < platform.y + platform.height
    ) {
      this.velocity.x = 0;
    }
  }

  isOnGround() {
    return this.position.y === height - this.height;s
  
  }
}

class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  display() {
    image(tileImage, this.x , this.y, this.width, this.height)
    // rectMode(CENTER);
    // rect(this.x, this.y, this.width, this.height);
  }
}

function drawDebug() {
    // Draw additional debug information here
    console.log("debugger is triggered")
    fill(255, 0, 0);
    text('Debug Mode Enabled', 10, 20);
    
    // Example: Draw outlines around player and platforms
    stroke(255, 0, 0);
    noFill();
    rect(player.position.x, player.position.y, player.width, player.height);
  
    for (let platform of platforms) {
      rect(platform.x - platform.width / 2, platform.y - platform.height / 2, platform.width, platform.height);
    }

   
  }
