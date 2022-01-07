import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Controls

//const controls = new OrbitControls(camera, renderer.domElement);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xffa500, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  //torus.rotation.x += 0.001;
  //torus.rotation.y += 0.001;
    torus.rotation.z -= 0.001;
  //controls.update();

  renderer.render(scene, camera);
}

animate();
