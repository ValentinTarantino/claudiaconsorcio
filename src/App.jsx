import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';
import './App.css';

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <FloatingWhatsApp />

      <footer className="footer-modern">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <h3 className="footer-logo">Claudia D'Abundo</h3>
              <p className="footer-slogan">
                Administración integral de consorcios en Mar del Plata. Mi prioridad es brindar transparencia, eficiencia y tranquilidad a su edificio.
              </p>
            </div>
            <div className="footer-links-col">
              <h4>Navegación</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#nosotros">Sobre mí</a></li>
                <li><a href="#">Facturas</a></li>
              </ul>
            </div>
            <div className="footer-contact-col">
              <div className="footer-contact-group">
                <h4>Contacto</h4>
                <ul>
                  <li><a href="mailto:dabundoclaudia@gmail.com">Email: dabundoclaudia@gmail.com</a></li>
                  <li><a href="https://wa.me/542235630381" target="_blank" rel="noopener noreferrer">WhatsApp: +54 223 563-0381</a></li>
                </ul>
              </div>
              <div className="footer-contact-group" style={{ marginTop: '2rem' }}>
                <h4>Ubicación</h4>
                <ul>
                  <li>Acha 325 2 "B" Mar del Plata</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom-line">
            Hecho para la excelencia en gestión de consorcios.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
