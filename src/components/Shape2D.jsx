export default function Shape2D({ shape, isSelected, onSelect, onMouseDown }) {
  const getShapeStyle = (isBlurred = false) => {
    // Convert hex colors to rgba for transparency control
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const color1Rgb = hexToRgb(shape.color1)
    const color2Rgb = hexToRgb(shape.color2)

    const baseStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: `${shape.scale * 100}px`,
      height: `${shape.scale * 100}px`,
      // Use radial gradient with alpha for smooth fade to transparent
      background: isBlurred
        ? `radial-gradient(ellipse 150% 150% at 20% 20%, rgba(${color1Rgb.r},${color1Rgb.g},${color1Rgb.b},0.95) 0%, rgba(${color2Rgb.r},${color2Rgb.g},${color2Rgb.b},0.8) 25%, rgba(${color2Rgb.r},${color2Rgb.g},${color2Rgb.b},0.4) 45%, rgba(${color2Rgb.r},${color2Rgb.g},${color2Rgb.b},0) 65%)`
        : `radial-gradient(ellipse 120% 120% at 15% 15%, ${shape.color1} 0%, ${shape.color2} 30%, transparent 60%)`,
      filter: isBlurred ? `blur(${(shape.blur || 40) * 5}px)` : 'blur(0px)',
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
      {/* Extremely blurred background layer */}
      <div
        style={{
          ...getShapeStyle(true),
        }}
      />

      {/* Less blurred foreground layer - creates layered blur effect */}
      <div
        onMouseDown={(e) => {
          e.stopPropagation()
          onMouseDown(e)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        style={{
          ...getShapeStyle(false),
          cursor: 'move',
        }}
      />
    </div>
  )
}
