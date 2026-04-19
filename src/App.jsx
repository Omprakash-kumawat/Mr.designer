import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Store from "./pages/Store"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import AdminDashboard from "./pages/AdminDashboard"
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Nav />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/store" element={<Store />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
