import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt, faTruck, faCheckCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../styles/InfoOrderPage.css';
import heroIp from '../images/heroip.jpg';

const steps = [
  { icon: faCheckCircle, title: 'Pilih Produk', desc: 'Pilih produk yang diinginkan dari halaman produk.' },
  { icon: faWhatsapp, title: 'Hubungi Admin', desc: 'Klik tombol WhatsApp di produk atau chat admin untuk konsultasi, tanya stok, atau custom order.' },
  { icon: faMoneyCheckAlt, title: 'Pembayaran', desc: 'Lakukan pembayaran sesuai instruksi admin.' },
  { icon: faCheckCircle, title: 'Konfirmasi', desc: 'Konfirmasi pembayaran ke admin via WhatsApp.' },
  { icon: faTruck, title: 'Pengiriman', desc: 'Produk diproses & dikirim ke alamat Anda.' }
];

function InfoOrderPage() {
  return (
    <div className="infoorder-page">
      <div className="infoorder-hero" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${heroIp})`}}>
        <h1 className="infoorder-title">Info Pemesanan</h1>
        <p className="infoorder-subtitle">Panduan lengkap cara memesan produk furniture outdoor di toko kami</p>
      </div>
      <div className="infoorder-content">
        <section className="infoorder-section">
          <h2>Langkah Pemesanan</h2>
          <div className="infoorder-steps-bar">
            {steps.map((step, idx) => (
              <div className="infoorder-step" key={step.title}>
                <div className="infoorder-step-icon"><FontAwesomeIcon icon={step.icon} /></div>
                <div className="infoorder-step-title">{step.title}</div>
                <div className="infoorder-step-desc">{step.desc}</div>
                {idx < steps.length-1 && <div className="infoorder-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </section>
        <div className="infoorder-card-grid">
          <div className="infoorder-card">
            <div className="infoorder-card-icon"><FontAwesomeIcon icon={faMoneyCheckAlt} /></div>
            <h3>Pembayaran</h3>
            <ul>
              <li><b>Bank BCA</b> a.n. Yayuk Indah Ariyanti - <b>2470389349</b></li>
              <li><b>Bank BRI</b> a.n. Yayuk Indah Ariyanti - <b>589701021450539</b></li>
            </ul>
            <div className="infoorder-note">* Pastikan transfer ke rekening atas nama PT. Atiga Furniture. Simpan bukti transfer untuk konfirmasi.</div>
          </div>
          <div className="infoorder-card">
            <div className="infoorder-card-icon"><FontAwesomeIcon icon={faTruck} /></div>
            <h3>Pengiriman</h3>
            <ul>
              <li>Pengiriman dari Jepara, Jawa Tengah.</li>
              <li>Ekspedisi: ekspedisi lokal yang mengarah ke kota tujuan.</li>
              <li>Estimasi waktu pengiriman: 2-7 hari (tergantung kota tujuan).</li>
              <li>Produk dikemas aman dan diasuransikan.</li>
            </ul>
          </div>
          <div className="infoorder-card infoorder-card-contact">
            <div className="infoorder-card-icon"><FontAwesomeIcon icon={faWhatsapp} /></div>
            <h3>Butuh Bantuan?</h3>
            <p>Hubungi admin via WhatsApp:<br /><a href="https://wa.me/085291413603" target="_blank" rel="noopener noreferrer">085291413603</a></p>
            <div className="infoorder-card-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
            <p>Email: atigameubel@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoOrderPage; 