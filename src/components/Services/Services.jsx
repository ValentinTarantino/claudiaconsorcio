import React from 'react';
import './Services.css';
import { FaFileInvoiceDollar, FaWrench, FaUserFriends, FaClipboardCheck, FaShieldAlt, FaBuilding } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    icon: <FaFileInvoiceDollar />,
    title: 'Gestión Administrativa y Financiera',
    description: 'Liquidación de expensas, control de morosidad, pago a proveedores y balances mensuales transparentes.',
  },
  {
    id: 2,
    icon: <FaWrench />,
    title: 'Coordinación de Mantenimiento',
    description: 'Resolución ágil de reclamos, mantenimiento preventivo y trato con gremios especializados y de confianza.',
  },
  {
    id: 3,
    icon: <FaUserFriends />,
    title: 'Atención Personalizada',
    description: 'Comunicación fluida con propietarios e inquilinos, respuesta rápida a inquietudes y mediación en conflictos.',
  },
  {
    id: 4,
    icon: <FaClipboardCheck />,
    title: 'Asesoramiento Legal y Técnico',
    description: 'Cumplimiento de normativas vigentes, libros obligatorios al día y asambleas claras y resolutivas.',
  },
  {
    id: 5,
    icon: <FaShieldAlt />,
    title: 'Seguridad y Control',
    description: 'Supervisión de sistemas de seguridad, control de accesos y gestión eficiente del personal del edificio.',
  },
  {
    id: 6,
    icon: <FaBuilding />,
    title: 'Puesta en Valor del Edificio',
    description: 'Planificación y seguimiento de obras de mejora para modernizar, embellecer y aumentar el valor de mercado de su propiedad.',
  }
];

const Services = () => {
  return (
    <section id="servicios" className="section services">
      <div className="container">
        <h2 className="section-title">Mis Servicios</h2>
        <p className="section-subtitle">
          Ofrezco una administración integral enfocada en la transparencia, la eficiencia y la revalorización de su propiedad.
        </p>

        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
