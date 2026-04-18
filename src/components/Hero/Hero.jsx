import React from 'react';
import './Hero.css';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text-box glass">
          <h1 className="hero-title">
            Administración de Consorcios<br />
            <span className="highlight">Profesional y Transparente</span>
          </h1>
          <p className="hero-subtitle">
            Gestión integral, eficiente y cercana en Mar del Plata. Me ocupo de tu edificio para que vivas con tranquilidad.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn btn-primary hero-btn">
              <FaFileInvoiceDollar className="btn-icon" />
              Consultar Facturación
            </a>
            <a href="#servicios" className="btn btn-outline hero-btn">
              Mis Servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
