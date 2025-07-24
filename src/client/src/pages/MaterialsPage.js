import React from 'react';
import '../styles/MaterialsPage.css';
import rotanAlami from '../images/rotan alami.jpg';
import rotanSistesis from '../images/rotan sistesis.jpg';
import parasitImg from '../images/Parasit.jpeg';
import kantataImg from '../images/Kantata.jpeg';
import unionImg from '../images/Union.jpeg';
import nagataImg from '../images/Nagata.jpeg';
import sr10Img from '../images/SR 10.jpeg';
import heroBahan from '../images/herobahan.jpg';

const woods = [
  {
    name: 'Kayu Jati',
    image: require('../images/jati.jpg'),
    desc: 'Kayu jati terkenal sangat kuat, tahan cuaca, dan memiliki serat indah. Pilihan utama untuk furniture outdoor premium.'
  }
];

const rattans = [
  {
    name: 'Rotan Alami',
    image: rotanAlami,
    desc: 'Rotan asli dari alam, serat kuat dan fleksibel, cocok untuk nuansa natural.'
  },
  {
    name: 'Rotan Sintetis',
    image: rotanSistesis,
    desc: 'Rotan buatan dari plastik khusus, tahan cuaca dan mudah dibersihkan.'
  }
];

const fabrics = [
  {
    name: 'Kain Parasit',
    image: parasitImg,
    desc: 'Kain parasit ringan, tipis, dan tahan air, cocok untuk pelapis luar.'
  },
  {
    name: 'Kain Kantata',
    image: kantataImg,
    desc: 'Kain kanvas tebal, kuat, dan tahan lama, cocok untuk outdoor.'
  },
  {
    name: 'Kain Unione',
    image: unionImg,
    desc: 'Kain unione lembut, nyaman, dan memiliki tekstur halus.'
  },
  {
    name: 'Kain Nagata',
    image: nagataImg,
    desc: 'Kain nagata terkenal kuat, awet, dan banyak digunakan untuk seragam.'
  },
  {
    name: 'Kain SR 10',
    image: sr10Img,
    desc: 'Kain SR 10 adalah kain sintetis dengan daya tahan tinggi dan warna cerah.'
  }
];

function MaterialsPage() {
  return (
    <div className="materials-page">
      <div className="materials-hero" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${heroBahan})`}}>
        <h1 className="materials-title">Bahan & Material</h1>
        <p className="materials-subtitle">Pilih bahan terbaik untuk furniture outdoor Anda</p>
      </div>
      <div className="materials-content">
        <section className="materials-section">
          <h2>Kayu</h2>
          <div className="materials-grid">
            {woods.map(item => (
              <div className="material-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="materials-section">
          <h2>Rotan</h2>
          <div className="materials-grid">
            {rattans.map(item => (
              <div className="material-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="materials-section">
          <h2>Kain</h2>
          <div className="materials-grid">
            {fabrics.map(item => (
              <div className="material-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Section Kulit dan Sampel Warna dihapus */}
      </div>
    </div>
  );
}

export default MaterialsPage; 