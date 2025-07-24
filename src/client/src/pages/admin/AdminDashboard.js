import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faTags, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/admin/AdminLayout';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <section className="admin-hero">
          <h1>Admin Dashboard</h1>
          <p>Selamat datang di Admin Panel Atiga Meubel</p>
          <div className="admin-hero-icon">
            <FontAwesomeIcon icon={faBoxOpen} spin />
          </div>
        </section>
        
        <div className="admin-cards">
          <Link to="/admin/products" className="admin-card">
            <FontAwesomeIcon icon={faBoxOpen} size="2x" className="admin-card-icon" />
            <h3>Produk</h3>
            <p>Kelola produk furniture</p>
          </Link>
          
          <Link to="/admin/categories" className="admin-card">
            <FontAwesomeIcon icon={faTags} size="2x" className="admin-card-icon" />
            <h3>Kategori</h3>
            <p>Kelola kategori produk</p>
          </Link>
          
          <Link to="/admin/users" className="admin-card">
            <FontAwesomeIcon icon={faUsers} size="2x" className="admin-card-icon" />
            <h3>User</h3>
            <p>Kelola admin/user</p>
          </Link>
          
          <Link to="/admin/stats" className="admin-card">
            <FontAwesomeIcon icon={faChartBar} size="2x" className="admin-card-icon" />
            <h3>Statistik</h3>
            <p>Lihat statistik penjualan</p>
          </Link>
        </div>
        
        <div className="admin-quick-stats">
          <div className="admin-stat-card">
            <h4>Total Produk</h4>
            <div className="admin-stat-value">24</div>
          </div>
          <div className="admin-stat-card">
            <h4>Produk Unggulan</h4>
            <div className="admin-stat-value">8</div>
          </div>
          <div className="admin-stat-card">
            <h4>Kategori</h4>
            <div className="admin-stat-value">5</div>
          </div>
        </div>
        
        <div className="admin-recent-activity">
          <h3>Aktivitas Terbaru</h3>
          <div className="admin-activity-list">
            <div className="admin-activity-item">
              <div className="admin-activity-icon">
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>
              <div className="admin-activity-content">
                <p>Produk baru ditambahkan: <strong>Sofa Outdoor Premium</strong></p>
                <span className="admin-activity-time">Baru saja</span>
              </div>
            </div>
            <div className="admin-activity-item">
              <div className="admin-activity-icon">
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>
              <div className="admin-activity-content">
                <p>Produk diperbarui: <strong>Kursi Taman Rotan</strong></p>
                <span className="admin-activity-time">2 jam yang lalu</span>
              </div>
            </div>
            <div className="admin-activity-item">
              <div className="admin-activity-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="admin-activity-content">
                <p>Login admin: <strong>Admin</strong></p>
                <span className="admin-activity-time">3 jam yang lalu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard; 