import React from 'react'

function Scard(props) {
  return (
    <>
      <a href="#">
        <div className="scard">
        <img src={props.img} alt="" />
        <div className="headingC">{props.heading}</div>
        <div className="subheadingC">{props.subheading}</div>
      </div>
      </a>
    </>
  )
}

export default Scard
