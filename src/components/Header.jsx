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
          Grainy Gradient Shapes
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: '1.6',
          maxWidth: '800px'
        }}>
          Quick tool for creating grainy gradient backgrounds with shapes. Pick your background gradient colours, add some shapes from the toolbar, move them around, and tweak their colours. The grain effect sits on top and gives everything that nice textured feel.
        </p>
      </div>
    </header>
  )
}
