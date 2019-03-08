var gl;
var shaderProgram;

var padLeftBufferId;
var padRightBufferId;
var padUpBufferId;
var padLowBufferId;
var ballBufferId;

var thetaUniform;
var colorUniform;

/// store key codes and currently pressed ones
var keys = {};
    //Right Player Controls
	keys.ArrowUp = 38;
    keys.ArrowDown = 40;
	//Left Player Controls
	keys.W = 87;
	keys.S = 83;
	//Upper Player Controls
	keys.RightBracket = 219; //[
	keys.LeftBracket = 221; //]
	//Low Player Controls
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
		
	//Create shader program, needs vertex and fragment shader code 
	//in GSL to be written in HTML file 
	shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( shaderProgram );
	
	
	//Initialize the location for each of the Paddles and the ball
	setupPadLeft();
	setupPadRight();
	setupPadUp();
	setupPadLow();
	setupBall();
	
	render();
}

function setupPadLeft() {
	
	//Enter array set up code here
	var p0 = vec2 (-0.95, 0.0);
	var p1 = vec2 (-0.95, -0.4);
	var p2 = vec2 (-0.90, -0.4);
	var p3 = vec2 (-0.90, 0.0);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padLeftBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padLeftBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
	}

function setupPadRight() {
	
	//Enter array set up code here
	var p0 = vec2 (0.95, 0.0);
	var p1 = vec2 (0.95, -0.4);
	var p2 = vec2 (0.90, -0.4);
	var p3 = vec2 (0.90, 0.0);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padRightBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padRightBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over

	}

function setupPadUp() {
	
	//Enter array set up code here
	var p0 = vec2 (0.0, 0.95);
	var p1 = vec2 (-0.4, 0.95);
	var p2 = vec2 (-0.4, 0.90);
	var p3 = vec2 (0.0, 0.90);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padUpBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padUpBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over

	
}

function setupPadLow() {
	
	//Enter array set up code here
	var p0 = vec2 (0.0, -0.95);
	var p1 = vec2 (-0.4, -0.95);
	var p2 = vec2 (-0.4, -0.90);
	var p3 = vec2 (0.0, -0.90);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    padLowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, padLowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
	
}

function setupBall() {
	
	//Enter array set up code here
	var p0 = vec2 (.05, .05);
	var p1 = vec2 (.05, -.05);
	var p2 = vec2 (-.05, -.05);
	var p3 = vec2 (-.05, .05);
	
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	// Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    ballBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, ballBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // While the pointer to iterate over the array of points used to be in the setup, 
	// it is now moved over to the render functionto ensure that the pad buffers and 
	// the ball buffer can be iterated over
}

function AnimPadLeft(){
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE LEFT PADDLE
    
    // RE-BIND THE LEFT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padLowBufferId, padRightBufferId, padUpBufferId, ballBufferId, padLeftBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padLeftBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );

	
	
    gl.uniform4f( colorUniform, 1.0, 0.0, 0.0, 1.0 ); // send the color RED to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
}

function AnimPadRight() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE RIGHT PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padLowBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padRightBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );
	
    gl.uniform4f( colorUniform, 0.0, 1.0, 0.0, 1.0 ); // send the color GREED to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function AnimPadUp() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE RIGHT PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padLowBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padUpBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );

    
    gl.uniform4f( colorUniform, 0.0, 0.0, 1.0, 1.0 ); // send the color BLUE to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function AnimPadLow() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE RIGHT PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padLowBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, padLowBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );
	
    
    gl.uniform4f( colorUniform, 1.0, 1.0, 0.0, 1.0 ); // send the color YELLOW to the fragment shader
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function AnimPadBall() {
	// FOLLOWING LINES ADDRESS THE RENDERING OF THE RIGHT PADDLE
    
    // RE-BIND THE RIGHT PAD BUFFER (since the setup XXX () function binds the array buffer 
	// to padLowBufferId, padRightBufferId, padUpBufferId, ballBufferId
    gl.bindBuffer( gl.ARRAY_BUFFER, ballBufferId );
    
    // The pointer to iterate over the array of points for the square moves here
    var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );
    
	
	//will need to change this to change with most recent hit
    gl.uniform4f( colorUniform, 1.0, 1.0, 1.0, 1.0 ); // send the color WHITE to the fragment shader
    
	
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}


function render(){
	
	// Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    colorUniform = gl.getUniformLocation( shaderProgram, "shapeColor" ); // color in fragment shader
    
    
	AnimPadBall();
	AnimPadLeft();
	AnimPadLow()
	AnimPadRight();
	AnimPadUp();
    
	requestAnimFrame( render );
}