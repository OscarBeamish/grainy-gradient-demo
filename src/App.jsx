import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import GrainyGradient from './components/GrainyGradient'
import Controls from './components/Controls'
import Toolbar from './components/Toolbar'
import Header from './components/Header'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    bgColor1: '#667eea',
    bgColor2: '#764ba2',
    grainIntensity: 0.8,
    grainSize: 0.5,
  })

  const [shapes, setShapes] = useState([])
  const [selectedShapeId, setSelectedShapeId] = useState(null)

  const handleAddShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      position: { x: 0, y: 0, z: 0 },
      scale: 1.5,
      color1: '#ff0080',
      color2: '#7928ca',
      gradientDirection: 0.5,
    }
    setShapes(prev => [...prev, newShape])
    setSelectedShapeId(newShape.id)
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Canvas Section */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Toolbar onAddShape={handleAddShape} />

          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
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
