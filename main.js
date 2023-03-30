import './style.css'

import * as THREE from 'three';

import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 70;

//scroll
document.addEventListener( 'mousewheel', (event) => {
  camera.position.z +=event.deltaY/100;
});

// light
const light = new THREE.AmbientLight( 0x404040,3 ); // soft white light
scene.add( light );
// const lightP = new THREE.PointLight( 0xffffff, 1 );
// lightP.position.set( -10, 40, 90 ); // position the point light
// scene.add( lightP );

//controls
const controls = new OrbitControls(camera, renderer.domElement);

//objects
const geometry = new THREE.SphereGeometry( 20, 30, 30);
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

const geometry2 = new THREE.SphereGeometry( 10, 30, 30);
const material2 = new THREE.MeshLambertMaterial( { color: 0xff0000,wireframe:true } );
const sphere2 = new THREE.Mesh( geometry2, material2 );
scene.add( sphere2 );

const geometry3 = new THREE.SphereGeometry( 10, 30, 30);
const material3 = new THREE.MeshLambertMaterial( { color: 0x00ff00,wireframe:true } );
const sphere3 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere3 );


const geometry1 = new THREE.CylinderGeometry( 50, 50, 0.2, 64, );
const material1 = new THREE.MeshLambertMaterial( { color: 0xffffff,} );
const cube = new THREE.Mesh( geometry1, material1 );
scene.add( cube );



function animate() {
	requestAnimationFrame( animate );

	sphere.rotation.y += 0.006;
  //sphere.rotation.x += 0.002;

  sphere2.rotation.y -= 0.01;
  //sphere2.rotation.x -= 0.012;

	cube.rotation.y += 0.006;
  //cube.rotation.x += 0.002;

  controls.update();

	renderer.render( scene, camera );
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(750));

  star.position.set(x, y, z);
  scene.add(star);
}


function addStar2() {
  const geometry = new THREE.SphereGeometry(1.75, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000)+300);

  star.position.set(x, y, z);
  scene.add(star);
}



Array(400).fill().forEach(addStar);
Array(100).fill().forEach(addStar2);
animate();