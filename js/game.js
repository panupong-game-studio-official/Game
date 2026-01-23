import * as THREE from "../libs/three.module.js";

let scene, camera, renderer;
let player;

export function initGame() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Light
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x228B22 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Player (ตัวลิงชั่วคราว = กล่อง)
  const geo = new THREE.BoxGeometry(1, 2, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
  player = new THREE.Mesh(geo, mat);
  player.position.y = 1;
  scene.add(player);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // ให้ลิงวิ่งไปข้างหน้า
  player.position.z -= 0.05;

  renderer.render(scene, camera);
}
