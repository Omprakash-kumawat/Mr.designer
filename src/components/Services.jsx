import React from 'react'

function Services(props) {
    return (
        <>
            <section id="Business" className="below-content">
                <div id='business-h' className='heading'>{props.heading}</div>
                <div id='business-sh' className='sub-heading'>{props.subheading}</div>
            </section>
        </>
    )
}

export default Services
