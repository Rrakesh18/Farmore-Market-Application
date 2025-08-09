import React from 'react';

function AuthPageWrapper({ children }) {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 p-3">
            <div className="w-100 p-4 p-md-5 rounded-3 shadow-lg" style={{maxWidth: '450px', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
                {children}
            </div>
        </div>
    );
}
export default AuthPageWrapper;