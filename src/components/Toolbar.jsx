export default function Toolbar({ onAddShape }) {
  const shapes = [
    // Row 1
    { type: 'circle', icon: '●', label: 'Circle' },
    { type: 'blob1', icon: '～', label: 'Blob 1' },
    { type: 'ellipse-h', icon: '⬭', label: 'Ellipse' },
    { type: 'blob2', icon: '◪', label: 'Blob 2' },
    { type: 'heart', icon: '♥', label: 'Heart' },
    // Row 2
    { type: 'blob3', icon: '◕', label: 'Blob 3' },
    { type: 'blob4', icon: '◔', label: 'Blob 4' },
    { type: 'arch', icon: '⌒', label: 'Arch' },
    { type: 'circle-soft', icon: '◉', label: 'Soft' },
    { type: 'triangle-round', icon: '▴', label: 'Triangle' },
    // Row 3
    { type: 'chevron', icon: '⌄', label: 'Chevron' },
    { type: 'triangle', icon: '▲', label: 'Sharp Tri' },
    { type: 'ring', icon: '◯', label: 'Ring' },
    { type: 'sphere', icon: '◐', label: 'Sphere' },
    { type: 'pentagon', icon: '⬟', label: 'Pentagon' },
    // Row 4
    { type: 'wave', icon: '〰', label: 'Wave' },
    { type: 'rounded-rect', icon: '▢', label: 'Rectangle' },
    { type: 'wave2', icon: '≈', label: 'Wave 2' },
    { type: 'pill', icon: '▬', label: 'Pill' },
    { type: 'cone', icon: '◢', label: 'Cone' },
  ]

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gap: '0.5rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '0.75rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 10,
      maxWidth: '90vw',
    }}>
      {shapes.map(shape => (
        <button
          key={shape.type}
          onClick={() => onAddShape(shape.type)}
          style={{
            padding: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.1rem',
            transition: 'all 0.2s',
            minWidth: '50px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.3)'
            e.currentTarget.style.borderColor = '#14b8a6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
          }}
          title={`Add ${shape.label}`}
        >
          <span>{shape.icon}</span>
          <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>{shape.label}</span>
        </button>
      ))}
    </div>
  )
}
