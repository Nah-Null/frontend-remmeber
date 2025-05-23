import React, { useEffect, useState } from 'react';
import Pattern from './Pattern';
import { useLocation } from 'react-router-dom';

function Home() {

  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // รับ userId จาก state ที่ส่งมาจากหน้า login
    const userId = location.state?.userId;

    if (userId) {
      fetch('http://localhost:8080/getuserbyid/' + userId)
        .then(res => res.json())
        .then(data => setUser(data))
        
        .catch(error => {
          console.error('Error fetching user data:', error);
          setUser(null);
        });
    }
  }, [location.state]);

  const username = user ? user.username : '';


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
        <h1>Remember Me</h1>
        {username && <h2>สวัสดีคุณ {username}</h2>}
        <p>ยินดีต้อนรับสู่การบันทึกความทรงจำของคุณ!</p>
      </div>
    </Pattern>
  );
}

export default Home;