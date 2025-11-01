export default function Shape2D({ shape, isSelected, onSelect, onMouseDown }) {
  const size = shape.scale * 100
  const blur = shape.blur || 40

  // Calculate how much to extend the gradient based on blur
  const blurExtent = blur * 2

  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% + ${shape.position.x * 80}px)`,
        top: `calc(50% + ${shape.position.y * 80}px)`,
        transform: `translate(-50%, -50%) rotate(${shape.rotation.z}rad)`,
        width: `${size + blurExtent}px`,
        height: `${size + blurExtent}px`,
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
      {/* Single element with blur - gradient creates circular shape that fades to transparent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // Gradient positioned at top-left, fades to transparent so blur can extend
          background: `radial-gradient(circle at 35% 35%,
            ${shape.color1} 0%,
            ${shape.color2} ${30 - blur/10}%,
            ${shape.color2}88 ${50 - blur/5}%,
            transparent ${70 - blur/3}%)`,
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
            top: `${blurExtent/2 - 4}px`,
            left: `${blurExtent/2 - 4}px`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            border: '2px solid #14b8a6',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
