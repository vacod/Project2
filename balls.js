
let balls = [];
let numberOfBalls = 20;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1200, 600);
  noStroke();

  for (let i = 0; i < numberOfBalls; i++){
    balls[i] = new Ball();
  }
}

function draw() {
	colorMode(RGB, 255);
	background(245, 154, 194);
	
	for (let i = 0; i < numberOfBalls; i++){
		balls[i].display();
    if (!balls[i].stopped) { 
    	balls[i].move(); 
    } else {
    	balls[i].x = mouseX;
    	balls[i].y = mouseY;
    }
	}
}

function mousePressed() {
	for (let i = 0; i < numberOfBalls; i++){
		if ((mouseX > balls[i].x - balls[i].size/2) && (mouseX < balls[i].x + balls[i].size/2)) {
			if ((mouseY > balls[i].y - balls[i].size/2) && (mouseY < balls[i].y + balls[i].size/2)) {
				balls[i].stopped = true;
			}
		}
	}
}

function mouseReleased() {
	for (let i = 0; i < numberOfBalls; i++){
		balls[i].stopped = false;
	}
}


class Ball {

  constructor(){
  	this.size = random(width/20, width/10);
    this.x = random(this.size/2, width - this.size/2);
    this.y = random(this.size/2, height - this.size/2);
    
    this.rings = random(100, 1000);
    this.red = random(500);
    this.green = random(500);
    this.blue = random(500);

    this.xSpeed = random(-15, 15);
    this.ySpeed = random(-15, 15);

    this.stopped = false;

  }

  display(){
  	colorMode(RGB, 1000);
	  let shades = 500/this.rings;
  	let steps = this.size/this.rings;

  	for (let i = 0; i < this.rings; i++) {
    	fill(i * shades +  this.red, i * shades + this.green, i * shades + this.blue);
    	ellipse(this.x, this.y, this.size - i*steps, this.size - i*steps);
    }
  }

  move(){

  	this.x = this.x + this.xSpeed;
   	this.y = this.y + this.ySpeed;

   	if ((this.x + this.size/2 >= width)||(this.x <= this.size/2)){
   		this.xSpeed = this.xSpeed * (-1); 		
   	}
   	if (((this.y + this.size/2) >= height) || (this.y <= this.size/2)){
   		this.ySpeed = this.ySpeed * (-1);
   	}
   
  }

}