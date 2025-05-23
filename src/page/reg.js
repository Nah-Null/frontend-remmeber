import React, { useState } from 'react';
import './css/reg.css';
import Pattern from './Pattern';
import Loading from './Londing';
import { useNavigate } from 'react-router-dom';


function Reg() {
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // เพิ่ม state loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // เริ่มโหลด
    if (isLogin) {
      // ดึงข้อมูลผู้ใช้ทั้งหมดจาก API
      try {
        const res = await fetch('http://localhost:8080/alluser');
        if (!res.ok) {
          setError('ไม่สามารถเชื่อมต่อ API ได้');
          setLoading(false);
          return;
        }
        const users = await res.json();
        // ตรวจสอบ username และ password
        const found = users.find(
          (u) => u.username === username && u.password === password
        );
        if (found) {
          setError('');
          setUsername('');
          setPassword('');
          setEmail('');
          navigator('/home', { state: { userId: found.id } }); // ส่ง userId ไปหน้า Home
          setLoading(false);
          return;
        } else {
          setError('Username หรือ Password ไม่ถูกต้อง');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + err.message);
      }
      setLoading(false); // หยุดโหลด
    } else {
      // สมัครสมาชิก ส่งข้อมูลไป API
      if (username && password && email) {
        try {
          const res = await fetch('http://localhost:8080/adduser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
          });
          if (res.ok) {
            setError('');
            setIsLogin(true);
            setUsername('');
            setPassword('');
            setEmail('');
          } else {
            setError('สมัครสมาชิกไม่สำเร็จ');
          }
        } catch (err) {
          setError('เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + err.message);
        }
        setLoading(false); // หยุดโหลด
      } else {
        setError('กรุณากรอกข้อมูลให้ครบถ้วน');
        setLoading(false); // หยุดโหลด
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Pattern>
      <div className="App">
        <header className="App-header" style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="reg-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="reg-input"
            />
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="reg-input"
                autoComplete="email"
                required
              />
            )}
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          </form>
          <button
            style={{
              marginTop: 16,
              background: 'none',
              border: 'none',
              color: '#000000',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '1rem'
            }}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setUsername('');
              setPassword('');
              setEmail('');
            }}
          >
            {isLogin ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีแล้ว? เข้าสู่ระบบ'}
          </button>
        </header>
      </div>
    </Pattern>
  );
}

export default Reg;
