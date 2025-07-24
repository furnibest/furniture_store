import React, { useEffect, useState } from 'react';
import '../styles/ProductsPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const WA_NUMBER = '6285291413603';

const CATEGORY_OPTIONS = [
  'Meja',
  'Kursi',
  'Lemari',
  'Buffet',
  'Sofa'
];

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // kosong = semua produk
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900); // Tambah state isMobile
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil keyword search dari query string
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  const getWaLink = (productName) => {
    const message = encodeURIComponent(`Halo, saya ingin menanyakan tentang produk: ${productName}`);
    return `https://wa.me/${WA_NUMBER}?text=${message}`;
  };

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1 className="products-title">Our Products</h1>
        <p className="products-subtitle">Discover our best-selling outdoor furniture</p>
      </div>
      <div className="products-filter-bar">
        {isMobile ? (
          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{padding:'0.7rem 1rem',borderRadius:6,border:'1px solid #bfa76a',fontSize:'1rem',marginBottom:8}}
          >
            <option value="">Semua Produk</option>
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <div className="category-btn-group">
            <button
              className={`category-btn${selectedCategory === '' ? ' active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              Semua Produk
            </button>
            {CATEGORY_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`category-btn${selectedCategory === opt ? ' active' : ''}`}
                onClick={() => setSelectedCategory(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        <label className="featured-checkbox">
          <input type="checkbox" checked={featuredOnly} onChange={e => setFeaturedOnly(e.target.checked)} />
          <span className="checkmark"></span>
          Tampilkan hanya produk unggulan
        </label>
      </div>
      <div className="products-grid">
        {products
          .filter(product => !selectedCategory || product.category === selectedCategory)
          .filter(product => !featuredOnly || product.featured === true || product.featured === 1)
          .filter(product =>
            !searchKeyword ||
            product.name?.toLowerCase().includes(searchKeyword) ||
            product.description?.toLowerCase().includes(searchKeyword)
          )
          .map(product => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => handleCardClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-wrapper">
                {product.image && (
                  <img src={`http://localhost:5001${product.image}`} alt={product.name} />
                )}
              </div>
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.description}</p>
                <div className="product-price">Rp {product.price}</div>
                <a
                  className="wa-product-btn"
                  href={getWaLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsPage; 