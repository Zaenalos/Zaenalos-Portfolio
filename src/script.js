import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const starsGeometry = new THREE.BufferGeometry();
  const starVertices = [];

  for (let i = 0; i < 600; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const starsMaterial = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 1,
  });
  const starField = new THREE.Points(starsGeometry, starsMaterial);

  scene.add(starField);
  camera.position.z = 500;

  function animate() {
    requestAnimationFrame(animate);
    starField.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});
