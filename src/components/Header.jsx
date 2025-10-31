export default function Header() {
  return (
    <header style={{
      padding: '1.5rem 2rem',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: '#fff'
        }}>
          Grainy Gradient Textures
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: '1.6',
          maxWidth: '800px'
        }}>
          Been playing around with grainy gradients in React Three Fiber. They've got this nice organic feel that flat gradients just don't have - adds a bit of texture and depth without being over the top. The grain effect is done with shader noise, so it's all GPU-accelerated and runs smooth. Tweak the controls on the right to see how different settings change the look.
        </p>
      </div>
    </header>
  )
}
