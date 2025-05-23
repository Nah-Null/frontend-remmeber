import React, { useState } from 'react';
import Pattern from './Pattern';

function Management() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    // ปุ่มเดียวสำหรับทั้งอัพโหลดและส่งข้อความ
    const handleSubmit = async () => {
        let sent = false;

        // อัพโหลดไฟล์ถ้ามี
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            sent = true;
        }

        // ส่งข้อความ (ตัวอย่าง: alert)
        if (message.trim()) {
            alert('ส่งข้อความ: ' + message);
            sent = true;
        }

        if (sent) {
            alert('ส่งข้อมูลสำเร็จ!');
        }

        // รีเซ็ตค่า
        setSelectedFile(null);
        setPreviewUrl(null);
        setMessage('');
    };

    return (
        <Pattern>
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    padding: '2rem 1rem',
                    borderRadius: '2rem',
                    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    width: '95%',
                    margin: '5vh auto',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#333' }}>
                    มาเพิ่มความทรงจำของคุณเก็บไว้ในนี้กันเถอะ
                </h3>

                <div style={{ marginBottom: '2rem' }}>
                    <label
                        style={{
                            display: 'block',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            textAlign: 'left',
                        }}
                    >
                        อัพโหลดรูปของคุณตรงนี้
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                            marginBottom: '1rem',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    />
                    {previewUrl && (
                        <div>
                            <img
                                src={previewUrl}
                                alt="preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: 250,
                                    borderRadius: '1rem',
                                    marginTop: '1rem',
                                }}
                            />
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <textarea
                        rows={4}
                        style={{
                            width: '100%',
                            borderRadius: '1rem',
                            padding: '1rem',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box',
                        }}
                        placeholder="เขียนข้อความความทรงจำของคุณที่นี่..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!message.trim() && !selectedFile}
                        style={{
                            marginTop: '1rem',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            padding: '0.6rem 1.5rem',
                            borderRadius: '1rem',
                            cursor: (message.trim() || selectedFile) ? 'pointer' : 'not-allowed',
                            opacity: (message.trim() || selectedFile) ? 1 : 0.5,
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        📤 ส่งความทรงจำ
                    </button>
                </div>
            </div>
        </Pattern>
    );
}

export default Management;
