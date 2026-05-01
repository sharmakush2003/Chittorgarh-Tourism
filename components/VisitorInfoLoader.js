"use client";
import dynamic from 'next/dynamic';

const LoadingScreen = () => (
    <div style={{ 
        height: '100vh', 
        background: '#000', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '1rem'
    }}>
        <div className="v-hub-loader"></div>
        <span style={{ color: '#D4AF37', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>CHITTORGARH TOURISM</span>
        <style dangerouslySetInnerHTML={{ __html: `
            .v-hub-loader {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(212, 175, 55, 0.1);
                border-top-color: #D4AF37;
                border-radius: 50%;
                animation: v-hub-spin 0.8s linear infinite;
            }
            @keyframes v-hub-spin { to { transform: rotate(360deg); } }
        `}} />
    </div>
);

const VisitorInfoClient = dynamic(() => import("./VisitorInfoClient"), { 
    ssr: false,
    loading: () => <LoadingScreen />
});

export default function VisitorInfoLoader() {
    return <VisitorInfoClient />;
}
