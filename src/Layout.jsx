import React from 'react'
import Services from './components/Services'
import Scard from './components/Scard'

function Layout() {
  return (
    <>
      <section className='below-content'>
        <Services heading ='Office Needs' subheading = 'Everything you need to speed-up your business is here.'/>
        <div className="wraper">
        <Scard img= 'namePlate.jpg' heading='Name Plate'  subheading = 'Make Your Desk Speak Your Name'/>
        <Scard img= 'Business-card.jpg' heading='Business-Card'  subheading = 'Luxury in Every Introduction.'/>
        <Scard img= 'digitalWatch.jpg' heading='Office watch'  subheading = 'Decorate your offic with your brand name.'/>
        <Scard img= 'sticker.jpeg' heading='Sticker/Tegs'  subheading = 'Manage and schedule your tasks with tegs.'/>
        <Scard img= 'printedTshirt.webp' heading='Printed T-shirt'  subheading = 'Printed T-shirt a uniform for your company.'/>
        </div>

        <Services heading ='Party Requirements' subheading = 'Make your event memorable and more attractive.'/>
        <div className="wraper">
        <Scard img= 'weddingCard.jpg' heading='Traditional Card'  subheading = 'Make Your Desk Speak Your Name'/>
        <Scard img= 'mountFrame.webp' heading='Mount Frame'  subheading = 'Turn Your Memories into Timeless Frames.'/>
        <Scard img= 'Ticket.jpg' heading='Entry Ticket'  subheading = 'Manage event peacefully'/>
        </div>
      </section>
    </>
  )
}

export default Layout
