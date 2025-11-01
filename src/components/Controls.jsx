export default function Controls({ config, setConfig, shapes, setShapes, selectedShapeId, setSelectedShapeId }) {
  const selectedShape = shapes.find(s => s.id === selectedShapeId)

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const handleShapeChange = (key, value) => {
    setShapes(prev => prev.map(shape =>
      shape.id === selectedShapeId
        ? { ...shape, [key]: value }
        : shape
    ))
  }

  const handlePositionChange = (axis, value) => {
    setShapes(prev => prev.map(shape =>
      shape.id === selectedShapeId
        ? { ...shape, position: { ...shape.position, [axis]: parseFloat(value) } }
        : shape
    ))
  }

  const handleRotationChange = (axis, value) => {
    setShapes(prev => prev.map(shape =>
      shape.id === selectedShapeId
        ? { ...shape, rotation: { ...shape.rotation, [axis]: parseFloat(value) } }
        : shape
    ))
  }

  const deleteShape = () => {
    if (selectedShapeId) {
      setShapes(prev => prev.filter(s => s.id !== selectedShapeId))
      setSelectedShapeId(null)
    }
  }

  return (
    <div style={{
      width: '300px',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Background Gradient */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          Background
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Top Color
          </label>
          <input
            type="color"
            value={config.bgColor1}
            onChange={(e) => handleConfigChange('bgColor1', e.target.value)}
            style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Bottom Color
          </label>
          <input
            type="color"
            value={config.bgColor2}
            onChange={(e) => handleConfigChange('bgColor2', e.target.value)}
            style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Grain Controls */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
          Grain Effect
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            <span>Intensity</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{config.grainIntensity.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={config.grainIntensity}
            onChange={(e) => handleConfigChange('grainIntensity', parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            <span>Size</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{config.grainSize.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={config.grainSize}
            onChange={(e) => handleConfigChange('grainSize', parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Selected Shape Controls */}
      {selectedShape && (
        <>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              Selected Shape
            </h3>

            {/* Scale */}
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                <span>Size</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{selectedShape.scale.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={selectedShape.scale}
                onChange={(e) => handleShapeChange('scale', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {/* Blur */}
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                <span>Blur</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{selectedShape.blur}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={selectedShape.blur}
                onChange={(e) => handleShapeChange('blur', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {/* Position - Drag to move shape */}

            {/* Gradient Colors */}
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Gradient Start
              </label>
              <input
                type="color"
                value={selectedShape.color1}
                onChange={(e) => handleShapeChange('color1', e.target.value)}
                style={{ width: '100%', height: '35px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Gradient End
              </label>
              <input
                type="color"
                value={selectedShape.color2}
                onChange={(e) => handleShapeChange('color2', e.target.value)}
                style={{ width: '100%', height: '35px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            {/* Delete Shape */}
            <button
              onClick={deleteShape}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '4px',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Delete Shape
            </button>
          </div>
        </>
      )}
    </div>
  )
}
