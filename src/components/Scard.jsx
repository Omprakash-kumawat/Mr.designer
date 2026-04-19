import React from 'react'
import { Link } from 'react-router-dom'

function Scard(props) {
  return (
    <Link to={props.link || '/store'} className="scard-link">
      <div className="scard">
        <img src={props.img} alt={props.heading} />
        <div className="scard-body">
          <div className="headingC">{props.heading}</div>
          <div className="subheadingC">{props.subheading}</div>
          <span className="scard-cta">Shop Now →</span>
        </div>
      </div>
    </Link>
  )
}

export default Scard
