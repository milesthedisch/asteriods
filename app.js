	/////////////
	// vectors //
	/////////////

var AXIS = new THREE.Vector3(  0.25, 1, 0  ).normalize();
var sunAXIS = new THREE.Vector3( 0, 0, -100 ).normalize();

	//////////////
	// renderer //
	//////////////

var renderer	= new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	document.body.appendChild( renderer.domElement );

var onRenderFcts= [];

	////////////
	// Camera //
	// Scene  //
	////////////

var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000 );
	camera.position.z = 10;


	////////////
	// Lights //
	////////////

	// var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
	// 	light.color.setHSL( 0.57, 0.80, 0.97 );
	// 	light.position.set( 0, 0, -100 );


	var ambientLight = new THREE.AmbientLight( 0xffffff );
				scene.add( ambientLight );

	/// shadows  ///

	// light.castShadow	= true
	// light.shadowCameraNear	= 0.01
	// light.shadowCameraFar	= 15
	// light.shadowCameraFov	= 45
	// light.shadowCameraLeft	= -1
	// light.shadowCameraRight	=  1
	// light.shadowCameraTop	=  1
	// light.shadowCameraBottom= -1
	// light.shadowBias	= 0.001
	// light.shadowDarkness	= 0.2
	// light.shadowMapWidth	= 1024
	// light.shadowMapHeight	= 1024

	// scene.add( light );	

// var textureFlare0 = THREE.ImageUtils.loadTexture( "../images/lensflare0.png" );

// // var	textureFlare2 = THREE.ImageUtils.loadTexture( "../images/lensflare2.png" );
// // var	textureFlare3 = THREE.ImageUtils.loadTexture( "../images/lensflare3.png" );

// var flareColor = new THREE.Color( 0xffffff );
// flareColor.setHSL(0.1, 0.80, 0.97);

// var sunFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

// //  lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
// //  lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
// //  lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

// //  lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
// //  lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
// //  lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
// //  lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

// sunFlare.customUpdateCallback = lensFlareUpdateCallback;
// sunFlare.position.copy( light.position );

// function lensFlareUpdateCallback( object ) {

// 			var f, fl = object.lensFlares.length;
// 			var flare;
// 			var vecX = -object.positionScreen.x * 2;
// 			var vecY = -object.positionScreen.y * 2;


// 			for ( f = 0; f < fl; f++ ) {

// 				   flare = object.lensFlares[ f ];

// 				   flare.x = object.positionScreen.x + vecX * flare.distance;
// 				   flare.y = object.positionScreen.y + vecY * flare.distance;

// 				   flare.rotation = 0.1;

// 			}

// 	// object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
// }


	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	///////////////////////////////////////////////////////////////////////////////////
	
	// var earth = new THREE.Object3D();
	// 	scene.add(earth);

	// var moon = new THREE.Object3D();
	// 	earth.add(moon)
	
	// var root = new THREE.Object3D();
	// 	root.add(sunFlare)
	// 	root.add(light)
	// 	root.add(earth)
	// 		scene.add(root)



	/////////////
	// Planets //
	/////////////

	// onRenderFcts.push(function(delta){
	// 	root.rotateY(1/64 * delta)
	// })

	// var earthMesh	= THREEx.Planets.createEarth()
	// earth.add(earthMesh)
	// earthMesh.add( new THREE.AxisHelper(3))
	// onRenderFcts.push(function(delta){
	// 	earth.rotateY( 1/9 * delta )
	// })

	// var cloudMesh	= THREEx.Planets.createEarthCloud()
	// scene.add(cloudMesh)
	// onRenderFcts.push(function(delta){
	// 	cloudMesh.rotateY( 1/16 * delta )
	// })

	// var moonMesh = THREEx.Planets.createMoon()
	// moon.add(moonMesh);
	// onRenderFcts.push(function(delta){
	// 	moonMesh.rotateOnAxis( AXIS, 0.01 )
	// 	moon.rotateY( 1 * delta )
	// })
	// moonMesh.add( new THREE.AxisHelper(3))
 	// 	moonMesh.scale.multiplyScalar( 0.2 );
	// moonMesh.position.x = 4


	var sunMesh = THREEx.Planets.createSun()
	sunMesh.position.x = 0
	scene.add(sunMesh)

	//////////////////////////////)////////////////////////////////////////////////////
	//		add star field							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var geometry  = new THREE.SphereGeometry(1000, 32, 32)
	var material  = new THREE.MeshBasicMaterial({ depthWrite: false })
		material.map   = THREE.ImageUtils.loadTexture('/images/galaxy_starfield.png')
		material.side  = THREE.BackSide
	var mesh  = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	// onRenderFcts.push(function(delta) {
	// 	mesh.rotateY(1/16 * delta)
	// })

	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	

	/* controls-orbit */
	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	/* contorls-fly */



	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
	})
	
	//////////////////////////////////////////////////////////////////////////////////
	//		loop runner							//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );	
		controls.update()
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
	})