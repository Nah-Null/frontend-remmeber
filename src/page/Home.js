import React from 'react';
import Pattern from './Pattern';

function Home() {
  return (
    <Pattern>
      <div style={{
        background: 'rgba(255,255,255,0.9)',
        padding: '2rem 3rem',
        borderRadius: '1.5rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        textAlign: 'center',
        minWidth: 320
      }}>
        <h1>Memory Game</h1>
        <p>ยินดีต้อนรับสู่เกมทดสอบความจำ!</p>
        <p>กรุณาเข้าสู่ระบบ หรือสมัครสมาชิกเพื่อเริ่มเล่นเกม</p>
      </div>
    </Pattern>
  );
}

export default Home;