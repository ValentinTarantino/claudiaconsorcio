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

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Ubicación</h4>
                <p>Acha 325 2 "B"</p>
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

          <div className="map-container-side">
            <iframe
              src="https://maps.google.com/maps?q=Acha%20325,%20Mar%20del%20Plata,%20Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--border-radius-md)', minHeight: '400px', boxShadow: 'var(--shadow-sm)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación Acha 325"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
