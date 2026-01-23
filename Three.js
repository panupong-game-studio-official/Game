// สร้างตัวละครแบบง่าย
const geometry = new THREE.BoxGeometry(1, 2, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
const player = new THREE.Mesh(geometry, material);

player.position.y = 1;
scene.add(player);
