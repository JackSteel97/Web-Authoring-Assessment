function Vehicle3D(theContainer, theProduct, theAllowZoom = false, theCameraStartDistance = 10, theCameraStartHeight = 5, rotationNeeded = 0, theAutoRotate = false) {
	//container is the element the model will be drawn inside
	this.container = theContainer;
	//screen width and height are the width and height of the container i.e. the amount of space the renderer has available to draw in
	this.SCREEN_WIDTH = theContainer.offsetWidth;
	this.SCREEN_HEIGHT = theContainer.offsetHeight;
	console.log(this.SCREEN_HEIGHT);
	//declare a new camera object, FOV = 45, set aspect ratio, set near and far render distance
	this.camera = new THREE.PerspectiveCamera(45, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 20000);
	//instantiate a scene object
	this.scene = new THREE.Scene();
	//instantiate a WebGL renderer and enable antialias. webGL can run on GPU for better performance
	this.renderer = new THREE.WebGLRenderer({
		antialias: true
		, preserveDrawingBuffer: true
	});
	//instantiate the controls for the user moving the camera
	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	//set painting defaults
	this.painting = true;
	this.paintColour = 0xff0000;
	//set other parameters passed in for later use
	this.cameraStartDistance = theCameraStartDistance;
	this.cameraStartHeight = theCameraStartHeight;
	this.autoRotate = theAutoRotate;
	this.allowZoom = theAllowZoom;
	this.product = theProduct;
	this.rotateXRads = rotationNeeded;
	//start initialisation
	this.init();
	this.draw();
}
//declare methods as object literals for Vehicle3D
Vehicle3D.prototype = {
	//point back to the constructor function
	constructor: Vehicle3D, //declare init method
	init: function () {
		//set camera position
		this.camera.position.z = this.cameraStartDistance;
		this.camera.position.y = this.cameraStartHeight;
		//set background colour to white
		this.scene.background = new THREE.Color(0xffffff);
		//add white ambient light
		this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
		//add white directional light
		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 1, 1);
		this.scene.add(light);
		//set the camera target to the center point (point lens at where the model will be)
		this.controls.target = new THREE.Vector3(0, 0, 0);
		//set flags for the controls
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = this.allowZoom;
		this.controls.autoRotate = this.autoRotate;
		//load in the model, pass the correct context through
		this.ObjMtlLoad(this.product.getBasePath(), this.product.getObjFile(), this.product.getMtlFile(), this, this.rotateXRads);
		//set up renderer
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
		//attach the renderer canvas to the container
		this.container.appendChild(this.renderer.domElement);
		//set correct context for listener
		var context = this;
		//add event listener for left mouse button click
		$(this.container).mousedown(function (eventData) {
			if (eventData.which === 1) {
				context.onContainerMouseDown(eventData);
			}
		});
		//add event listener for the window changing size (if container changes responsively)
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
	}, //declare ObjMtlLoad method
	ObjMtlLoad: function (path, objName, mtlName, context, rotateRads = 0) {
		console.log("Loading...");
		//declare callback function for printing out download progress
		var onProgress = function (xhr) {
				console.log("Loading... " + xhr.loaded);
				$("#loadingDisplay span").text("Loading... " + xhr.loaded/1024 + " kb")
			}
			//declare callback function for when an error occurs
		var onError = function (xhr) {
			console.log("Error: " + xhr);
		};
		//instantiate a MTLLoader object
		var mtlLoader = new THREE.MTLLoader();
		//set the base path
		mtlLoader.setPath(path);
		//load the mtl file
		mtlLoader.load(mtlName, function (materials) {
			materials.preload();
			//instantiate a OBJLoader object
			var objLoader = new THREE.OBJLoader();
			//apply the mtl file to the obj
			objLoader.setMaterials(materials);
			//set the base path
			objLoader.setPath(path);
			//load the objfile
			objLoader.load(objName, function (object) {
				//set position to the center
				object.position.set(0, 0, 0);
				//rotate if requested
				object.rotateX(rotateRads);
				//add to scene
				context.scene.add(object);
				$("#loadingDisplay").hide();
			}, onProgress, onError);
		});
	}, //declare onContainerMouseDown method
	onContainerMouseDown: function (event) {
		//instantiate a 2D vector object
		var mouse = new THREE.Vector2();
		console.log("mouse down");
		//get the coords of the mouse click, calculate coords for the click inside the scene and normalise
		var X = event.clientX + $(document).scrollLeft() - this.container.parentElement.offsetLeft;
		var Y = event.clientY + $(document).scrollTop() - this.container.parentElement.offsetTop;
		mouse.x = (X / this.SCREEN_WIDTH) * 2 - 1;
		mouse.y = -(Y / this.SCREEN_HEIGHT) * 2 + 1;
		//instantiate a Raycaster object
		var raycaster = new THREE.Raycaster();
		//set up to cast from the camera to where the mouse click occured
		raycaster.setFromCamera(mouse, this.camera);
		//get all the meshes that the ray vector instersects
		var intersects = raycaster.intersectObjects(this.scene.children, true);
		//this.scene.add(new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 100, Math.random() * 0xffffff ));
		//if it intersects something and we are in painting mode
		if (intersects.length > 0 && this.painting) {
			console.log(intersects[0]);
			//paint the first mesh intersected
			intersects[0].object.material.color.set(this.paintColour);
		}
	}, //declare onWindowResize method
	onWindowResize: function () {
		console.log("resize");
		//if the window changes size then it is possible that the container changed size
		//therefore, we need to recalculate its size and reset the camera appropriately
		this.SCREEN_WIDTH = this.container.offsetWidth;
		this.SCREEN_HEIGHT = this.container.offsetHeight;
		this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
	}, //declare draw method
	draw: function () {
		//start loop to draw every frame
		requestAnimationFrame(this.draw.bind(this));
		//render the scene
		this.render();
	}, //declare render method
	render: function () {
		//update the user controls
		this.controls.update();
		//render the scene
		this.renderer.render(this.scene, this.camera);
	}, //declare setPainting method
	setPainting: function (painting) {
		//set painting
		this.painting = painting;
	}, //declare isPainting method
	isPainting: function () {
		//return boolean
		return painting;
	}, //declare setPaintColour method
	setPaintColour: function (colour) {
		//set paint colour
		this.paintColour = colour;
	}
}
