import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import '../styles/ContactPage.css';
import heroKontak from '../images/herokontak.jpg';

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-hero" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${heroKontak})`}}>
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with us for your outdoor furniture needs</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Get In Touch</h2>
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <h3>Phone</h3>
              <p>+62 852-9141-3603</p>
            </div>
            <div className="contact-info-card">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <h3>Email</h3>
              <p>atigamebel@gmail.com</p>
            </div>
            <div className="contact-info-card">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <h3>Address</h3>
              <p>Jepara, Central Java, Indonesia</p>
            </div>
            <div className="contact-info-card">
              <FontAwesomeIcon icon={faClock} className="contact-icon" />
              <h3>Business Hours</h3>
              <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Our Location</h2>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9081986498104!2d110.69828287463035!3d-6.533277493459465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711977865d2337%3A0x771a193ab2a8ce46!2stoko%20aan%2Findah%20jati%20meubel!5e0!3m2!1sen!2sid!4v1752900981308!5m2!1sen!2sid"
              width="100%" 
              height="400" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              title="Atiga Meubel Location Map"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        <div className="social-section">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://wa.me/6285291413603" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>WhatsApp</span>
            </a>
            <a href="https://www.instagram.com/atiga_meubel?igsh=MTg3dXpwbzE3Y2syOA==" className="social-link instagram" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
              <span>Instagram</span>
            </a>
            <a href="https://www.facebook.com/share/19u3Swc2UX/" className="social-link facebook" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 