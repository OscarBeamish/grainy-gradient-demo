export default function Toolbar({ onAddShape }) {
  const shapes = [
    { type: 'sphere', icon: '●', label: 'Circle' },
    { type: 'box', icon: '■', label: 'Square' },
    { type: 'torus', icon: '◯', label: 'Ring' },
    { type: 'cone', icon: '▲', label: 'Triangle' },
    { type: 'guasha', icon: '◗', label: 'Gua Sha' },
  ]

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.5rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '0.75rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 10,
    }}>
      {shapes.map(shape => (
        <button
          key={shape.type}
          onClick={() => onAddShape(shape.type)}
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'all 0.2s',
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
          <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{shape.label}</span>
        </button>
      ))}
    </div>
  )
}
