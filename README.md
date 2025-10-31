# Grainy Gradient Textures

Interactive grainy gradient texture demo built with React Three Fiber. Play around with shader-based gradients that have a nice organic, textured feel.

## What's This?

Been experimenting with grainy gradients - they've got this subtle texture that makes them feel more natural than flat gradients. The grain effect is all done with GPU shaders using simplex noise, so it runs smooth even with the animations.

## Features

- Live gradient editor with color pickers
- Adjustable grain intensity and size
- Animated gradient flow
- Three preset styles to get started
- Fully interactive 3D canvas (drag to rotate)

## Tech Stack

- React 18
- Three.js + React Three Fiber
- Vite
- Custom GLSL shaders

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Controls

- **Colors**: Pick three colors to blend together
- **Grain Intensity**: How visible the texture grain is
- **Grain Size**: Size of the grain particles
- **Animation Speed**: How fast the gradient flows
- **Noise Scale**: Scale of the gradient noise pattern

## Deployment

Built and ready to deploy to Netlify or Vercel:

```bash
npm run build
```

The `dist` folder contains the production build.

## License

MIT - Do what you want with it
