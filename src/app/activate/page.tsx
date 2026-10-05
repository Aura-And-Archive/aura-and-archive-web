'use client';

export default function ActivatePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#fff', backgroundColor: '#070709', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px' }}>Card Activation Portal</h1>
      <p style={{ marginTop: '12px', color: '#b0aebf' }}>Enter your card serial number to link or update your media destination.</p>
      
      <form style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '24px auto 0' }}>
        <input 
          type="text" 
          placeholder="Enter Serial Number (e.g. DEMO-GOLD-GRAFFITI)" 
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #d4af37', background: '#151412', color: '#fff' }} 
        />
        <button 
          type="submit" 
          style={{ padding: '12px', background: 'linear-gradient(135deg, #f4e6b0 0%, #d4af37 100%)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          Activate Card
        </button>
      </form>
    </div>
  );
}