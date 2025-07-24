import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBoxOpen, 
  faTags, 
  faUsers, 
  faChartBar, 
  faSignOutAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './AdminLayout.css';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2>Atiga Admin</h2>
          <button 
            className="admin-sidebar-close" 
            onClick={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-item">
            <FontAwesomeIcon icon={faHome} className="admin-nav-icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className="admin-nav-item">
            <FontAwesomeIcon icon={faBoxOpen} className="admin-nav-icon" />
            <span>Produk</span>
          </Link>
          <Link to="/admin/categories" className="admin-nav-item">
            <FontAwesomeIcon icon={faTags} className="admin-nav-icon" />
            <span>Kategori</span>
          </Link>
          <Link to="/admin/users" className="admin-nav-item">
            <FontAwesomeIcon icon={faUsers} className="admin-nav-icon" />
            <span>User</span>
          </Link>
          <Link to="/admin/stats" className="admin-nav-item">
            <FontAwesomeIcon icon={faChartBar} className="admin-nav-icon" />
            <span>Statistik</span>
          </Link>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="admin-nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <header className="admin-header">
          <button 
            className="admin-menu-toggle" 
            onClick={() => setSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          
          <div className="admin-header-title">
            Atiga Meubel Admin Panel
          </div>
          
          <div className="admin-header-actions">
            <Link to="/" className="admin-view-site-btn" target="_blank">
              Lihat Website
            </Link>
          </div>
        </header>
        
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout; 