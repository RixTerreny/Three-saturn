import './style.css'

import * as THREE from 'three';

import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import{FlyControls} from 'three/examples/jsm/controls/FlyControls'

//setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//try
// var element = document.createElement( 'div' );
// element.style.cursor = 'url(path/to/image.png), auto';
// var object = new THREE.Object3D();
// object.position.set( x, y, z );
// object.scale.set( sX, sY, sZ );
// object.userData.element = element;

//camera
const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 20000 );
camera.position.z = 7000;
camera.position.y = 137;

//scroll
document.addEventListener( 'mousewheel', (event) => {
  camera.position.z +=event.deltaY/100;
});

// resize window
window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// light
const light = new THREE.AmbientLight( 0x404040,3 ); // soft white light
scene.add( light );
const lightP = new THREE.PointLight( 0xffffff, 0.3 );
lightP.position.set( -10, 400, 900 ); // position the point light
scene.add( lightP );

//controls
 //const controls = new OrbitControls(camera, renderer.domElement);
const flyControls = new FlyControls(camera, renderer.domElement);

//objects
const geometry = new THREE.SphereGeometry( 550, 60, 60);
const material = new THREE.MeshLambertMaterial( { color: 0x000000,side: THREE.DoubleSide } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

const geometry2 = new THREE.SphereGeometry( 8, 40, 30);
const material2 = new THREE.MeshLambertMaterial( { color: 0xff0000,wireframe:true } );
const sphere2 = new THREE.Mesh( geometry2, material2 );
scene.add( sphere2 );

const geometry3 = new THREE.TorusKnotGeometry( 3, 1, 100, 170 );
const material3 = new THREE.MeshNormalMaterial( { color: 0xffff00,} );
const torusKnot = new THREE.Mesh( geometry3, material3 );
scene.add( torusKnot );

var loader = new THREE.TextureLoader();
const texture = loader.load('./fire.jpg');
texture.magFilter = THREE.NearestFilter; 
texture.wrapS = THREE.ClampToEdgeWrapping; 
texture.wrapT = THREE.ClampToEdgeWrapping;


const geometry1 = new THREE.RingGeometry( 1500, 580, 102);
const material1 = new THREE.MeshLambertMaterial({map: texture,side: THREE.DoubleSide});
const cube = new THREE.Mesh( geometry1, material1 );
cube.rotation.x = -Math.PI / 2;
scene.add( cube );

//core
function createCore(){
  const geometry3 = new THREE.BoxGeometry( 3, 5, 3);
  const material3 = new THREE.MeshPhysicalMaterial( { color: 0x00ff00,emissive:0,roughness:0,transparent:true,opacity:0.40 } );
  const sphere3 = new THREE.Mesh( geometry3, material3 );
  scene.add( sphere3 );

const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

    sphere3.rotation.z += 0.01;
  sphere3.position.set(x, y, z);
  scene.add(sphere3);
}

Array(3000).fill().forEach(createCore);



function animate() {
	requestAnimationFrame( animate );

	sphere.rotation.y += 0.006;
  //sphere.rotation.x += 0.002;

  sphere2.rotation.y -= 0.01;
  //sphere2.rotation.x -= 0.012;

	cube.rotation.z += 0.006;
  //cube.rotation.x += 0.002;

  
	torusKnot.rotation.z += 0.005;
  torusKnot.rotation.x -= 0.06;
  torusKnot.rotation.y += 0.03;
  //cube.rotation.x += 0.002;

  flyControls.movementSpeed = 7;
  flyControls.update(1)
//controls.update();

	renderer.render( scene, camera );
}

//star
function addStar() {
  const geometry = new THREE.SphereGeometry(1.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(7500));

  star.position.set(x, y, z);
  scene.add(star);
}


function addStar2() {
  const geometry = new THREE.SphereGeometry(3.55, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(10000)+200);

  star.position.set(x, y, z);
  scene.add(star);
}



Array(6000).fill().forEach(addStar);
Array(670).fill().forEach(addStar2);
animate();