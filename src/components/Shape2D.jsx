import { useEffect, useRef } from 'react'

export default function Shape2D({ shape, isSelected, onSelect, onMouseDown }) {
  const canvasRef = useRef(null)
  const size = shape.scale * 100
  const blur = shape.blur || 40

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    // Set canvas size accounting for device pixel ratio
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Create radial gradient
    const gradient = ctx.createRadialGradient(
      size * 0.3, size * 0.3, 0,  // Inner circle at top-left
      size * 0.5, size * 0.5, size * 0.6  // Outer circle
    )

    gradient.addColorStop(0, shape.color1)
    gradient.addColorStop(1, shape.color2)

    // Draw circle with gradient
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Apply directional blur using multiple passes
    if (blur > 0) {
      applyDirectionalBlur(ctx, size, blur)
    }

  }, [size, shape.color1, shape.color2, blur])

  // Apply directional blur - more blur on bottom-right, less on top-left
  const applyDirectionalBlur = (ctx, size, blurAmount) => {
    const imageData = ctx.getImageData(0, 0, size, size)
    const blurred = stackBlurImage(imageData, size, size, blurAmount)

    // Create directional mask - blend between sharp and blurred
    const original = ctx.getImageData(0, 0, size, size)

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4

        // Calculate distance from top-left corner (0,0)
        const distX = x / size
        const distY = y / size
        const distFromTopLeft = Math.sqrt(distX * distX + distY * distY)

        // Blur factor: 0 at top-left, 1 at bottom-right
        const blurFactor = Math.min(1, distFromTopLeft * 1.2)

        // Blend between original and blurred
        blurred.data[idx] = original.data[idx] * (1 - blurFactor) + blurred.data[idx] * blurFactor
        blurred.data[idx + 1] = original.data[idx + 1] * (1 - blurFactor) + blurred.data[idx + 1] * blurFactor
        blurred.data[idx + 2] = original.data[idx + 2] * (1 - blurFactor) + blurred.data[idx + 2] * blurFactor
      }
    }

    ctx.putImageData(blurred, 0, 0)
  }

  // Stack Blur Algorithm
  const stackBlurImage = (imageData, width, height, radius) => {
    const pixels = imageData.data
    const result = new ImageData(new Uint8ClampedArray(pixels), width, height)

    if (radius < 1) return result

    // Simplified stack blur - horizontal then vertical
    stackBlurHorizontal(result.data, width, height, radius)
    stackBlurVertical(result.data, width, height, radius)

    return result
  }

  const stackBlurHorizontal = (pixels, width, height, radius) => {
    const div = 2 * radius + 1

    for (let y = 0; y < height; y++) {
      let r = 0, g = 0, b = 0, a = 0

      for (let x = -radius; x <= radius; x++) {
        const idx = (y * width + Math.max(0, Math.min(width - 1, x))) * 4
        r += pixels[idx]
        g += pixels[idx + 1]
        b += pixels[idx + 2]
        a += pixels[idx + 3]
      }

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4
        pixels[idx] = r / div
        pixels[idx + 1] = g / div
        pixels[idx + 2] = b / div
        pixels[idx + 3] = a / div

        const addIdx = (y * width + Math.min(width - 1, x + radius + 1)) * 4
        const subIdx = (y * width + Math.max(0, x - radius)) * 4

        r += pixels[addIdx] - pixels[subIdx]
        g += pixels[addIdx + 1] - pixels[subIdx + 1]
        b += pixels[addIdx + 2] - pixels[subIdx + 2]
        a += pixels[addIdx + 3] - pixels[subIdx + 3]
      }
    }
  }

  const stackBlurVertical = (pixels, width, height, radius) => {
    const div = 2 * radius + 1

    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0

      for (let y = -radius; y <= radius; y++) {
        const idx = (Math.max(0, Math.min(height - 1, y)) * width + x) * 4
        r += pixels[idx]
        g += pixels[idx + 1]
        b += pixels[idx + 2]
        a += pixels[idx + 3]
      }

      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4
        pixels[idx] = r / div
        pixels[idx + 1] = g / div
        pixels[idx + 2] = b / div
        pixels[idx + 3] = a / div

        const addIdx = (Math.min(height - 1, y + radius + 1) * width + x) * 4
        const subIdx = (Math.max(0, y - radius) * width + x) * 4

        r += pixels[addIdx] - pixels[subIdx]
        g += pixels[addIdx + 1] - pixels[subIdx + 1]
        b += pixels[addIdx + 2] - pixels[subIdx + 2]
        a += pixels[addIdx + 3] - pixels[subIdx + 3]
      }
    }
  }

  return (
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
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'move',
          opacity: shape.opacity || 0.8,
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
  )
}
