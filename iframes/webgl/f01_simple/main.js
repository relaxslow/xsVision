let canvas = document.getElementById("c");
// canvas.addEventListener("resize", resize, false);
function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resize();
let gl = canvas.getContext("webgl2");
if (!gl) {
    throw new Error("gl error!");
}

let shaderSrcs = getShaderSrc([
    "/iframes/webgl/f01_simple/basic.vert",
    "/iframes/webgl/f01_simple/basic.frag"
], main);

function main() {
    createShaderProgram();
    initgl();
    bindBuffer();
    render();
}
let vertexShader, fragmentShader
let program
function createShaderProgram() {
    vertexShader = createShader(gl, gl.VERTEX_SHADER, shaderSrcs["/iframes/webgl/f01_simple/basic.vert"]);
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaderSrcs["/iframes/webgl/f01_simple/basic.frag"]);
    program = createProgram(gl, vertexShader, fragmentShader);

}
function initgl() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
}
let vao;
function bindBuffer() {

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var positions = [
        0, 0,
        0, 0.5,
        0.7, 0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
     vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(positionAttributeLocation);
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

   


}

function render() {
    gl.useProgram(program);
    gl.bindVertexArray(vao);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
}