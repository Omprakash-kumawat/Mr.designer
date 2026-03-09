import { useState } from "react"

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="top-nav">
      <div className="logo">
        <img id="logoimg" src="logo.jpg" alt="Mr.Designer" />
      </div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
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
