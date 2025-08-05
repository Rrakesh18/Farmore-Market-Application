import React from 'react';

function Marquee({ text }) {
    return (
        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} className="text-white small fw-semibold overflow-hidden whitespace-nowrap position-relative">
            <span className="d-inline-block animate-marquee py-1">{text}</span>
        </div>
    );
}
export default Marquee;