import React from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contacto" className="section contact">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">
          Estoy a su disposición para cualquier consulta. Conversemos y les proporcionare el asesoramiento que su consorcio necesita.
        </p>

        <div className="contact-grid">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Ubicación</h4>
              <p>Acha 325 2 "B"</p>
              <p>(Sin oficina física)</p>
              <p>Mar del Plata, Argentina</p>
            </div>
          </div>

          <div className="info-card">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h4>Teléfono / WhatsApp</h4>
              <p>+54 223 563-0381</p>
            </div>
          </div>

          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email</h4>
              <p>dabundoclaudia@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
