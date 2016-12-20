function Vehicle3D(theContainer, theProduct, theAllowZoom = false, theCameraStartDistance = 10, theCameraStartHeight = 5, theAutoRotate = false) {
	this.container = theContainer;
	this.SCREEN_WIDTH = theContainer.offsetWidth;
	this.SCREEN_HEIGHT = theContainer.offsetHeight;
	this.camera = new THREE.PerspectiveCamera(45, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 20000);
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	this.painting = true;
	this.paintColour = 0x0000cc;
	this.cameraStartDistance = theCameraStartDistance;
	this.cameraStartHeight = theCameraStartHeight;
	this.autoRotate = theAutoRotate;
	this.allowZoom = theAllowZoom;
	this.product = theProduct;
	this.init();
	this.draw();
}
Vehicle3D.prototype = {
	constructor: Vehicle3D
	, init: function () {
		this.camera.position.z = this.cameraStartDistance;
		this.camera.position.y = this.cameraStartHeight;
		this.scene.background = new THREE.Color(0xffffff);
		this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 1, 1);
		this.scene.add(light);
		this.controls.target = new THREE.Vector3(0, 0, 0);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		console.log(this.allowZoom);
		this.controls.enableZoom = this.allowZoom;
		this.controls.autoRotate = this.autoRotate;
		console.log(this);
		this.ObjMTlLoad(this.product.getBasePath(), this.product.getObjFile(), this.product.getMtlFile(),this);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
		this.container.appendChild(this.renderer.domElement);
		//add event listener for left mouse button click
		var context = this;
		$(this.container).mousedown(function (eventData) {
			if (eventData.which === 1) {
				context.onContainerMouseDown(eventData);
			}
		});
		//add event listener for the screen render changing size
		this.container.addEventListener('resize', this.onWindowResize.bind(this), false);
	}
	, ObjMTlLoad: function (path, objName, mtlName, context, rotateRads = 0) {
		console.log("Loading...");
		var onProgress = function (xhr) {
			if (xhr.lengthComputable) {
				var percentComplete = (xhr.loaded / xhr.total) * 100;
				console.log(Math.round(percentComplete, 2) + "% downloaded " + objName);
			}
		};
		var onError = function (xhr) {
			console.log("Error: " + xhr);
		};
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath(path);
		mtlLoader.load(mtlName, function (materials) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath(path);
			objLoader.load(objName, function (object) {
				object.position.set(0, 0, 0);
				object.rotateX(rotateRads);
				console.log(context);
				context.scene.add(object);
			}, onProgress, onError);
		});
	}
	, onContainerMouseDown: function (event) {
		var mouse = new THREE.Vector2();
		console.log("mouse down");
		mouse.x = (event.clientX / this.SCREEN_WIDTH) * 2 - 1;
		mouse.y = -(event.clientY / this.SCREEN_HEIGHT) * 2 + 1;
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, this.camera);
		var intersects = raycaster.intersectObjects(this.scene.children, true);
		if (intersects.length > 0 && this.painting) {
			console.log(intersects[0]);
			intersects[0].object.material.color.set(this.paintColour);
		}
	}
	, onWindowResize: function () {
		this.SCREEN_WIDTH = this.container.offsetWidth;
		this.SCREEN_HEIGHT = this.container.offsetHeight;
		this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
	}
	, draw: function () {
		requestAnimationFrame(this.draw.bind(this));
		this.render();
	}
	, render: function () {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}
