import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logoImage from '../../images/atigalogo.png';
import '../layout/FooterSimple.css';

function FooterSimple() {
  return (
    <footer className="footer-simple">
      <div className="footer-simple-socials">
        <a href="https://wa.me/6285291413603" target="_blank" rel="noopener noreferrer" className="footer-simple-social-icon">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a href="https://www.instagram.com/atiga_meubel?igsh=MTg3dXpwbzE3Y2syOA==" className="footer-simple-social-icon" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.facebook.com/share/19u3Swc2UX/" className="footer-simple-social-icon" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
      </div>
      <div className="footer-simple-desc">
        Atiga Meubel berkomitmen menghadirkan furniture outdoor berkualitas, desain elegan, dan harga terbaik. Kami melayani pemesanan custom, grosir, dan pengiriman ke seluruh Indonesia.
      </div>
      <div className="footer-simple-logo">
        <img src={logoImage} alt="CACAM Furniture Logo" />
      </div>
      <div className="footer-simple-bottom">
        <span>Jepara, Indonesia</span>
        <span style={{margin:'0 8px'}}>|</span>
        <span>&copy; {new Date().getFullYear()} Atiga Meubel</span>
      </div>
    </footer>
  );
}

export default FooterSimple; 