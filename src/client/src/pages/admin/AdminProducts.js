import React, { useEffect, useState } from 'react';
import './AdminProducts.css';
import AdminLayout from '../../components/admin/AdminLayout';

const API_URL = '/api/products';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: null, category: 'Semua Produk', featured: false });
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const CATEGORY_OPTIONS = [
    'Semua Produk',
    'Meja',
    'Kursi',
    'Lemari',
    'Buffet',
    'Sofa'
  ];

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    }
  };
  useEffect(() => { fetchProducts(); }, []);

  // Handle form change
  const handleChange = e => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else if (e.target.name === 'featured') {
      setForm({ ...form, featured: e.target.checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Handle submit (add/edit)
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('featured', form.featured ? 1 : 0);
    if (form.image) formData.append('image', form.image);
    let res;
    if (editId) {
      res = await fetch(`${API_URL}/${editId}`, { method: 'PUT', body: formData });
    } else {
      res = await fetch(API_URL, { method: 'POST', body: formData });
    }
    if (res.ok) {
      setForm({ name: '', description: '', price: '', image: null, category: 'Semua Produk', featured: false });
      setPreview(null);
      setEditId(null);
      fetchProducts();
    } else {
      alert('Gagal menyimpan produk!');
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = prod => {
    setForm({ name: prod.name, description: prod.description, price: prod.price, image: null, category: prod.category || 'Semua Produk', featured: !!prod.featured });
    setEditId(prod.id);
    setPreview(prod.image ? `${prod.image}` : null);
  };

  // Handle delete
  const handleDelete = async id => {
    if (!window.confirm('Hapus produk ini?')) return;
    setLoading(true);
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
    setLoading(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setForm({ name: '', description: '', price: '', image: null, category: 'Semua Produk', featured: false });
    setEditId(null);
    setPreview(null);
  };

  return (
    <AdminLayout>
      <div>
        <h2 style={{color:'#bfa16a', marginBottom:'1.5rem'}}>Manajemen Produk</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input name="name" placeholder="Nama produk" value={form.name} onChange={handleChange} required />
            <input name="price" placeholder="Harga" type="number" value={form.price} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <select name="category" value={form.category} onChange={handleChange} required style={{flex:1,padding:'0.7rem 1rem',borderRadius:6,border:'1px solid #ccc',fontSize:'1rem'}}>
              {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem',marginLeft:'1rem'}}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Produk Unggulan
            </label>
          </div>
          <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} required />
          <div className="form-row">
            <input name="image" type="file" accept="image/*" onChange={handleChange} />
            {preview && (
              <img src={preview} alt="preview" className="img-preview" onError={e => { e.target.onerror=null; e.target.src='/noimg.png'; }} />
            )}
          </div>
          <div className="form-row">
            <button type="submit" disabled={loading}>{editId ? 'Update' : 'Tambah'} Produk</button>
            {editId && <button type="button" className="cancel-btn" onClick={handleCancel}>Batal</button>}
          </div>
        </form>
        <hr style={{margin:'2rem 0', borderColor:'#ececec'}} />
        <div className="product-table-wrap">
          <table className="product-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? products.map(prod => (
                <tr key={prod.id}>
                  <td>
                    {prod.image ? (
                      <img src={prod.image} alt="img" className="img-thumb" onError={e => { e.target.onerror=null; e.target.src='/noimg.png'; }} />
                    ) : null}
                  </td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.description}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(prod)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(prod.id)}>Hapus</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} style={{textAlign:'center',color:'#aaa'}}>Tidak ada produk</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProducts; 