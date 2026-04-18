import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['inicio', 'servicios', 'nosotros', 'contacto'];
      const scrollPosition = window.scrollY + 150;

      let currentSection = 'inicio';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className={`header ${isScrolled ? 'scrolled glass' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="container header-content">
        <a href="#inicio" className="logo" aria-label="Volver al inicio">
          <span className="logo-name">Claudia D'Abundo</span>
          <span className="logo-subtitle">Administración de Consorcios</span>
        </a>

        <div 
          className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          role="button"
          tabIndex="0"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active glass' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#inicio" className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#servicios" className={`nav-link ${activeSection === 'servicios' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Servicios</a>
            </li>
            <li className="nav-item">
              <a href="#nosotros" className={`nav-link ${activeSection === 'nosotros' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Sobre Mí</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link facturas-link" onClick={() => setMobileMenuOpen(false)}>Facturas</a>
            </li>
            <li className="nav-item">
              <a href="#contacto" className={`nav-link ${activeSection === 'contacto' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
