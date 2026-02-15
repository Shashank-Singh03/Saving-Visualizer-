import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ShaderBackground.css';

export const ShaderBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Setup
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: false,
            alpha: false
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0 },
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float u_time;
                uniform vec2 u_resolution;

                // Calm noise function
                float noise(vec2 p) {
                    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                }

                // Smooth noise
                float smoothNoise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    
                    float a = noise(i);
                    float b = noise(i + vec2(1.0, 0.0));
                    float c = noise(i + vec2(0.0, 1.0));
                    float d = noise(i + vec2(1.0, 1.0));
                    
                    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                }

                // Layered noise
                float fbm(vec2 p) {
                    float value = 0.0;
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    
                    for(int i = 0; i < 4; i++) {
                        value += amplitude * smoothNoise(p * frequency);
                        frequency *= 2.0;
                        amplitude *= 0.5;
                    }
                    
                    return value;
                }

                void main() {
                    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

                    // Deep blue-black base
                    vec3 baseColor = vec3(0.02, 0.027, 0.043); // #05070B

                    // Slow cosmic motion
                    vec2 motion = vec2(
                        p.x + u_time * 0.03,
                        p.y - u_time * 0.05
                    );

                    float n = fbm(motion * 2.0);
                    
                    // Muted gold particle color
                    vec3 particleColor = vec3(0.776, 0.663, 0.420); // #C6A96B
                    
                    // Very subtle particle glow
                    float particles = smoothstep(0.6, 0.8, n) * 0.15;
                    
                    // Combine
                    vec3 finalColor = baseColor + particleColor * particles;
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Animation loop
        let animationId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            material.uniforms.u_time.value = elapsedTime;
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height);
            material.uniforms.u_resolution.value.set(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="shader-canvas" />;
};
