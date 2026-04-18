import React, { useState, useEffect } from 'react';
import './FloatingWhatsApp.css';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`floating-wa ${isVisible ? 'visible' : ''}`}>
      <a
        href="https://wa.me/542235630381"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="floating-wa-btn"
      >
        <FaWhatsapp />
      </a>
      <span className="tooltip-text">¡Contactanos!</span>
    </div>
  );
};

export default FloatingWhatsApp;
