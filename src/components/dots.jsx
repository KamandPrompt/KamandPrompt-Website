import React from 'react';

const DottedBackground = () => {
  return (
    <div className="relative w-full h-screen bg-transparent">
      <div className="absolute inset-0 grid" 
        style={{
          backgroundImage: 'radial-gradient(circle, #eeeeee 2px, transparent 2px)',
          backgroundSize: '32px 32px',
          opacity: 0.3
        }}>
      </div>
    </div>
  );
};

export default DottedBackground;