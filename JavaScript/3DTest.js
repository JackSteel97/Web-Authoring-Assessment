var SCREEN_WIDTH, SCREEN_HEIGHT, container, camera, scene, renderer
var mouseX = 0
	, mouseY = 0;
var controls
var windowHalfx, windowHalfY;
$(document).ready(function ($) {
	SCREEN_HEIGHT = window.innerHeight;
	SCREEN_WIDTH = window.innerWidth;
	windowHalfx = SCREEN_WIDTH / 2;
	windowHalfY = SCREEN_HEIGHT / 2;
	init();
	draw();
});

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	camera = new THREE.PerspectiveCamera(35, SCREEN_WIDTH / SCREEN_HEIGHT, 10, 100)
	camera.position.z = 20;
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	scene.add(new THREE.AmbientLight(0xffffff, 1));
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(1, 1, 1);
	scene.add(light);
	//model
	var onProgress = function (xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = (xhr.loaded / xhr.total) * 100;
			console.log(Math.round(percentComplete, 2) + "% downloaded");
		}
	};

	var onError = function (xhr) {};

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.target = new THREE.Vector3(0, 0, 0);

	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.autoRotate = true;
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('Models/Aventador/');
	mtlLoader.load('Avent.mtl', function (materials) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('Models/Aventador/');
		objLoader.load('Avent.obj', function (object) {
			object.position.y = 0;
			scene.add(object);
		}, onProgress, onError);
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	document.addEventListener('resize', onWindowResize, false);
}


function onWindowResize() {
	windowHalfx = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight)
}


function draw() {
	requestAnimationFrame(draw);
	render();
}

function render() {

	controls.update();
	renderer.render(scene, camera);
}
