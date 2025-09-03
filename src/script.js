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

						// Show nav when hero is less than 10% visible (almost completely scrolled past)
						if (entry.intersectionRatio > 0.1) {
							// Hero still significantly visible -> hide nav
							nav.style.display = "none";
							nav.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
							nav.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
						} else {
							// Hero almost completely passed -> show nav
							nav.style.display = "flex";
							setTimeout(() => {
								nav.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
								nav.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
							}, 10);
						}
					});
				},
				{ threshold: [0, 0.1, 0.5, 1] },
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
			alert("Sorry, but this is a private project.");
		});
	}

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0a0a0f); // Slightly lighter dark for depth

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.domElement.style.position = "fixed";
	renderer.domElement.style.top = "0";
	renderer.domElement.style.left = "0";
	renderer.domElement.style.zIndex = "-1";
	document.body.appendChild(renderer.domElement);

	// Enhanced star field with multiple layers and sizes
	const createStarField = () => {
		const starLayers = [];

		// Layer 1: Distant small stars
		const distantGeometry = new THREE.BufferGeometry();
		const distantVertices = [];
		const distantColors = [];
		const distantSizes = [];
		const distantStarCount = 800;

		for (let i = 0; i < distantStarCount; i++) {
			const radius = 2000 + Math.random() * 2000;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(Math.random() * 2 - 1);

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			distantVertices.push(x, y, z);

			// Subtle color variations (blue-white spectrum)
			const colorVariation = Math.random();
			distantColors.push(
				0.8 + colorVariation * 0.2, // Red
				0.9 + colorVariation * 0.1, // Green
				1.0, // Blue
			);

			distantSizes.push(0.5 + Math.random() * 0.5);
		}

		distantGeometry.setAttribute("position", new THREE.Float32BufferAttribute(distantVertices, 3));
		distantGeometry.setAttribute("color", new THREE.Float32BufferAttribute(distantColors, 3));
		distantGeometry.setAttribute("size", new THREE.Float32BufferAttribute(distantSizes, 1));

		const distantMaterial = new THREE.PointsMaterial({
			size: 1,
			sizeAttenuation: true,
			vertexColors: true,
			transparent: true,
			opacity: 0.6,
		});

		const distantStars = new THREE.Points(distantGeometry, distantMaterial);
		scene.add(distantStars);
		starLayers.push({ stars: distantStars, speed: 0.0002, rotationSpeed: { x: 0.0001, y: 0.0003 } });

		// Layer 2: Medium stars
		const mediumGeometry = new THREE.BufferGeometry();
		const mediumVertices = [];
		const mediumColors = [];
		const mediumSizes = [];
		const mediumStarCount = 400;

		for (let i = 0; i < mediumStarCount; i++) {
			const radius = 1200 + Math.random() * 1500;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(Math.random() * 2 - 1);

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			mediumVertices.push(x, y, z);

			// Cyan-white spectrum
			const colorVariation = Math.random();
			mediumColors.push(
				0.7 + colorVariation * 0.3, // Red
				1.0, // Green
				1.0, // Blue
			);

			mediumSizes.push(1 + Math.random() * 1.5);
		}

		mediumGeometry.setAttribute("position", new THREE.Float32BufferAttribute(mediumVertices, 3));
		mediumGeometry.setAttribute("color", new THREE.Float32BufferAttribute(mediumColors, 3));
		mediumGeometry.setAttribute("size", new THREE.Float32BufferAttribute(mediumSizes, 1));

		const mediumMaterial = new THREE.PointsMaterial({
			size: 2,
			sizeAttenuation: true,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
		});

		const mediumStars = new THREE.Points(mediumGeometry, mediumMaterial);
		scene.add(mediumStars);
		starLayers.push({ stars: mediumStars, speed: 0.0005, rotationSpeed: { x: 0.0003, y: 0.0007 } });

		// Layer 3: Close bright stars
		const closeGeometry = new THREE.BufferGeometry();
		const closeVertices = [];
		const closeColors = [];
		const closeSizes = [];
		const closeStarCount = 150;

		for (let i = 0; i < closeStarCount; i++) {
			const radius = 800 + Math.random() * 1000;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(Math.random() * 2 - 1);

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			closeVertices.push(x, y, z);

			// Bright white-cyan spectrum
			const colorVariation = Math.random();
			closeColors.push(
				0.9 + colorVariation * 0.1, // Red
				1.0, // Green
				1.0, // Blue
			);

			closeSizes.push(2 + Math.random() * 2);
		}

		closeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(closeVertices, 3));
		closeGeometry.setAttribute("color", new THREE.Float32BufferAttribute(closeColors, 3));
		closeGeometry.setAttribute("size", new THREE.Float32BufferAttribute(closeSizes, 1));

		const closeMaterial = new THREE.PointsMaterial({
			size: 3,
			sizeAttenuation: true,
			vertexColors: true,
			transparent: true,
			opacity: 1.0,
		});

		const closeStars = new THREE.Points(closeGeometry, closeMaterial);
		scene.add(closeStars);
		starLayers.push({ stars: closeStars, speed: 0.001, rotationSpeed: { x: 0.0005, y: 0.001 } });

		return starLayers;
	};

	const starLayers = createStarField();

	camera.position.set(0, 0, 1000);

	let mouseX = 0,
		mouseY = 0;
	let targetMouseX = 0,
		targetMouseY = 0;

	document.addEventListener("mousemove", (event) => {
		targetMouseX = (event.clientX / window.innerWidth - 0.5) * 20;
		targetMouseY = (event.clientY / window.innerHeight - 0.5) * 20;
	});

	let time = 0;
	function animate() {
		requestAnimationFrame(animate);
		time += 0.01;

		// Smooth mouse following
		mouseX += (targetMouseX - mouseX) * 0.02;
		mouseY += (targetMouseY - mouseY) * 0.02;

		// Animate each star layer with different speeds and twinkling
		starLayers.forEach((layer, index) => {
			// Rotation based on layer speed
			layer.stars.rotation.x += layer.rotationSpeed.x;
			layer.stars.rotation.y += layer.rotationSpeed.y;
			layer.stars.rotation.z += layer.rotationSpeed.x * 0.5;

			// Twinkling effect for closer layers
			if (index > 0) {
				const sizes = layer.stars.geometry.attributes.size.array;
				const originalSizes = layer.stars.geometry.userData.originalSizes || sizes.slice();
				if (!layer.stars.geometry.userData.originalSizes) {
					layer.stars.geometry.userData.originalSizes = originalSizes;
				}

				for (let i = 0; i < sizes.length; i++) {
					const twinkle = Math.sin(time * (2 + index) + i * 0.1) * 0.3 + 0.7;
					sizes[i] = originalSizes[i] * twinkle;
				}
				layer.stars.geometry.attributes.size.needsUpdate = true;
			}

			// Subtle parallax movement based on mouse
			layer.stars.position.x = mouseX * (10 + index * 5);
			layer.stars.position.y = -mouseY * (10 + index * 5);
		});

		// Enhanced camera movement with depth
		camera.position.x += (mouseX * 150 - camera.position.x) * 0.05;
		camera.position.y += (-mouseY * 150 - camera.position.y) * 0.05;
		camera.position.z = 1000 + Math.sin(time * 0.1) * 50; // Subtle breathing effect
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
