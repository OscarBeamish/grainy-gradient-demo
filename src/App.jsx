import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import GrainyGradient from './components/GrainyGradient'
import Controls from './components/Controls'
import Header from './components/Header'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    grainIntensity: 0.5,
    grainSize: 1.0,
  })

  const [shapes, setShapes] = useState([
    {
      id: 1,
      type: 'sphere',
      position: { x: -1.5, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      rotationSpeed: { x: 0, y: 0.01, z: 0 },
      scale: 1.5,
      color1: '#ff0080',
      color2: '#7928ca',
      gradientDirection: 0.5,
      gradientSpread: 1.0,
      autoRotate: true,
    },
    {
      id: 2,
      type: 'torus',
      position: { x: 1.5, y: 0, z: -0.5 },
      rotation: { x: 0.5, y: 0, z: 0 },
      rotationSpeed: { x: 0.005, y: 0.01, z: 0 },
      scale: 1.2,
      color1: '#00dfd8',
      color2: '#f093fb',
      gradientDirection: 0,
      gradientSpread: 1.5,
      autoRotate: true,
    },
  ])

  const [selectedShapeId, setSelectedShapeId] = useState(1)

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Canvas Section */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <OrbitControls enableZoom={true} enablePan={false} />
            <GrainyGradient
              config={config}
              shapes={shapes}
              selectedShapeId={selectedShapeId}
              onShapeSelect={setSelectedShapeId}
            />
          </Canvas>
        </div>

        {/* Controls Panel */}
        <Controls
          config={config}
          setConfig={setConfig}
          shapes={shapes}
          setShapes={setShapes}
          selectedShapeId={selectedShapeId}
          setSelectedShapeId={setSelectedShapeId}
        />
      </div>
    </div>
  )
}

export default App
