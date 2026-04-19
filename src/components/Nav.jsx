import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

const services = [
  "FLEX BANNER",
  "VISTING CARD",
  "INVITITION CARD",
  "MENU CARD",
  "ID CARD",
  "STICKER AND LABEL",
  "PAMPHLET AND POSTER",
  "PHOTO FRAME",
  "BILL BOOK",
  "STAMP (SEAL)",
  "DIGITAL PRINT",
  "LAYOUT PRINT",
  "CANVAS PRINT",
  "SHAGUN ENVELOPE",
  "POCKET BEDGE",
]

const toSlug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="top-nav">
      <div className="logo">
        <Link to="/"><img id="logoimg" src="logo.jpg" alt="Mr.Designer" /></Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/cart">Cart ({cart.reduce((n, i) => n + i.quantity, 0)})</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user ? (
          <button onClick={handleLogout} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Logout</button>
        ) : (
          <Link to="/login" className="btn-primary" style={{ padding: '0.4rem 0.8rem', color: '#1b1919', fontSize: '0.85rem' }}>Login</Link>
        )}
      </nav>

      <div className="menu-wrap">
        <button
          type="button"
          className={`hamburger-btn${isMenuOpen ? " is-open" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="services-menu"
          aria-label="Toggle services menu"
        > 
          <span />
          <span />
          <span />
        </button>

        {isMenuOpen && (
          <div id="services-menu" className="services-menu">
            {services.map((service) => (
              <a
                key={service}
                className="services-link"
                href={`#${toSlug(service)}`}
                onClick={closeMenu}
              >
                {service}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Nav
