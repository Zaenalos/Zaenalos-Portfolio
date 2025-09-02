import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.min.js";

document.addEventListener("DOMContentLoaded", () => {
	const hero = document.getElementById("home-hero");
	const nav = document.getElementById("mainNav");

	if (!hero || !nav) return;

	// Function to check if device is mobile
	const checkIsMobile = () => window.innerWidth < 768;

	// Always ensure nav starts hidden
	nav.style.display = "none";
	nav.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
	nav.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");

	// Initialize observer variable
	let observer = null;

	// Function to setup navigation behavior for desktop only
	const setupNavigation = () => {
		if (checkIsMobile()) {
			// On mobile: always hide nav and disconnect observer
			nav.style.display = "none";
			if (observer) {
				observer.disconnect();
				observer = null;
			}
			return;
		}

		// On desktop: setup intersection observer if not already done
		if (!observer) {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (checkIsMobile()) {
							// Double-check mobile state during callback
							nav.style.display = "none";
							return;
						}

						if (entry.isIntersecting) {
							// Hero still visible -> hide nav
							nav.style.display = "none";
							nav.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
							nav.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
						} else {
							// Hero completely passed -> show nav (only on desktop)
							nav.style.display = "flex";
							setTimeout(() => {
								nav.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
								nav.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
							}, 10);
						}
					});
				},
				{ threshold: 0 }
			);
			observer.observe(hero);
		}
	};

	// Initial setup
	setupNavigation();

	// Handle window resize to reconfigure navigation
	window.addEventListener("resize", () => {
		setupNavigation();
	});

	// Smooth scrolling for all navigation links
	const allNavLinks = document.querySelectorAll('a[href^="#"]');
	allNavLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const targetId = link.getAttribute("href");
			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	const zaenalosVM = document.querySelector("#zaenalos-vm");
	if (zaenalosVM) {
		zaenalosVM.addEventListener("click", (event) => {
			event.preventDefault();
			alert("Sorry but this is a private project.");
		});
	}

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000001);

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);

	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	document.body.appendChild(renderer.domElement);
	// Simple star field - just white dots
	const createStarField = () => {
		const geometry = new THREE.BufferGeometry();
		const vertices = [];
		const starCount = 1000;

		for (let i = 0; i < starCount; i++) {
			// Random position in a sphere around the camera
			const radius = 1000 + Math.random() * 1500;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(Math.random() * 2 - 1);

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			vertices.push(x, y, z);
		}

		geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

		const material = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 1,
			sizeAttenuation: true,
		});

		const stars = new THREE.Points(geometry, material);
		scene.add(stars);
		return stars;
	};
	const starField = createStarField();

	camera.position.set(0, 0, 1000);

	let mouseX = 0,
		mouseY = 0;

	document.addEventListener("mousemove", (event) => {
		mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
		mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
	});

	let time = 0;
	function animate() {
		requestAnimationFrame(animate);
		time += 0.01; // Slowly rotate the star field
		starField.rotation.x += 0.0005;
		starField.rotation.y += 0.001;

		camera.position.x += (mouseX * 100 - camera.position.x) * 0.02;
		camera.position.y += (-mouseY * 100 - camera.position.y) * 0.02;
		camera.lookAt(0, 0, 0);

		renderer.render(scene, camera);
	}

	animate();

	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
});
