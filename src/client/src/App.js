import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import InfoOrderPage from './pages/InfoOrderPage';
import MaterialsPage from './pages/MaterialsPage';

// Import admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';

// Import components
import FooterSimple from './components/layout/FooterSimple';

function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  
  const isAdminPage = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setShowSearch(false);
      setSearchValue("");
    }
  };

  // Admin panel doesn't use the main layout
  if (isAdminPage) {
    return children;
  }

  return (
    <div className="App">
      <header className={`header ${isHomePage ? 'header-transparent' : ''}`}>
        <div className="logo">
          <Link to="/">
            <img src="/images/atigalogo.png" alt="ATIGA Furniture Logo" className="logo-image" />
          </Link>
        </div>
        <nav className="main-nav">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/materials">Bahan</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/info-order">Info Pemesanan</Link></li>
          </ul>
        </nav>
        <div className="header-icons">
          <button className="header-icon" onClick={() => setShowSearch(v => !v)} style={{background:'none',border:'none',cursor:'pointer'}}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {showSearch && (
          <form className="search-bar" onSubmit={handleSearchSubmit} style={{position:'absolute',top:60,right:20,zIndex:1000,display:'flex',background:'#fff',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.12)'}}>
            <input
              type="text"
              autoFocus
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Cari produk..."
              style={{padding:'0.5rem 1rem',fontSize:'1rem',border:'none',outline:'none',borderRadius:8,minWidth:180}}
            />
            <button type="button" onClick={() => setShowSearch(false)} style={{background:'none',border:'none',fontSize:'1.2rem',padding:'0 0.7rem',cursor:'pointer'}}>&times;</button>
          </form>
        )}
      </header>
      {children}
      {location.pathname === '/' ? (
        <footer className="footer">
          <div className="social-links">
            <a href="https://www.instagram.com/atiga_meubel?igsh=MTg3dXpwbzE3Y2syOA==" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
            <a href="https://wa.me/6285291413603" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
            </a>
            <a href="https://www.facebook.com/share/19u3Swc2UX/" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} /> Facebook
            </a>
          </div>
        </footer>
      ) : (
        <FooterSimple />
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/info-order" element={<InfoOrderPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/admin/dashboard" element={isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/admin/products" element={isLoggedIn ? <AdminProducts /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 