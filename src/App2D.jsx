import { useState } from 'react'
import Controls from './components/Controls'
import Toolbar from './components/Toolbar'
import Header from './components/Header'
import Shape2D from './components/Shape2D'
import './App.css'

function App2D() {
  const [config, setConfig] = useState({
    bgColor1: '#E2E2E2',
    bgColor2: '#E2E2E2',
    grainIntensity: 1,
    grainSize: 0.9,
  })

  const [shapes, setShapes] = useState([
    {
      id: 1,
      type: 'circle',
      position: { x: 0, y: 0 },
      rotation: { z: 0 },
      scale: 4,
      blur: 40,
      opacity: 0.8,
      color1: '#00bfff',
      color2: '#8b00ff',
      gradientDirection: 0.5,
    }
  ])
  const [selectedShapeId, setSelectedShapeId] = useState(null)
  const [uiVisible, setUiVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleAddShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      position: { x: 0, y: 0 },
      rotation: { z: 0 },
      scale: 2,
      blur: 40,
      opacity: 0.8,
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

  const handleCanvasClick = () => {
    setSelectedShapeId(null)
  }

  const handleMouseDown = (e, shapeId) => {
    setSelectedShapeId(shapeId)
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedShapeId) return

    const deltaX = (e.clientX - dragStart.x) / 80
    const deltaY = (e.clientY - dragStart.y) / 80

    setShapes(prev => prev.map(shape =>
      shape.id === selectedShapeId
        ? { ...shape, position: { x: shape.position.x + deltaX, y: shape.position.y + deltaY } }
        : shape
    ))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Canvas Section */}
        <div style={{ flex: 1, position: 'relative' }}>

          {/* UI Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setUiVisible(!uiVisible)
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: 10000,
              padding: '10px 20px',
              background: '#000',
              border: '1px solid #333',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {uiVisible ? 'Hide Tools' : 'Show Tools'}
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '140px',
              zIndex: 10000,
              padding: '10px 20px',
              background: '#000',
              border: '1px solid #333',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>

          {/* 2D Canvas Area */}
          <div
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(to bottom, ${config.bgColor1}, ${config.bgColor2})`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shapes */}
            {shapes.map((shape) => (
              <Shape2D
                key={shape.id}
                shape={shape}
                isSelected={selectedShapeId === shape.id}
                onSelect={() => setSelectedShapeId(shape.id)}
                onMouseDown={(e) => handleMouseDown(e, shape.id)}
              />
            ))}

            {/* Grain Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: config.grainIntensity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${config.grainSize}' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                mixBlendMode: 'overlay',
              }}
            />
          </div>
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

export default App2D
