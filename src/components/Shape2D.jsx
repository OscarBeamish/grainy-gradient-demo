export default function Shape2D({ shape, isSelected, onSelect, onMouseDown }) {
  const size = shape.scale * 100
  const blur = shape.blur || 40

  return (
    <>
      {/* Wrapper for positioning */}
      <div
        style={{
          position: 'absolute',
          left: `calc(50% + ${shape.position.x * 80}px)`,
          top: `calc(50% + ${shape.position.y * 80}px)`,
          transform: `translate(-50%, -50%) rotate(${shape.rotation.z}rad)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
          onMouseDown(e)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        {/* The actual circle with gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${shape.color1} 0%, ${shape.color2} 100%)`,
            filter: `blur(${blur}px)`,
            opacity: shape.opacity || 0.8,
            cursor: 'move',
          }}
        />

        {/* Selection outline */}
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              right: '-4px',
              bottom: '-4px',
              borderRadius: '50%',
              border: '2px solid #14b8a6',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </>
  )
}
