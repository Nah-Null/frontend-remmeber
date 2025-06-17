import React, { useEffect, useState } from 'react';
import Pattern from './Pattern';
import { useLocation, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate

function Home() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
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

  const handleAdd = () => {
    navigate('/management');
    localStorage.setItem('username', username);
    console.log('Username saved to localStorage:', username);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login', { replace: true }); // เปลี่ยนเส้นทางและลบประวัติ
};

  return (
    <Pattern>
      <div style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        zIndex: 10
      }}>
        <button 
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#1976d2',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>

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
        <p>กดปุ่ม ADD เพื่อเพิ่มความทรงจำของคุณกัน</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        background: '#e53935',
                        color: 'white',
                        border: 'none',
                        borderRadius: '1rem',
                        padding: '0.4rem 1.2rem',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ออกจากระบบ
                </button>
            </div>
      </div>
    </Pattern>
  );
}

export default Home;