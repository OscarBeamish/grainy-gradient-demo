import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Shape3D from './Shape3D'
import GrainOverlay from './GrainOverlay'

export default function GrainyGradient({ config, shapes, selectedShapeId, onShapeSelect }) {
  return (
    <>
      {/* Background */}
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[20, 15]} />
        <meshBasicMaterial color="#0a0a0a" />
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
