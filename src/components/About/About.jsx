import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="nosotros" className="section about">
      <div className="container">
        <div className="about-split-layout">
          <div className="about-left-panel">
            <h2 className="section-title" style={{ textAlign: 'left', color: 'white', marginBottom: '2rem' }}>Sobre mí</h2>
            <div className="about-intro-box">
              <p className="about-lead">
                Me dedico a la administración integral de consorcios en la ciudad de Mar del Plata. Mi compromiso principal es brindar tranquilidad a los propietarios e inquilinos, garantizando que el edificio funcione en óptimas condiciones.
              </p>
              <p className="about-description">
                "Entiendo que cada consorcio es único, por eso ofrezco una atención personalizada, basada en tres pilares fundamentales que definen mi gestión."
              </p>
              <div className="signature">
                Claudia D'Abundo
              </div>
            </div>
          </div>

          <div className="about-right-panel">
            <div className="value-list">
              <div className="value-list-item">
                <span className="value-number">01</span>
                <div className="value-details">
                  <h3 className="value-title">Transparencia</h3>
                  <p className="value-text">Cuentas claras, balances mensuales detallados y acceso total a la información del consorcio en todo momento.</p>
                </div>
              </div>

              <div className="value-list-item">
                <span className="value-number">02</span>
                <div className="value-details">
                  <h3 className="value-title">Eficiencia</h3>
                  <p className="value-text">Respuesta ágil a reclamos, optimización inteligente de recursos y mantenimiento preventivo continuo.</p>
                </div>
              </div>

              <div className="value-list-item">
                <span className="value-number">03</span>
                <div className="value-details">
                  <h3 className="value-title">Cercanía</h3>
                  <p className="value-text">Trato directo y cordial con los propietarios, escuchando activamente y resolviendo las necesidades del edificio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
