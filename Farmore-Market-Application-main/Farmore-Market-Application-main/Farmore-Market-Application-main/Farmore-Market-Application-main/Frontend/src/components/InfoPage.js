import React from 'react';

function InfoPage({ title, children }) {
    return (
        <div className="p-4 p-md-5 rounded-3 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
            <h2 className="display-5 fw-bold mb-4 border-bottom pb-3">{title}</h2>
            <div className="fs-5">
                {children}
            </div>
        </div>
    );
}
export default InfoPage;