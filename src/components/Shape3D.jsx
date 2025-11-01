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
        // Create a jade Gua Sha facial massage tool shape (heart/wing shape)
        const guashaShape = new THREE.Shape()
        const scale = shape.scale

        // Create a heart/teardrop shape like a real Gua Sha tool
        // Top curve (wide part)
        guashaShape.moveTo(0, scale * 1.2)

        // Right side - curved outward then inward
        guashaShape.bezierCurveTo(
          scale * 0.8, scale * 1.2,    // control point 1
          scale * 1.0, scale * 0.6,    // control point 2
          scale * 0.9, 0               // end point
        )

        // Right bottom curve
        guashaShape.bezierCurveTo(
          scale * 0.8, scale * -0.4,   // control point 1
          scale * 0.4, scale * -0.8,   // control point 2
          0, scale * -1.0              // bottom point
        )

        // Left bottom curve (mirror)
        guashaShape.bezierCurveTo(
          scale * -0.4, scale * -0.8,  // control point 1
          scale * -0.8, scale * -0.4,  // control point 2
          scale * -0.9, 0              // end point
        )

        // Left side - curved outward then inward (mirror)
        guashaShape.bezierCurveTo(
          scale * -1.0, scale * 0.6,   // control point 1
          scale * -0.8, scale * 1.2,   // control point 2
          0, scale * 1.2               // back to start
        )

        return (
          <extrudeGeometry
            args={[
              guashaShape,
              {
                depth: shape.scale * 0.15,
                bevelEnabled: true,
                bevelThickness: 0.08,
                bevelSize: 0.06,
                bevelSegments: 12,
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
