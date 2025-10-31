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

  const handleRotationSpeedChange = (axis, value) => {
    setShapes(prev => prev.map(shape =>
      shape.id === selectedShapeId
        ? { ...shape, rotationSpeed: { ...shape.rotationSpeed, [axis]: parseFloat(value) } }
        : shape
    ))
  }

  const addShape = () => {
    const newShape = {
      id: Date.now(),
      type: 'sphere',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      rotationSpeed: { x: 0, y: 0.01, z: 0 },
      scale: 1,
      color1: '#ff0080',
      color2: '#7928ca',
      gradientDirection: 0.5,
      gradientSpread: 1.0,
      autoRotate: true,
    }
    setShapes(prev => [...prev, newShape])
    setSelectedShapeId(newShape.id)
  }

  const deleteShape = () => {
    if (selectedShapeId) {
      setShapes(prev => prev.filter(s => s.id !== selectedShapeId))
      setSelectedShapeId(null)
    }
  }

  return (
    <div style={{
      width: '360px',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1.5rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      {/* Shapes List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Shapes</h2>
          <button
            onClick={addShape}
            style={{
              padding: '0.5rem 1rem',
              background: '#14b8a6',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            + Add Shape
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {shapes.map(shape => (
            <button
              key={shape.id}
              onClick={() => setSelectedShapeId(shape.id)}
              style={{
                padding: '0.75rem',
                background: selectedShapeId === shape.id ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: selectedShapeId === shape.id ? '1px solid #14b8a6' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.875rem',
                textAlign: 'left'
              }}
            >
              {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Shape Controls */}
      {selectedShape && (
        <>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              Shape Properties
            </h3>

            {/* Shape Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Type
              </label>
              <select
                value={selectedShape.type}
                onChange={(e) => handleShapeChange('type', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '0.875rem'
                }}
              >
                <option value="sphere">Sphere</option>
                <option value="box">Box</option>
                <option value="torus">Torus</option>
                <option value="cone">Cone</option>
              </select>
            </div>

            {/* Scale */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                <span>Scale</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{selectedShape.scale.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={selectedShape.scale}
                onChange={(e) => handleShapeChange('scale', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {/* Position */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Position
              </label>
              {['x', 'y', 'z'].map(axis => (
                <div key={axis} style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <span>{axis.toUpperCase()}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{selectedShape.position[axis].toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={selectedShape.position[axis]}
                    onChange={(e) => handlePositionChange(axis, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>

            {/* Rotation */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Rotation
              </label>
              {['x', 'y', 'z'].map(axis => (
                <div key={axis} style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <span>{axis.toUpperCase()}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{selectedShape.rotation[axis].toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={Math.PI * 2}
                    step="0.01"
                    value={selectedShape.rotation[axis]}
                    onChange={(e) => handleRotationChange(axis, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>

            {/* Auto Rotate */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                <input
                  type="checkbox"
                  checked={selectedShape.autoRotate}
                  onChange={(e) => handleShapeChange('autoRotate', e.target.checked)}
                />
                Auto Rotate
              </label>
            </div>

            {/* Rotation Speed */}
            {selectedShape.autoRotate && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  Rotation Speed
                </label>
                {['x', 'y', 'z'].map(axis => (
                  <div key={axis} style={{ marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <span>{axis.toUpperCase()}</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{selectedShape.rotationSpeed[axis].toFixed(3)}</span>
                    </label>
                    <input
                      type="range"
                      min="-0.05"
                      max="0.05"
                      step="0.001"
                      value={selectedShape.rotationSpeed[axis]}
                      onChange={(e) => handleRotationSpeedChange(axis, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Gradient Colors */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Gradient Color 1
              </label>
              <input
                type="color"
                value={selectedShape.color1}
                onChange={(e) => handleShapeChange('color1', e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Gradient Color 2
              </label>
              <input
                type="color"
                value={selectedShape.color2}
                onChange={(e) => handleShapeChange('color2', e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            {/* Gradient Direction */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Gradient Direction
              </label>
              <select
                value={selectedShape.gradientDirection < 0.33 ? '0' : selectedShape.gradientDirection < 0.66 ? '0.5' : '1'}
                onChange={(e) => handleShapeChange('gradientDirection', parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '0.875rem'
                }}
              >
                <option value="0">Horizontal</option>
                <option value="0.5">Vertical</option>
                <option value="1">Diagonal</option>
              </select>
            </div>

            {/* Gradient Spread */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                <span>Gradient Spread</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{selectedShape.gradientSpread.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={selectedShape.gradientSpread}
                onChange={(e) => handleShapeChange('gradientSpread', parseFloat(e.target.value))}
                style={{ width: '100%' }}
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
    </div>
  )
}
