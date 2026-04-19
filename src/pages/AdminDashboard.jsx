import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EMPTY_FORM = { name: '', description: '', price: '', imageUrl: '', category: '', stock: '' };

export default function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [orders, setOrders]       = useState([]);
  const [products, setProducts]   = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  // Add Product form state
  const [form, setForm]         = useState(EMPTY_FORM);
  const [formMsg, setFormMsg]   = useState(null);   // { type: 'success'|'error', text }
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token && user?.role === 'admin') {
      fetchOrders();
      fetchProducts();
    }
  }, [token, user]);

  /* ── Fetch helpers ── */
  const fetchOrders = async () => {
    try {
      const res  = await fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) { console.error('Fetch orders error', err); }
  };

  const fetchProducts = async () => {
    try {
      const res  = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) { console.error('Fetch products error', err); }
  };

  /* ── Order status update ── */
  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`${API}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (err) { console.error(err); }
  };

  /* ── Delete product ── */
  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await fetch(`${API}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) { console.error(err); }
  };

  /* ── Add product ── */
  const handleFormChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg(null);
    try {
      const res = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed');
      setFormMsg({ type: 'success', text: '✓ Product added successfully!' });
      setForm(EMPTY_FORM);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setFormMsg({ type: 'error', text: `✗ ${err.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Guard ── */
  if (!user || user.role !== 'admin') {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <div className="admin-denied">
          <span>🚫</span>
          <h2>Access Denied</h2>
          <p>You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'orders',   label: '📦 Orders',   count: orders.length },
    { key: 'products', label: '🛍️ Products', count: products.length },
  ];

  const statusColor = {
    pending:    { bg: 'rgba(245,158,11,0.12)',  color: '#d97706' },
    processing: { bg: 'rgba(59,130,246,0.12)',  color: '#2563eb' },
    completed:  { bg: 'rgba(16,185,129,0.12)',  color: '#059669' },
    cancelled:  { bg: 'rgba(239,68,68,0.12)',   color: '#dc2626' },
  };

  return (
    <div className="admin-page animate-fade-in">

      {/* ── Top header ── */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your store, orders, and products</p>
        </div>
        {activeTab === 'products' && (
          <button className="btn-primary" onClick={() => { setShowForm(v => !v); setFormMsg(null); }}>
            {showForm ? '✕ Close Form' : '+ Add Product'}
          </button>
        )}
      </div>

      {/* ── Stat cards ── */}
      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div>
            <div className="stat-num">{orders.length}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🛍️</span>
          <div>
            <div className="stat-num">{products.length}</div>
            <div className="stat-label">Products Listed</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <div className="stat-num">{orders.filter(o => o.status === 'completed').length}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <div>
            <div className="stat-num">{orders.filter(o => o.status === 'pending').length}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="admin-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key); setShowForm(false); setFormMsg(null); }}
            className={`admin-tab ${activeTab === t.key ? 'active' : ''}`}
          >
            {t.label}
            <span className="tab-badge">{t.count}</span>
          </button>
        ))}
      </div>

      {/* ──────────── ADD PRODUCT FORM ──────────── */}
      {activeTab === 'products' && showForm && (
        <div className="admin-card add-product-form animate-fade-in">
          <h2 className="admin-card-title">➕ Add New Product</h2>

          {formMsg && (
            <div className={formMsg.type === 'success' ? 'alert-success' : 'alert-error'}>
              {formMsg.text}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="product-form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input className="input-premium" name="name" value={form.name}
                onChange={handleFormChange} placeholder="e.g. Business Card" required />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select className="input-premium" name="category" value={form.category}
                onChange={handleFormChange} required>
                <option value="">Select category…</option>
                <option value="office">Office</option>
                <option value="party">Party</option>
                <option value="school">School</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input className="input-premium" name="price" type="number" min="0" step="0.01"
                value={form.price} onChange={handleFormChange} placeholder="e.g. 299" required />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input className="input-premium" name="stock" type="number" min="0"
                value={form.stock} onChange={handleFormChange} placeholder="e.g. 50" />
            </div>

            <div className="form-group form-full">
              <label>Image URL</label>
              <input className="input-premium" name="imageUrl" value={form.imageUrl}
                onChange={handleFormChange} placeholder="https://…/image.jpg" />
            </div>

            <div className="form-group form-full">
              <label>Description</label>
              <textarea className="input-premium" name="description" rows={3}
                value={form.description} onChange={handleFormChange}
                placeholder="Short product description…" />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Saving…' : 'Add Product'}
              </button>
              <button type="button" className="btn-outline"
                onClick={() => { setForm(EMPTY_FORM); setFormMsg(null); setShowForm(false); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ──────────── ORDERS TAB ──────────── */}
      {activeTab === 'orders' && (
        <div className="admin-card">
          <h2 className="admin-card-title">📦 All Orders</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={5} className="table-empty">No orders found</td></tr>
                ) : orders.map(o => {
                  const sc = statusColor[o.status] || { bg: '#f3f4f6', color: '#374151' };
                  return (
                    <tr key={o.id} className="admin-table-row">
                      <td className="td-id">#{o.id}</td>
                      <td>{o.User?.email || '—'}</td>
                      <td className="td-price">₹{Number(o.totalAmount).toFixed(2)}</td>
                      <td>
                        <span className="status-badge" style={{ background: sc.bg, color: sc.color }}>
                          {o.status}
                        </span>
                      </td>
                      <td>
                        <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)}
                          className="input-premium admin-select">
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ──────────── PRODUCTS TAB ──────────── */}
      {activeTab === 'products' && (
        <div className="admin-card">
          <h2 className="admin-card-title">🛍️ Product Listing</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={6} className="table-empty">No products yet — add one above!</td></tr>
                ) : products.map(p => (
                  <tr key={p.id} className="admin-table-row">
                    <td className="td-id">#{p.id}</td>
                    <td className="td-name">
                      {p.imageUrl && <img src={p.imageUrl} alt="" className="prod-thumb" />}
                      {p.name}
                    </td>
                    <td><span className="cat-badge">{p.category || '—'}</span></td>
                    <td className="td-price">₹{Number(p.price).toFixed(2)}</td>
                    <td>{p.stock ?? '—'}</td>
                    <td>
                      <button onClick={() => deleteProduct(p.id)} className="btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
