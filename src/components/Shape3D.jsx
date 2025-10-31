import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Shape3D({ shape, isSelected, onSelect }) {
  const meshRef = useRef()
  const materialRef = useRef()

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uGradientDirection;

    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Calculate gradient based on direction
      float gradientMix;

      if (uGradientDirection < 0.33) {
        // Horizontal gradient
        gradientMix = vUv.x;
      } else if (uGradientDirection < 0.66) {
        // Vertical gradient
        gradientMix = vUv.y;
      } else {
        // Diagonal gradient
        gradientMix = (vUv.x + vUv.y) * 0.5;
      }

      vec3 color = mix(uColor1, uColor2, gradientMix);
      gl_FragColor = vec4(color, 1.0);
    }
  `

  const uniforms = useMemo(() => ({
    uColor1: { value: new THREE.Color(shape.color1) },
    uColor2: { value: new THREE.Color(shape.color2) },
    uGradientDirection: { value: shape.gradientDirection },
  }), [])

  // Update uniforms when shape changes
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(shape.color1)
      materialRef.current.uniforms.uColor2.value.set(shape.color2)
      materialRef.current.uniforms.uGradientDirection.value = shape.gradientDirection
    }
  })

  const geometry = useMemo(() => {
    switch (shape.type) {
      case 'sphere':
        return <sphereGeometry args={[shape.scale, 64, 64]} />
      case 'box':
        return <boxGeometry args={[shape.scale * 1.5, shape.scale * 1.5, shape.scale * 0.3]} />
      case 'torus':
        return <torusGeometry args={[shape.scale, shape.scale * 0.3, 32, 100]} />
      case 'cone':
        return <coneGeometry args={[shape.scale, shape.scale * 1.5, 3]} />
      case 'guasha':
        // Create a custom Gua Sha tool shape (elongated rounded rectangle)
        const guashaShape = new THREE.Shape()
        const width = shape.scale * 1.2
        const height = shape.scale * 2.5
        const radius = shape.scale * 0.3

        // Draw rounded rectangle shape similar to Gua Sha tool
        guashaShape.moveTo(-width/2 + radius, -height/2)
        guashaShape.lineTo(width/2 - radius, -height/2)
        guashaShape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius)
        guashaShape.lineTo(width/2, height/2 - radius)
        guashaShape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2)
        guashaShape.lineTo(-width/2 + radius, height/2)
        guashaShape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius)
        guashaShape.lineTo(-width/2, -height/2 + radius)
        guashaShape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2)

        return (
          <extrudeGeometry
            args={[
              guashaShape,
              {
                depth: shape.scale * 0.2,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 10,
              },
            ]}
          />
        )
      default:
        return <sphereGeometry args={[shape.scale, 64, 64]} />
    }
  }, [shape.type, shape.scale])

  return (
    <mesh
      ref={meshRef}
      position={[shape.position.x, shape.position.y, shape.position.z]}
      rotation={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      {geometry}
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />

      {/* Selection outline */}
      {isSelected && (
        <mesh>
          {geometry}
          <meshBasicMaterial color="#14b8a6" wireframe />
        </mesh>
      )}
    </mesh>
  )
}
