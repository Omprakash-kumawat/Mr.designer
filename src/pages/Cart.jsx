import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="page-container animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }} className="text-gradient">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Your cart is empty.</p>
          <Link to="/store" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 350px)', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div key={item.id} className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '1.5rem', border: '1px solid var(--border-color)' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>{item.name}</h3>
                  <p style={{ color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: 600 }}>Rs. {Number(item.price).toFixed(2)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="input-premium"
                      style={{ width: '80px', padding: '0.4rem' }}
                    />
                    <button onClick={() => removeFromCart(item.id)} className="btn-danger">Remove</button>
                  </div>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span className="text-gradient">Rs. {total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary" style={{ display: 'block', width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
