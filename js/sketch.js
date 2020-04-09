class Point {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

var m = 1, b = 0;
var points = [];

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(70);

  	for (var i = 0; i < points.length; i++) {
  		fill(200);
  		noStroke();
  		var x = map(points[i].x, 0, 1, 0, width);
  		var y = map(points[i].y, 0, 1, 0, height);
  		ellipse(x, y, 6, 6);
  	}

  	if (points.length > 1) {
  		linearRegression();
  		drawLine();
  	}
}

function linearRegression() {
	var learningRate = 0.002;

	for (var i = 0; i < points.length; i++) {
  		var x = points[i].x;
  		var y = points[i].y;

  		// We will make a guess
  		// guess is calculated by m * x + b
  		// Error is calculated by (guess - y)^2 OR you can say (m * x + b - y)^2
  		// derivative of error function w.r.t m is (2 * x) * ((x * m) + b - y)

  		// finding the slope of error function at m
  		var slope = (2 * x) * ((x * m) + b - y);
      // we need to move in the opposite direction to gradient ('steepest ascent') so,
  		slope = slope * -1;
  		m = m + (slope * learningRate);

  		// derivative of error function w.r.t b is 2 * (b - y + (m * x))
  		// finding the slope of error function at b
  		slope = 2 * (b - y + (m * x));
      // we need to move in the opposite direction to gradient ('steepest ascent') so,
  		slope = slope * -1;
  		b = b + (slope * learningRate);
  	}
}

function drawLine() {
	var x1 = 0;
	var y1 = m * x1 + b;
	var x2 = 1;
	var y2 = m * x2 + b;

	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, 0, height);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, 0, height);

	stroke(39, 173, 23);
	line(x1, y1, x2, y2);
}


function mouseClicked() {
	var p = new Point(mouseX, mouseY);
	p.x = map(p.x, 0, width, 0, 1);
	p.y = map(p.y, 0, height, 0, 1);
	points.push(p);
}