import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GrainOverlay({ grainIntensity, grainSize }) {
  const meshRef = useRef()
  const materialRef = useRef()

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform float uGrainIntensity;
    uniform float uGrainSize;
    uniform vec2 uResolution;

    varying vec2 vUv;

    // Hash function for better random distribution
    float hash(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    // Better noise function for film grain
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);

      // Four corners in 2D of a tile
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));

      // Smooth interpolation
      vec2 u = f * f * (3.0 - 2.0 * f);

      // Mix 4 corners
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      // Use UV coordinates scaled by resolution for consistent grain size
      vec2 uv = vUv * uResolution;

      // Scale by grain size
      vec2 grainCoord = uv / (uGrainSize * 100.0);

      // Add time variation for subtle animation
      grainCoord += vec2(uTime * 0.001);

      // Generate grain noise
      float grain = noise(grainCoord);

      // Center the grain around 0 (-0.5 to 0.5 range)
      grain = (grain - 0.5) * 2.0;

      // Apply intensity
      grain *= uGrainIntensity;

      // Subtle variation with multiple octaves for more realistic texture
      float grain2 = noise(grainCoord * 2.0) * 0.5;
      grain2 = (grain2 - 0.5) * 2.0;
      grain += grain2 * uGrainIntensity * 0.3;

      // Output as grayscale with subtle tint
      vec3 grainColor = vec3(grain * 0.08);

      gl_FragColor = vec4(grainColor, 1.0);
    }
  `

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uGrainIntensity: { value: grainIntensity },
    uGrainSize: { value: grainSize },
    uResolution: { value: new THREE.Vector2(800, 600) },
  }), [])

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uGrainIntensity.value = grainIntensity
      materialRef.current.uniforms.uGrainSize.value = grainSize
      materialRef.current.uniforms.uTime.value += 1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <planeGeometry args={[20, 15]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
