import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  images?: string[];
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Gagal memuat produk'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list">
      {products.map(prod => {
        return (
          <div key={prod.id} className="product-card">
            {prod.image ? (
              <img src={`http://localhost:5050${prod.image}`} alt={prod.name} className="product-img" style={{width:'100%',height:'180px',display:'block',objectFit:'contain',background:'#f7f7f7'}} onError={e => { const t = e.target as HTMLImageElement; t.onerror=null; t.src='/noimg.png'; }} />
            ) : null}
            <h3>{prod.name}</h3>
            <p>{prod.description}</p>
            <div>Rp {prod.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList; 