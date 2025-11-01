import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import GrainyGradient from './components/GrainyGradient'
import Controls from './components/Controls'
import Toolbar from './components/Toolbar'
import Header from './components/Header'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    bgColor1: '#ffd6e8',
    bgColor2: '#ffb3d9',
    grainIntensity: 0.5,
    grainSize: 1.0,
    blurAmount: 0.005,
  })

  const [shapes, setShapes] = useState([])
  const [selectedShapeId, setSelectedShapeId] = useState(null)
  const [uiVisible, setUiVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleCanvasClick = (e) => {
    // Deselect if clicking on background (not a shape)
    if (e.target.tagName === 'CANVAS') {
      setSelectedShapeId(null)
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {uiVisible && <Header />}

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Canvas Section */}
        <div style={{ flex: 1, position: 'relative' }} onClick={handleCanvasClick}>
          {uiVisible && <Toolbar onAddShape={handleAddShape} />}

          {/* UI Toggle Button */}
          <button
            onClick={() => setUiVisible(!uiVisible)}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: 1000,
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {uiVisible ? 'Hide Tools' : 'Show Tools'}
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: uiVisible ? '140px' : '20px',
              marginLeft: uiVisible ? '0' : '100px',
              zIndex: 1000,
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>

          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <GrainyGradient
              config={config}
              shapes={shapes}
              selectedShapeId={selectedShapeId}
              onShapeSelect={setSelectedShapeId}
            />

            {/* Depth of Field effect for blur on close objects */}
            <EffectComposer>
              <DepthOfField
                focusDistance={0}
                focalLength={0.02}
                bokehScale={config.blurAmount}
                height={480}
              />
            </EffectComposer>
          </Canvas>
        </div>

        {/* Controls Panel */}
        {uiVisible && (
          <Controls
            config={config}
            setConfig={setConfig}
            shapes={shapes}
            setShapes={setShapes}
            selectedShapeId={selectedShapeId}
            setSelectedShapeId={setSelectedShapeId}
          />
        )}
      </div>
    </div>
  )
}

export default App
