var gl;
var shaderProgram;
var shaderProgramSquare;
var shaderProgramEllipse;
var shaderProgramPaddle;

function init() {
	//set up the canvas
	var canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl) { alert("WebGL is not available"); }
	
	//Set up the background color
	gl.viewport(0,0,512,512);
	
	//Set up the back ground color
	gl.clearColor(0.0,0.0,0.0,1.0);
	
	//Force the WebGL context to clear the color buffer 
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	//Create shader program, needs vertex and fragment shader code 
	//in GSL to be written in HTML file 
	shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
	shaderProgramSquare = initShaders( gl, "vertex-shader", "fragment-shader-square");
	shaderProgramEllipse = initShaders( gl, "vertex-shader", "fragment-shader-ellipse");
	shaderProgramPaddle = initShaders( gl, "vertex-shader", "fragment-shader-paddle");
	
	gl.useProgram( shaderProgram );
	drawPadLeft();
	
	gl.useProgram( shaderProgramSquare );
	drawPadRight();
	
	gl.useProgram( shaderProgramEllipse );
	drawPadUp();
	
	gl.useProgram( shaderProgramPaddle );
	drawPadLower();
}

function drawPadLeft() {
	
	//Enter array set up code here
	var p0 = vec2 (-0.95, 0.0);
	var p1 = vec2 (-0.95, -0.4);
	var p2 = vec2 (-0.90, -0.4);
	var p3 = vec2 (-0.90, 0.0);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	//Create a buffer on the graphics card and send array to buffer for use in the shaders
	var bufferId = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData ( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
	
	//Create pointer that iterates over the array of points in the shader code
	var myPositionAttribute = gl.getAttribLocation (shaderProgram, "myPosition");
	gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray ( myPositionAttribute );
	
	//Force a draw of the triangle using the drawArray() call
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
	}

function drawPadRight() {
	
	//Enter array set up code here
	var p0 = vec2 (0.95, 0.0);
	var p1 = vec2 (0.95, -0.4);
	var p2 = vec2 (0.90, -0.4);
	var p3 = vec2 (0.90, 0.0);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	//Create a buffer on the graphics card and send array to buffer for use in the shaders
	var bufferId = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData ( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
	
	//Create pointer that iterates over the array of points in the shader code
	var myPositionAttribute = gl.getAttribLocation (shaderProgramSquare, "myPosition");
	gl.vertexAttribPointer ( myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray ( myPositionAttribute);
	
	//Force a draw of the triangle using the drawArray() call
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);

	}

function drawPadUp() {
	
	//Enter array set up code here
	var p0 = vec2 (0.0, 0.95);
	var p1 = vec2 (-0.4, 0.95);
	var p2 = vec2 (-0.4, 0.90);
	var p3 = vec2 (0.0, 0.90);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	//Create a buffer on the graphics card and send array to buffer for use in the shaders
	var bufferId = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData ( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
	
	//Create pointer that iterates over the array of points in the shader code
	var myPositionAttribute = gl.getAttribLocation (shaderProgramSquare, "myPosition");
	gl.vertexAttribPointer ( myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray ( myPositionAttribute);
	
	//Force a draw of the triangle using the drawArray() call
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
	
}

function drawPadLower() {
	
	//Enter array set up code here
	var p0 = vec2 (0.0, -0.95);
	var p1 = vec2 (-0.4, -0.95);
	var p2 = vec2 (-0.4, -0.90);
	var p3 = vec2 (0.0, -0.90);
	
	var arrayOfPoints = [p0,p1,p2,p3];
	
	//Create a buffer on the graphics card and send array to buffer for use in the shaders
	var bufferId = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData ( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
	
	//Create pointer that iterates over the array of points in the shader code
	var myPositionAttribute = gl.getAttribLocation (shaderProgramSquare, "myPosition");
	gl.vertexAttribPointer ( myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray ( myPositionAttribute);
	
	//Force a draw of the triangle using the drawArray() call
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
	
}

function render(){
	requestAnimFrame( render );
	
	//Translation Matrix
	M = [1.0, 0.0, 0.0, 
		 0.0, 1.0, 0.0,
		  tx,  ty, 1.0];
		  
	// Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
}