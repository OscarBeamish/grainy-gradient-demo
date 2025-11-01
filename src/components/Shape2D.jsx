import { useMemo } from 'react'

export default function Shape2D({ shape, isSelected, onSelect, onMouseDown }) {
  const filterId = useMemo(() => `blur-filter-${shape.id}`, [shape.id])
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

    // Make container larger to accommodate blur spread
    const blurPadding = (shape.blur || 40) * 3

    const baseStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: `${shape.scale * 100 + blurPadding * 2}px`,
      height: `${shape.scale * 100 + blurPadding * 2}px`,
      // Gradient with transparency at edges so blur can fade to background - centered at top-left for directional effect
      background: `radial-gradient(circle at 30% 30%, ${shape.color1} 0%, ${shape.color2} 20%, rgba(${color2Rgb.r},${color2Rgb.g},${color2Rgb.b},0.8) 30%, rgba(${color2Rgb.r},${color2Rgb.g},${color2Rgb.b},0) 45%)`,
      filter: isBlurred ? `blur(${(shape.blur || 40) * 12}px)` : 'blur(0px)',
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
        return baseStyle // No borderRadius - gradient creates the circle
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

  const size = shape.scale * 100
  const maxBlur = shape.blur || 40

  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(50% + ${shape.position.x * 80}px)`,
        top: `calc(50% + ${shape.position.y * 80}px)`,
        transform: `translate(-50%, -50%) rotate(${shape.rotation.z}rad)`,
        width: `${size * 3}px`,
        height: `${size * 3}px`,
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
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size * 3} ${size * 3}`}
        style={{ cursor: 'move' }}
      >
        <defs>
          {/* Radial gradient for the circle colors */}
          <radialGradient id={`gradient-${shape.id}`} cx="40%" cy="40%">
            <stop offset="0%" stopColor={shape.color1} />
            <stop offset="100%" stopColor={shape.color2} />
          </radialGradient>

          {/* Variable blur filter using feGaussianBlur */}
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            {/* Create blur map - less blur at top-left, more at bottom-right */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={maxBlur} result="blur" />

            {/* Sharp version */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="sharp" />

            {/* Blend between sharp and blurred using displacement */}
            <feImage href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3CradialGradient id='blurMask' cx='30%25' cy='30%25'%3E%3Cstop offset='0%25' stop-color='white'/%3E%3Cstop offset='40%25' stop-color='%23888'/%3E%3Cstop offset='100%25' stop-color='black'/%3E%3C/radialGradient%3E%3Crect width='100%25' height='100%25' fill='url(%23blurMask)'/%3E%3C/svg%3E" result="blurMask" />

            <feComposite in="sharp" in2="blurMask" operator="in" result="sharpMasked" />
            <feComposite in="blur" in2="blurMask" operator="out" result="blurMasked" />
            <feMerge>
              <feMergeNode in="blurMasked" />
              <feMergeNode in="sharpMasked" />
            </feMerge>
          </filter>
        </defs>

        {/* The circle with variable blur */}
        <circle
          cx={size * 1.5}
          cy={size * 1.5}
          r={size / 2}
          fill={`url(#gradient-${shape.id})`}
          filter={`url(#${filterId})`}
          opacity={shape.opacity || 0.8}
        />
      </svg>

      {/* Selection indicator */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
