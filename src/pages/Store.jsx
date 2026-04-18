import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Store() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }} className="text-gradient">Our Premium Collection</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center' }} className="glass-panel" >No products available at the moment. (Add some from the DB!)</p>
      ) : (
        <div className="product-grid">
          {products.map(p => (
            <div key={p.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'row', margin: '5px', padding: '4px' }}>
              <div style={{ height: '220px', background: '#f5f5f5', display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center' }}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#ccc' }}>No Image provided</span>
                )}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: '600' }}>{p.name}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontWeight: '700', fontSize: '1.3rem', color: 'var(--primary-color)' }}>${Number(p.price).toFixed(2)}</span>
                  <button onClick={() => addToCart(p)} className="btn-primary">Add to Cart</button>
                </div>
              </div>
                
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
