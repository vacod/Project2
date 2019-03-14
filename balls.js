/*
Project2:  a sketch that includes your own custom class. 
It utilizes an array of class instances to build a moving system of objects
that each have their own collision logic.

Author: Valerie Baker

Version (last update): 3/6/19

Description: This programm shows many moving balls with random metallic colors moving
moving from random locations at random speeds. These balls are created with rings of color 
gradients thus creating a 3D effect. Each ball is an instance from the class Ball(). This
class creates a ball at a random location and controls its movement in a defined random 
direction. The ball is programmed to bounce of the walls of the screen. A ball can be 
selected (left mouse click) and mouse dragged to another location of the screen.
*/

let balls = [];  // array of ball objects
let numberOfBalls = 20; // size of the array of ball objects

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1200, 600);
  noStroke();

  // Create the ball objects of type Ball and add them to the array balls[]
  for (let i = 0; i < numberOfBalls; i++){
    balls[i] = new Ball();
  }
}

function draw() {
	colorMode(RGB, 255);
	background(245, 154, 194);

	// Display each ball; and make it move(travel) unless it is controlled by the mouse
	for (let i = 0; i < numberOfBalls; i++){
		balls[i].display();
    if (!balls[i].stopped) { // the ball has not been stopped by a mouse-click
    	balls[i].move(); // call the method move() from the class Ball()
    } else {
    	balls[i].x = mouseX; // setup the field x of the ball object to the location of mouseX
    	balls[i].y = mouseY; // setup the field y of the ball object to the location of mouseY
    }
	}
}

// Function that defines what happens when the mouse has been pressed. 
// It checks the location X and Y of the mouse. If it conincides with the location of a 
// ball or balls it stops the ball/s, and creates a flag 'stopped' so the main draw() loop
// will know to stop its motion and set new X and Y coordinates following the mouse location.
function mousePressed() {
	for (let i = 0; i < numberOfBalls; i++){
		if ((mouseX > balls[i].x - balls[i].size/2) && (mouseX < balls[i].x + balls[i].size/2)) {
			if ((mouseY > balls[i].y - balls[i].size/2) && (mouseY < balls[i].y + balls[i].size/2)) {
				balls[i].stopped = true;
			}
		}
	}
}

// Function that defines what happens when the mouse is released. It resets the flag
// 'stopped' so the main draw loop will know to continue the ball movement.
function mouseReleased() {
	for (let i = 0; i < numberOfBalls; i++){
		balls[i].stopped = false;
	}
}

// Class Ball creates a ball and sets its display, movement and collision logic
class Ball {

	// The class constructor sets the fields
  constructor(){
  	// Random ball size and location
  	this.size = random(width/20, width/10);
    this.x = random(this.size/2, width - this.size/2);
    this.y = random(this.size/2, height - this.size/2);
    
    // Set the random numbe of rings and random red, green and blue color values
    this.rings = random(100, 1000);
    this.red = random(500);
    this.green = random(500);
    this.blue = random(500);

    // Randomize the ball traveling speed
    this.xSpeed = random(-15, 15);
    this.ySpeed = random(-15, 15);

    // By default, the ball travels - unless it has been mouse clicked
    this.stopped = false;

  }

  // Method to display the ball with its set number of rings, shades and colors
  display(){

  	colorMode(RGB, 1000); // colorMode increased to 1000
	  let shades = 500/this.rings; // number of shades is dependend on number of rings
  	let steps = this.size/this.rings; // to set the sizes for each ellipse (ring)

  	for (let i = 0; i < this.rings; i++) {
    	fill(i * shades +  this.red, i * shades + this.green, i * shades + this.blue);
    	ellipse(this.x, this.y, this.size - i*steps, this.size - i*steps);
    }
  }
  // Method to make the ball move (travel). The x and y location coordinates get 
  //increased by the set xSpeed and ySpeed fields everytime this method has been called.
  move(){

  	this.x = this.x + this.xSpeed; // the x location increases by the xSpeed
   	this.y = this.y + this.ySpeed; // The y location increases by the ySpeed

   	// Bounce check. If the ball reaches the left or right screen edge then reverse 
   	// the xSpeed
   	if ((this.x + this.size/2 >= width)||(this.x <= this.size/2)){
   		this.xSpeed = this.xSpeed * (-1); 		
   	}

   	// Bounce check. If the ball reaches the top or bottom screen edge then reverse 
   	// the ySpeed
   	if (((this.y + this.size/2) >= height) || (this.y <= this.size/2)){
   		this.ySpeed = this.ySpeed * (-1);
   	}
   
  }

}