import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import GrainyGradient from './components/GrainyGradient'
import Controls from './components/Controls'
import Header from './components/Header'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    color1: '#ff0080',
    color2: '#7928ca',
    color3: '#00dfd8',
    grainIntensity: 0.5,
    grainSize: 1.0,
    animationSpeed: 0.3,
    noiseScale: 2.0,
  })

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Canvas Section */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <GrainyGradient config={config} />
          </Canvas>
        </div>

        {/* Controls Panel */}
        <Controls config={config} setConfig={setConfig} />
      </div>
    </div>
  )
}

export default App
