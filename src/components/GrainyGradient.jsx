import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Shape3D from './Shape3D'
import GrainOverlay from './GrainOverlay'

export default function GrainyGradient({ config, shapes, selectedShapeId, onShapeSelect }) {
  const bgRef = useRef()
  const bgMaterialRef = useRef()

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    void main() {
      // Vertical gradient from top to bottom
      vec3 color = mix(uColor1, uColor2, vUv.y);
      gl_FragColor = vec4(color, 1.0);
    }
  `

  const bgUniforms = useMemo(() => ({
    uColor1: { value: new THREE.Color(config.bgColor1) },
    uColor2: { value: new THREE.Color(config.bgColor2) },
  }), [])

  useFrame(() => {
    if (bgMaterialRef.current) {
      bgMaterialRef.current.uniforms.uColor1.value.set(config.bgColor1)
      bgMaterialRef.current.uniforms.uColor2.value.set(config.bgColor2)
    }
  })

  return (
    <>
      {/* Background Gradient */}
      <mesh ref={bgRef} position={[0, 0, -3]}>
        <planeGeometry args={[20, 15]} />
        <shaderMaterial
          ref={bgMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={bgUniforms}
        />
      </mesh>

      {/* 3D Shapes */}
      {shapes.map((shape) => (
        <Shape3D
          key={shape.id}
          shape={shape}
          isSelected={selectedShapeId === shape.id}
          onSelect={() => onShapeSelect(shape.id)}
        />
      ))}

      {/* Grain Overlay */}
      <GrainOverlay
        grainIntensity={config.grainIntensity}
        grainSize={config.grainSize}
      />
    </>
  )
}
