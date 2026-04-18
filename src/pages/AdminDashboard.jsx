import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (token && user?.role === 'admin') {
      fetchOrders();
    }
  }, [token, user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Fetch orders error', err);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      fetchOrders(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="page-container" style={{ textAlign: 'center' }}><div className="alert-error" style={{ display: 'inline-block' }}>Access Denied</div></div>;
  }

  return (
    <div className="page-container animate-fade-in">
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('orders')}
          className={activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}
        >
          Manage Orders
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Order ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Customer</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Total</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', ':hover': { backgroundColor: 'var(--bg-color)' } }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>#{o.id}</td>
                  <td style={{ padding: '1rem' }}>{o.User?.email}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${Number(o.totalAmount).toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: o.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      color: o.status === 'completed' ? '#10b981' : '#f59e0b'
                    }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={o.status} 
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="input-premium"
                      style={{ padding: '0.5rem', width: 'auto' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
