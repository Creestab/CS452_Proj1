var gl;
var shaderProgram;

var padLeftBufferId;
var padRightBufferId;
var padUpBufferId;
var padBottomBufferId;
var ballBufferId;

var thetaUniform;
var colorUniform;

var arrayOfKeysDown = {};

var yIncr;
var xIncr;

var ballXIncr;
var ballYIncr;

var lastPad;
var scores;
var wins;

//Paddle LEFT (Player 1)
    var pL0;
	var pL1;
	var pL2;
	var pL3;
	
	var arrayOfPointsLEFT;
//Paddle RIGHT (Player 2)
    var pR0;
	var pR1;
	var pR2;
	var pR3;
	
	var arrayOfPointsRIGHT;
//Paddle UP (Player 3)
    var pU0;
	var pU1;
	var pU2;
	var pU3;
	
	var arrayOfPointsUP;
//Paddle Bottom (Player 4)
    var pB0;
	var pB1;
	var pB2;
	var pB3;
	
	var arrayOfPointsBOTTOM;
//Paddle BALL
	var p0;
	var p1;
	var p2;
	var p3;
	
	var arrayOfPointsBALL;
	
	
/// store key codes and currently pressed ones
var keys = {};
    keys.Spacebar = 32;
    keys.Esc = 27;
    //Right Player Controls
	keys.ArrowUp = 38;
    keys.ArrowDown = 40;
	//Left Player Controls
	keys.W = 87;
	keys.S = 83;
	//Upper Player Controls
	keys.O = 79; //[
	keys.P = 80; //]
	//Bottom Player Controls
	keys.V = 86;
	keys.B = 66;

function init() {
	// set up the canvas
	var canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert( "WebGL is not available" ); }
	
	//Set up the background color
	gl.viewport(0,0,512,512);
	
	//Set up the back ground color
	gl.clearColor(0.0,0.0,0.0,1.0);
	
	//INITIALIZE LIST OF KEY PRESSES
	for(var iter = 0; iter <87; iter++){
		arrayOfKeysDown[iter] = false;
	}
	
	//last paddle touched
	lastPad = -1;
    scores = [0,0,0,0];
    wins = [0,0,0,0];
	
	//incrementing variables
	xIncr = 0.03;
	yIncr = 0.03;
	//ball movement 
	ballXIncr = 0.001;
	ballYIncr = 0.001;
	
	//ScoreBoard
	blue_score = document.getElementById("score-blue");
	blue_score.innerHTML = "Blue: " + scores[0];

	red_score = document.getElementById("score-red");
	red_score.innerHTML = "Red: " + scores[1];

	green_score = document.getElementById("score-green");
	green_score.innerHTML = "Green: " + scores[2];
	
	yellow_score = document.getElementById("score-yellow");
	yellow_score.innerHTML = "Yellow: " + scores[3];
		
	//Create shader program, needs vertex and fragment shader code 
	//in GSL to be written in HTML file 
	shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( shaderProgram );
	
	
	//Initialize the location for each of the Paddles and the ball
	setupBall();
	setupPadLeft();
	setupPadRight();
	setupPadUp();
	setupPadBottom();

    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    colorUniform = gl.getUniformLocation( shaderProgram, "shapeColor" ); // color in fragment shader

    //while(arrayOfKeysDown[keys.Spacebar] == false && arrayOfKeysDown[keys.Esc] == false){};
    //if(arrayOfKeysDown[keys.Esc] == true) {return process.exit(1);}
	
	render();
}

function setupPadLeft() {
	
	//Enter array set up code here
	pL0 = vec2 (-0.90, 0.2);
	pL1 = vec2 (-0.90, -0.2);
	pL2 = vec2 (-0.95, -0.2);
    pL3 = vec2 (-0.95, 0.2);
	
	arrayOfPointsLEFT = [pL0,pL1,pL2,pL3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padLeftBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padLeftBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsLEFT), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
	}

function setupPadRight() {
	
	//Enter array set up code here
	pR0 = vec2 (0.95, 0.2);
	pR1 = vec2 (0.95, -0.2);
	pR2 = vec2 (0.90, -0.2);
	pR3 = vec2 (0.90, 0.2);
	
	arrayOfPointsRIGHT = [pR0,pR1,pR2,pR3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padRightBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padRightBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsRIGHT), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
	
	}

function setupPadUp() {
	
	//Enter array set up code here
	pU0 = vec2 (0.2, 0.95);
	pU1 = vec2 (0.2, 0.90);
	pU2 = vec2 (-0.2,0.90);
    pU3 = vec2 (-0.2,0.95);
	
	arrayOfPointsUP = [pU0,pU1,pU2,pU3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padUpBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padUpBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsUP), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over

	
}

function setupPadBottom() {
	
	//Enter array set up code here B -> Bottom
	pB0 = vec2 (0.2, -0.90);
	pB1 = vec2 (0.2, -0.95);
	pB2 = vec2 (-0.2,-0.95);
    pB3 = vec2 (-0.2,-0.90);
	
	arrayOfPointsBOTTOM = [pB0,pB1,pB2,pB3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padBottomBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padBottomBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsBOTTOM), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
	
}

function setupBall() {
	
	//Enter array set up code here
	p0 = vec2 (.05, .05);
	p1 = vec2 (.05, -.05);
	p2 = vec2 (-.05, -.05);
	p3 = vec2 (-.05, .05);
	
	arrayOfPointsBALL = [p0,p1,p2,p3];
	
    //Vector speed of .02 in a random 360 direction
	ballXIncr = (Math.random()/25) - .02;
	if (ballXIncr < 0) {ballYIncr = Math.random() < 0.5 ? (-0.02 - ballXIncr) : (0.02 + ballXIncr);}
    else {ballYIncr = Math.random() < 0.5 ? (0.02 - ballXIncr) : (-0.02 + ballXIncr);}

	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    ballBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, ballBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsBALL), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
}

function AnimBall() {
	
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE BALL
    
    // RE-BIND THE BALL BUFFER (since the setup XXX () function binds the array buffer 
	// to padBottomBufferId, padRightBufferId, padUpBufferId, padLeftBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, ballBufferId );
    
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );

	//Hitting Left Paddle
	if(lastPad != 0 && (p3[0] < (pL0[0] + 0.03) && p3[0] > (pL0[0] - 0.07)) && (p2[1] < pL0[1] && p3[1] > pL1[1])) {
        lastPad = 0;
		if(arrayOfKeysDown[keys.W] == true) {
            ballXIncr = 0 - ballXIncr;
            ballYIncr += .005;
        }
        else if(arrayOfKeysDown[keys.S] == true) {
            ballXIncr = 0 - ballXIncr;
            ballYIncr -= .005;
        }
        else {
            ballXIncr = 0 - ballXIncr;
        }
	}

	//Hitting Right Paddle
	if(lastPad != 1 && (p0[0] > (pR3[0] - 0.03) && p0[0] < (pR3[0] + 0.07)) && (p1[1] < pR3[1] && p0[1] > pR2[1])) {
        lastPad = 1;
		if(arrayOfKeysDown[keys.ArrowUp] == true) {
            ballXIncr = 0 - ballXIncr;
            ballYIncr += .005;
        }
        else if(arrayOfKeysDown[keys.ArrowDown] == true) {
            ballXIncr = 0 - ballXIncr;
            ballYIncr -= .005;
        }
        else {
            ballXIncr = 0 - ballXIncr;
        }
	}

	//Hitting Upper Paddle
	if(lastPad != 2 && (p0[1] > (pU1[1] - 0.03) && p0[1] < (pU0[1] + 0.07)) && (p3[0] < pU1[0] && p0[0] > pU2[0])) {
        lastPad = 2;
		if(arrayOfKeysDown[keys.O] == true) {
            ballYIncr = 0 - ballYIncr;
            ballXIncr -= .005;
        }
        else if(arrayOfKeysDown[keys.P] == true) {
            ballYIncr = 0 - ballYIncr;
            ballXIncr += .005;
        }
        else {
            ballYIncr = 0 - ballYIncr;
        }
	}

	//Hitting Bottom Paddle
	if(lastPad != 3 && (p1[1] < (pB0[1] + 0.03) && p1[1] > (pB0[1] - 0.07)) && (p2[0] < pB0[0] && p1[0] > pB3[0])) {
        lastPad = 3;
		if(arrayOfKeysDown[keys.V] == true) {
            ballYIncr = 0 - ballYIncr;
            ballXIncr -= .005;
        }
        else if(arrayOfKeysDown[keys.B] == true) {
            ballYIncr = 0 - ballYIncr;
            ballXIncr += .005;
        }
        else {
            ballYIncr = 0 - ballYIncr;
        }
	}

	//change angle of movement based on where hit
	//Normal Movement
	p0[0] += ballXIncr; p0[1] += ballYIncr;
	p1[0] += ballXIncr; p1[1] += ballYIncr;
	p2[0] += ballXIncr; p2[1] += ballYIncr;
	p3[0] += ballXIncr; p3[1] += ballYIncr;
	
	arrayOfPointsBALL = [p0,p1,p2,p3];

    //Adjust player scores
    if(p2[0] < -1) {
        scores[lastPad] += 2;
        scores[0] -= 1;
        lastPad = -1;
        setupBall();
    }
    if(p0[0] > 1) {
        scores[lastPad] += 2;
        scores[1] -= 1;
        lastPad = -1;
        setupBall();
    }
    if(p3[1] > 1) {
        scores[lastPad] += 2;
        scores[2] -= 1;
        lastPad = -1;
        setupBall();
    }
    if(p1[1] < -1) {
        scores[lastPad] += 2;
        scores[3] -= 1;
        lastPad = -1;
        setupBall();
    }
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    ballBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, ballBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsBALL), gl.STATIC_DRAW );
    	
	//will need to change this to change with most recent hit
    gl.uniform4f( colorUniform, 1.0, 1.0, 1.0, 1.0 ); // send the color WHITE to the fragment shader
    	
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function AnimPadRight(){
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE Right PADDLE
    
    // RE-BIND THE LEFT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padBottomBufferId, padRightBufferId, padUpBufferId, ballBufferId, padLeftBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padRightBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );

	if(pR0[1] < 1 && arrayOfKeysDown[keys.ArrowUp] == true){
		pR0[1] += yIncr;
		pR1[1] += yIncr;
		pR2[1] += yIncr;
		pR3[1] += yIncr;
	}
	if(pR1[1] > -1 && arrayOfKeysDown[keys.ArrowDown] == true){
		pR0[1] -= yIncr;
		pR1[1] -= yIncr;
		pR2[1] -= yIncr;
		pR3[1] -= yIncr;
	}
	arrayOfPointsRIGHT = [pR0,pR1,pR2,pR3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padRightBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padRightBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsRIGHT), gl.STATIC_DRAW );
	
	gl.uniform4f( colorUniform, 1.0, 0.0, 0.0, 1.0 ); // send the color RED to the fragment shader
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
}

function AnimPadLeft() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE Left PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padBottomBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padLeftBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );
	
	if(pL0[1] < 1 && arrayOfKeysDown[keys.W] == true){ //Up
		pL0[1] += yIncr;
		pL1[1] += yIncr;
		pL2[1] += yIncr;
		pL3[1] += yIncr;	
	}
    if(pL1[1] > -1 && arrayOfKeysDown[keys.S] == true){ //Down
		pL0[1] -= yIncr;
		pL1[1] -= yIncr;
		pL2[1] -= yIncr;
		pL3[1] -= yIncr;
	}
	arrayOfPointsLEFT = [pL0,pL1,pL2,pL3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padLeftBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padLeftBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsLEFT), gl.STATIC_DRAW );
	
    gl.uniform4f( colorUniform, 0.0, 0.0, 1.0, 1.0 ); // send the color BLUE to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function AnimPadUp() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE Upper PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padBottomBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padUpBufferId );
    
   // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );

	if(pU0[0] < 1 && arrayOfKeysDown[keys.O] == true){//Left
		pU0[0] -= xIncr;
		pU1[0] -= xIncr;
		pU2[0] -= xIncr;
		pU3[0] -= xIncr;
    }
    if(pU3[0] > -1 && arrayOfKeysDown[keys.P] == true){//Right
		pU0[0] += xIncr;
		pU1[0] += xIncr;
		pU2[0] += xIncr;
		pU3[0] += xIncr;
	}
	arrayOfPointsUP = [pU0,pU1,pU2,pU3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padUpBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padUpBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsUP), gl.STATIC_DRAW );
    
    gl.uniform4f( colorUniform, 0.0, 1.0, 0.0, 1.0 ); // send the color GREEN to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function AnimPadBottom() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE Bottom PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padBottomBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padBottomBufferId );
    
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );

	if(pB0[0] < 1 && arrayOfKeysDown[keys.V] == true){//Left
		pB0[0] -= xIncr;
		pB1[0] -= xIncr;
		pB2[0] -= xIncr;
		pB3[0] -= xIncr;
        }
    if(pB3[0] > -1 && arrayOfKeysDown[keys.B] == true){//Right
		pB0[0] += xIncr;
		pB1[0] += xIncr;
		pB2[0] += xIncr;
		pB3[0] += xIncr;
	}
	arrayOfPointsBottom = [pB0,pB1,pB2,pB3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padBottomBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padBottomBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsBottom), gl.STATIC_DRAW );
    
    gl.uniform4f( colorUniform, 1.0, 1.0, 0.0, 1.0 ); // send the color YELLOW to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

/*

	*/

function moveKeys(event) {
	var theKeyCode = event.keyCode;
	if ( theKeyCode == keys.ArrowUp )
	{
		arrayOfKeysDown[keys.ArrowUp] = !(arrayOfKeysDown[keys.ArrowUp]);
		//console.log("work");
	}
	if ( theKeyCode == keys.ArrowDown )
	{
		arrayOfKeysDown[keys.ArrowDown] = !(arrayOfKeysDown[keys.ArrowDown]); 
	}
	if ( theKeyCode == keys.W )
	{
		arrayOfKeysDown[keys.W] = !(arrayOfKeysDown[keys.W]);
	}
	if ( theKeyCode == keys.S )
	{
		arrayOfKeysDown[keys.S] = !(arrayOfKeysDown[keys.S]);
	}
	if ( theKeyCode == keys.O )
	{
		arrayOfKeysDown[keys.O] = ! (arrayOfKeysDown[keys.O]);
	}
	if ( theKeyCode == keys.P )
	{
		arrayOfKeysDown[keys.P] = !(arrayOfKeysDown[keys.P]);
	}
	if ( theKeyCode == keys.V )
	{
		arrayOfKeysDown[keys.V] = !(arrayOfKeysDown[keys.V]);
	}
	if ( theKeyCode == keys.B )
	{
		arrayOfKeysDown[keys.B] = !(arrayOfKeysDown[keys.B]);
	}
}

function render(){
	
	// Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    colorUniform = gl.getUniformLocation( shaderProgram, "shapeColor" ); // color in fragment shader
    
	AnimPadLeft();
	AnimPadBottom()
	AnimPadRight();
	AnimPadUp();
	AnimBall();

    for(i = 0; i < 4; i++) {
        if(scores[i] > 4) {
            //while(arrayOfKeysDown[keys.Spacebar] == false && arrayOfKeysDown[keys.Esc] == false){};
            if(arrayOfKeysDown[keys.Esc] == true) {return process.exit(1);}
            wins[i] += 1;
            scores = [0,0,0,0];
            	
            //Initialize the location for each of the Paddles and the ball
	        setupBall();
	        setupPadLeft();
	        setupPadRight();
	        setupPadUp();
	        setupPadBottom();
        }
    }

    blue_score.innerHTML = "Blue: " + scores[0];
	red_score.innerHTML = "Red: " + scores[1];
	green_score.innerHTML = "Green: " + scores[2];
	yellow_score.innerHTML = "Yellow: " + scores[3];
    
	requestAnimFrame( render );
}