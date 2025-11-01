export default function Shape2D({ shape, isSelected, onSelect }) {
  const getShapeStyle = () => {
    const baseStyle = {
      position: 'absolute',
      left: `calc(50% + ${shape.position.x * 80}px)`,
      top: `calc(50% + ${shape.position.y * 80}px)`,
      transform: `translate(-50%, -50%) rotate(${shape.rotation.z}rad)`,
      width: `${shape.scale * 100}px`,
      height: `${shape.scale * 100}px`,
      background: `linear-gradient(${shape.gradientDirection < 0.33 ? '90deg' : shape.gradientDirection < 0.66 ? '180deg' : '135deg'}, ${shape.color1}, ${shape.color2})`,
      filter: `blur(${shape.blur || 40}px)`,
      opacity: shape.opacity || 0.8,
      cursor: 'pointer',
      mixBlendMode: 'normal',
      transition: 'filter 0.2s ease',
    }

    // Add border for selection
    if (isSelected) {
      baseStyle.outline = '2px solid #14b8a6'
      baseStyle.outlineOffset = '4px'
    }

    // Shape-specific styles
    switch (shape.type) {
      case 'sphere':
        return { ...baseStyle, borderRadius: '50%' }
      case 'box':
        return { ...baseStyle, borderRadius: '10%' }
      case 'torus':
        return {
          ...baseStyle,
          borderRadius: '50%',
          background: `radial-gradient(circle at center, transparent 30%, ${shape.color1} 40%, ${shape.color2} 100%)`,
        }
      case 'cone':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: '0'
        }
      case 'guasha':
        return {
          ...baseStyle,
          borderRadius: '50% 50% 30% 30%',
          height: `${shape.scale * 120}px`,
        }
      default:
        return { ...baseStyle, borderRadius: '50%' }
    }
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      style={getShapeStyle()}
    />
  )
}
