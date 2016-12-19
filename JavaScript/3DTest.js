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
	camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 10, 100)
	camera.position.z = 100;
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	scene.add(new THREE.AmbientLight(0xffffff, 1));
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(1, 1, 1);
	scene.add(light);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.target = new THREE.Vector3(0, 0, 0);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.autoRotate = false;
	ObjMtlLoad('Models/Aventador/', 'Avent.obj', 'Avent.mtl');
	//ObjMtlLoad('Models/Blackhawk/','uh60.obj','uh60.mtl',-Math.PI/2);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	document.addEventListener('resize', onWindowResize, false);
}

function ObjMtlLoad(path, objName, mtlName, rotateRads = 0) {
	var onProgress = function (xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = (xhr.loaded / xhr.total) * 100;
			console.log(Math.round(percentComplete, 2) + "% downloaded");
		}
	};
	var onError = function (xhr) {};
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(path);
	mtlLoader.load(mtlName, function (materials) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath(path);
		objLoader.load(objName, function (object) {
			object.position.y = 0;
			object.rotateX(rotateRads);
			scene.add(object);
		}, onProgress, onError);
	});
}

function onDocumentMouseUp(event) {
	var mouse = new THREE.Vector2();
    console.log("mouseUp")
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children,true);
    if(intersects.length>0 && painting){
        console.log(intersects[0]);
        intersects[0].object.material.color.set(paintColour);
    }
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
