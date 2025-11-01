export default function Shape2D({ shape, isSelected, onSelect }) {
  const getShapeStyle = (isBlurred = false) => {
    const baseStyle = {
      position: 'absolute',
      left: isBlurred ? '50%' : '50%',
      top: isBlurred ? '50%' : '50%',
      transform: 'translate(-50%, -50%)',
      width: `${shape.scale * 100}px`,
      height: `${shape.scale * 100}px`,
      background: `linear-gradient(${shape.gradientDirection < 0.33 ? '90deg' : shape.gradientDirection < 0.66 ? '180deg' : '135deg'}, ${shape.color1}, ${shape.color2})`,
      filter: isBlurred ? `blur(${shape.blur || 40}px)` : 'none',
      opacity: shape.opacity || 0.8,
      cursor: isBlurred ? 'default' : 'pointer',
      mixBlendMode: 'normal',
      pointerEvents: isBlurred ? 'none' : 'auto',
    }

    // Add border for selection
    if (isSelected) {
      baseStyle.outline = '2px solid #14b8a6'
      baseStyle.outlineOffset = '4px'
    }

    // Shape-specific styles based on reference image
    switch (shape.type) {
      // Row 1
      case 'circle':
        return { ...baseStyle, borderRadius: '50%' }
      case 'blob1':
        return { ...baseStyle, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }
      case 'ellipse-h':
        return { ...baseStyle, borderRadius: '50%', width: `${shape.scale * 150}px` }
      case 'blob2':
        return { ...baseStyle, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
      case 'heart':
        return { ...baseStyle, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', clipPath: 'polygon(50% 80%, 100% 40%, 100% 20%, 80% 0%, 50% 20%, 20% 0%, 0% 20%, 0% 40%)' }

      // Row 2
      case 'blob3':
        return { ...baseStyle, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', width: `${shape.scale * 140}px`, height: `${shape.scale * 80}px` }
      case 'blob4':
        return { ...baseStyle, borderRadius: '50% 50% 40% 60% / 30% 70% 60% 40%', width: `${shape.scale * 120}px`, height: `${shape.scale * 70}px` }
      case 'arch':
        return { ...baseStyle, borderRadius: '50% 50% 0% 0%' }
      case 'circle-soft':
        return { ...baseStyle, borderRadius: '50%', filter: `blur(${(shape.blur || 40) * 1.5}px)` }
      case 'triangle-round':
        return { ...baseStyle, borderRadius: '10%', clipPath: 'polygon(50% 10%, 90% 90%, 10% 90%)' }

      // Row 3
      case 'chevron':
        return { ...baseStyle, borderRadius: '20%', clipPath: 'polygon(0% 0%, 50% 40%, 100% 0%, 90% 100%, 50% 60%, 10% 100%)' }
      case 'triangle':
        return { ...baseStyle, borderRadius: '0%', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }
      case 'ring':
        return {
          ...baseStyle,
          borderRadius: '50%',
          background: `radial-gradient(circle at center, transparent 35%, ${shape.color1} 40%, ${shape.color2} 100%)`,
        }
      case 'sphere':
        return {
          ...baseStyle,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${shape.color1}, ${shape.color2})`,
        }
      case 'pentagon':
        return { ...baseStyle, borderRadius: '0%', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }

      // Row 4
      case 'wave':
        return { ...baseStyle, borderRadius: '50% 50% 30% 70% / 30% 70% 50% 50%', width: `${shape.scale * 130}px`, height: `${shape.scale * 70}px` }
      case 'rounded-rect':
        return { ...baseStyle, borderRadius: '20%', width: `${shape.scale * 90}px`, height: `${shape.scale * 80}px` }
      case 'wave2':
        return { ...baseStyle, borderRadius: '60% 40% 40% 60% / 70% 70% 30% 30%', width: `${shape.scale * 120}px`, height: `${shape.scale * 50}px` }
      case 'pill':
        return { ...baseStyle, borderRadius: '50px', width: `${shape.scale * 140}px`, height: `${shape.scale * 60}px` }
      case 'cone':
        return { ...baseStyle, borderRadius: '0% 0% 50% 50%', clipPath: 'polygon(50% 0%, 80% 100%, 20% 100%)' }

      default:
        return { ...baseStyle, borderRadius: '50%' }
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% + ${shape.position.x * 80}px)`,
        top: `calc(50% + ${shape.position.y * 80}px)`,
        transform: `translate(-50%, -50%) rotate(${shape.rotation.z}rad)`,
      }}
    >
      {/* Blurred shadow layer - offset to one side */}
      <div
        style={{
          ...getShapeStyle(true),
          left: '52%',
          top: '52%',
        }}
      />

      {/* Sharp gradient layer on top - uses mask to fade one edge */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        style={{
          ...getShapeStyle(false),
          WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  )
}
