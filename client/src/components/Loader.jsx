import React from 'react';

const Loader = () => (
  <div className="loader">
    <svg viewBox="-25 -25 100 100" preserveAspectRatio>
      <circle fill="#fff" stroke="none" cx="6" cy="25" r="6">
        <animateTransform 
          attributeName="transform" 
          dur="1s" 
          type="translate" 
          values="0 15 ; 0 -15; 0 15" 
          repeatCount="indefinite" 
          begin="0.1"/>
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"/>  
      </circle>
      <circle fill="#fff" stroke="none" cx="30" cy="25" r="6">
        <animateTransform 
          attributeName="transform" 
          dur="1s" 
          type="translate" 
          values="0 10 ; 0 -10; 0 10" 
          repeatCount="indefinite" 
          begin="0.2"/>
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite" 
          begin="0.2"/>  
      </circle>
      <circle fill="#fff" stroke="none" cx="54" cy="25" r="6">
        <animateTransform 
          attributeName="transform" 
          dur="1s" 
          type="translate" 
          values="0 5 ; 0 -5; 0 5" 
          repeatCount="indefinite" 
          begin="0.3"/>
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite" 
          begin="0.3"/>
      </circle>
    </svg>
  </div>
);

export default Loader;