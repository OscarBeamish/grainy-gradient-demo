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
    uniform float uGrainIntensity;
    uniform float uGrainSize;

    varying vec2 vUv;

    // Simple hash-based noise for fine grain
    float hash(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.13);
      p3 += dot(p3, p3.yzx + 3.333);
      return fract((p3.x + p3.y) * p3.z);
    }

    void main() {
      vec2 uv = vUv;

      // Create very fine grain texture
      vec2 grainUV = uv * 1000.0 / uGrainSize;
      float grain = hash(grainUV);

      // Center the grain around 0
      grain = (grain - 0.5) * 2.0;

      // Apply intensity with subtle multiplier
      grain *= uGrainIntensity * 0.05;

      // Output grain as white/black overlay
      vec3 grainColor = vec3(grain);

      gl_FragColor = vec4(grainColor, 1.0);
    }
  `

  const uniforms = useMemo(() => ({
    uGrainIntensity: { value: grainIntensity },
    uGrainSize: { value: grainSize },
  }), [])

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uGrainIntensity.value = grainIntensity
      materialRef.current.uniforms.uGrainSize.value = grainSize
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
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
