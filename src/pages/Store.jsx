import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import StoreSlider from '../components/StoreSlider';

const CATEGORIES = [
  { label: 'All Products', value: '' },
  { label: '🏢 Office', value: 'office' },
  { label: '🎉 Party', value: 'party' },
  { label: '🎓 School', value: 'school' },
];

export default function Store() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  const location = useLocation();
  const queryCategory = new URLSearchParams(location.search).get('category') || '';
  const [activeCategory, setActiveCategory] = useState(queryCategory);

  useEffect(() => {
    setActiveCategory(queryCategory);
  }, [queryCategory]);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products?category=${activeCategory}`
      : `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, [activeCategory]);

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="store-page animate-fade-in">
      {/* Header */}
      <div className="store-header">
        <h1 className="text-gradient">Our Premium Collection</h1>
        <p className="store-subtitle">Quality products crafted just for you</p>
      </div>

      {/* Offer Slider */}
      <StoreSlider />

      {/* Category Filter Tabs */}
      <div className="category-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`category-tab ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading ? (
        <div className="store-loading">
          <div className="spinner"></div>
          <p>Loading products…</p>
        </div>
      ) : products.length === 0 ? (
        <div className="store-empty">
          <span className="store-empty-icon">📦</span>
          <h3>No products found</h3>
          <p>No products in this category yet. Check back soon!</p>
        </div>
      ) : (
        <div className="product-grid-modern">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-card-img-wrap">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="product-card-img" />
                ) : (
                  <div className="product-card-no-img">
                    <span>🖼️</span>
                    <p>No Image</p>
                  </div>
                )}
                {p.category && (
                  <span className="product-badge">{p.category}</span>
                )}
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name">{p.name}</h3>
                <p className="product-card-desc">{p.description}</p>
                <div className="product-card-footer">
                  <span className="product-card-price">₹{Number(p.price).toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`btn-add-cart ${addedId === p.id ? 'added' : ''}`}
                  >
                    {addedId === p.id ? '✓ Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
