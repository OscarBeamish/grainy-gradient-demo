export default function Controls({ config, setConfig }) {
  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div style={{
      width: '320px',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
        Controls
      </h2>

      {/* Colors */}
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          Color 1
        </label>
        <input
          type="color"
          value={config.color1}
          onChange={(e) => handleChange('color1', e.target.value)}
          style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          Color 2
        </label>
        <input
          type="color"
          value={config.color2}
          onChange={(e) => handleChange('color2', e.target.value)}
          style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          Color 3
        </label>
        <input
          type="color"
          value={config.color3}
          onChange={(e) => handleChange('color3', e.target.value)}
          style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        />
      </div>

      {/* Sliders */}
      <div>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          <span>Grain Intensity</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{config.grainIntensity.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={config.grainIntensity}
          onChange={(e) => handleChange('grainIntensity', parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          <span>Grain Size</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{config.grainSize.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={config.grainSize}
          onChange={(e) => handleChange('grainSize', parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          <span>Animation Speed</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{config.animationSpeed.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={config.animationSpeed}
          onChange={(e) => handleChange('animationSpeed', parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          <span>Noise Scale</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{config.noiseScale.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={config.noiseScale}
          onChange={(e) => handleChange('noiseScale', parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Presets */}
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          Presets
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => setConfig({
              color1: '#ff0080',
              color2: '#7928ca',
              color3: '#00dfd8',
              grainIntensity: 0.5,
              grainSize: 1.0,
              animationSpeed: 0.3,
              noiseScale: 2.0,
            })}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Neon Dreams
          </button>
          <button
            onClick={() => setConfig({
              color1: '#f093fb',
              color2: '#f5576c',
              color3: '#4facfe',
              grainIntensity: 0.3,
              grainSize: 1.5,
              animationSpeed: 0.2,
              noiseScale: 3.0,
            })}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Soft Pastels
          </button>
          <button
            onClick={() => setConfig({
              color1: '#667eea',
              color2: '#764ba2',
              color3: '#f093fb',
              grainIntensity: 0.7,
              grainSize: 0.8,
              animationSpeed: 0.5,
              noiseScale: 1.5,
            })}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Purple Haze
          </button>
        </div>
      </div>
    </div>
  )
}
