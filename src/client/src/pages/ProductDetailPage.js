import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image">
          {product.image && (
            <img src={`http://localhost:5001${product.image}`} alt={product.name} />
          )}
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">Rp {product.price}</p>
          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <a
            href={`https://wa.me/6285291413603?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`}
            className="wa-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage; 