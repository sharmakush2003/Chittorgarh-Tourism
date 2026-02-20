"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePathname } from "next/navigation";

export default function Background3D() {
    const canvasRef = useRef(null);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isChronicles = pathname === "/chronicles";
    const showParticles = isHome || isChronicles;

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });

        const updateSize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        updateSize();

        // Geometry
        const particlesCount = 800;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const scales = new Float32Array(particlesCount);
        const randomness = new Float32Array(particlesCount * 3);

        const colorPalette = [
            new THREE.Color(0xFFC107), // Gold
            new THREE.Color(0xFF5722), // Deep Saffron
            new THREE.Color(0xE65100), // Burnt Orange
            new THREE.Color(0xB71C1C), // Maroon
        ];

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 15;
            positions[i3 + 1] = (Math.random() - 0.5) * 15;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            scales[i] = Math.random();

            randomness[i3] = Math.random();
            randomness[i3 + 1] = Math.random();
            randomness[i3 + 2] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

        // Vertex Shader
        const vertexShader = `
            uniform float uTime;
            attribute float aScale;
            attribute vec3 aRandomness;
            varying vec3 vColor;

            void main() {
                vec3 pos = position;
                
                // Animate position
                // Upward drift
                float speed = 0.2 + aScale * 0.1;
                pos.y += uTime * speed;
                
                // Reset height when too high
                // We use modulo manually-ish for better control or just sin reset?
                // Let's use mod on the y component relative to a loop height
                float loopHeight = 20.0;
                pos.y = mod(pos.y + 10.0, loopHeight) - 10.0;

                // Horizontal Sway
                pos.x += sin(uTime * 0.5 + pos.y) * 0.5;
                
                vec4 viewPosition = viewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * viewPosition;
                
                // Size attenuation
                gl_PointSize = (30.0 * aScale) * (1.0 / -viewPosition.z);
                
                vColor = color;
            }
        `;

        // Fragment Shader
        const fragmentShader = `
            varying vec3 vColor;

            void main() {
                // Circular particle
                float strength = distance(gl_PointCoord, vec2(0.5));
                strength = 1.0 - strength;
                strength = pow(strength, 10.0);
                
                vec3 finalColor = mix(vec3(0.0), vColor, strength);
                
                if(strength < 0.01) discard;

                gl_FragColor = vec4(finalColor, strength * 0.8); // 0.8 opacity
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Animation Loop
        const clock = new THREE.Clock();
        let animationId;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Update Uniforms
            material.uniforms.uTime.value = elapsedTime;

            // Slow rotation of the whole system
            particles.rotation.y = elapsedTime * 0.02;

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(tick);
        };

        tick();

        // Resize
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="bg-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                opacity: showParticles ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
            }}
        />
    );
}
