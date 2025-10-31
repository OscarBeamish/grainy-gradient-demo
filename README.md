# Grainy Gradient Shapes

Interactive 3D shapes with custom gradients and grain texture overlay. Built with React Three Fiber.

## What's This?

Been experimenting with 3D shapes and gradient textures. You can add different shapes, position them, rotate them, and apply custom gradients. The grain effect sits on top and gives everything a nice textured feel. All GPU-accelerated with Three.js shaders.

## Features

- **Add Multiple Shapes**: Sphere, box, torus, and cone
- **Full 3D Control**: Position (X, Y, Z), rotation, and scale
- **Auto-Rotate**: Optional auto-rotation with customizable speed per axis
- **Custom Gradients**: Two-color gradients with direction (horizontal, vertical, diagonal) and spread controls
- **Grain Overlay**: Adjustable grain intensity and size
- **Interactive**: Click shapes to select and edit them
- **Real-time**: All changes update instantly

## Tech Stack

- React 18
- Three.js + React Three Fiber
- Custom GLSL shaders
- Vite

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## How to Use

1. **Add Shapes**: Click "+ Add Shape" button
2. **Select Shape**: Click on a shape in the canvas or the shape list
3. **Edit Properties**:
   - Type: Choose between sphere, box, torus, cone
   - Scale: Adjust size
   - Position: Move along X, Y, Z axes
   - Rotation: Manual rotation angles
   - Auto Rotate: Enable automatic rotation with speed controls
   - Gradients: Pick two colors, direction, and spread
4. **Grain Effect**: Adjust intensity and size
5. **Delete**: Remove selected shapes

## Controls

### Shape Properties
- **Type**: Sphere, Box, Torus, or Cone
- **Scale**: 0.5 - 3.0
- **Position**: X, Y, Z from -5 to 5
- **Rotation**: X, Y, Z angles (0 to 2π)
- **Auto Rotate**: Toggle + speed per axis
- **Gradient Color 1 & 2**: Custom colors
- **Gradient Direction**: Horizontal, Vertical, or Diagonal
- **Gradient Spread**: 0.5 - 3.0 (controls how colors blend)

### Grain Effect
- **Intensity**: 0 - 1.0
- **Size**: 0.1 - 3.0

## Deployment

Ready to deploy to Netlify or Vercel:

```bash
npm run build
```

The `dist` folder contains the production build.

## License

MIT - Do what you want with it
