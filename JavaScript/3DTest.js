//Three.js test
var WIDTH = 400
		, HEIGHT = 300;
	//camera attributes
	var VIEW_ANGLE = 45
		, ASPECT = WIDTH / HEIGHT
		, NEAR = 0.1
		, FAR = 10000;

//create WebGL renderer, camera and scene
var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var scene = new THREE.Scene();

$(document).ready(function(){
//scene size

	console.log("get DOM element to attach to");
	var $container = $('#container');


	//the camera starts at 0,0,0 so pull it back
	camera.position.z = 300;
	//start the renderer
	renderer.setSize(WIDTH, HEIGHT);
	//attach the render-supplied DOM element
	$container.append(renderer.domElement);
	//set up the sphere vars
	var radius = 50
		, segments = 16
		, rings = 16;
	var sphereMaterial = new THREE.MeshLambertMaterial({
		color: 0xCC0000
	});
	console.log("create a new mesh with sphere geometry");
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
	//add to scene
	scene.add(sphere);
	//create a point light
	var pointLight = new THREE.PointLight(0xFFFFFF);
	//set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	//add to scene
	scene.add(pointLight);
	//draw
	console.log("draw");
	draw();
});




function draw() {
	requestAnimationFrame(draw);
	renderer.render(scene, camera);
}
