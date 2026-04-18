import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({ ProductId: item.id, quantity: item.quantity, price: item.price })),
          totalAmount: total
        })
      });

      if (!response.ok) throw new Error('Checkout failed');

      clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/Store'), 3000);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-container animate-fade-in" style={{ textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ color: 'var(--success-color)', marginBottom: '1rem', fontSize: '2.5rem' }}>Order Placed Successfully!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Thank you for your purchase. Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '600px' }}>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
      
      <form onSubmit={handleCheckout} className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Shipping Information</h2>
        {user ? (
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Signed in as: <strong>{user.email}</strong></p>
        ) : (
          <div className="alert-error" style={{ marginBottom: '1.5rem' }}>Please login to continue</div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Address (Mock test data)</label>
          <input type="text" required placeholder="123 Printing St" className="input-premium" />
        </div>

        <div style={{ marginBottom: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold' }}>
            <span>Total to pay:</span>
            <span className="text-gradient">${total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          disabled={loading || cart.length === 0} 
          type="submit" 
          className="btn-primary"
          style={{ width: '100%', padding: '1.15rem', fontSize: '1.1rem' }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
