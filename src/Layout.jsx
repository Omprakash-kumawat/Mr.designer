import React from 'react'
import Services from './components/Services'
import Scard from './components/Scard'

function Layout() {
  return (
    <>
      <section className='below-content'>

        <Services heading='Office Needs' subheading='Everything you need to speed-up your business is here.' />
        <div className="wraper">
          <Scard img='namePlate.jpg'      heading='Name Plate'      subheading='Make Your Desk Speak Your Name'             link='/store?category=office' />
          <Scard img='keychain.jpg'       heading='Key Chain'       subheading='Move Your brand name everywhere'             link='/store?category=office' />
          <Scard img='Business-card.jpg'  heading='Business Card'   subheading='Luxury in Every Introduction.'               link='/store?category=office' />
          <Scard img='digitalWatch.jpg'   heading='Office Watch'    subheading='Decorate your office with your brand name.'  link='/store?category=office' />
          <Scard img='sticker.jpeg'       heading='Sticker / Tags'  subheading='Manage and schedule your tasks with tags.'   link='/store?category=office' />
          <Scard img='printedTshirt.webp' heading='Printed T-Shirt' subheading='Printed T-shirt a uniform for your company.' link='/store?category=office' />
          <Scard img='img4_.jpg'          heading='Stamp (Seal)'    subheading='Requirement of every Officer.'               link='/store?category=office' />
        </div>

        <Services heading='Party Requirements' subheading='Make your event memorable and more attractive.' />
        <div className="wraper">
          <Scard img='weddingCard.jpg' heading='Traditional Card'   subheading='Make Your Desk Speak Your Name'       link='/store?category=party' />
          <Scard img='mountFrame.webp' heading='Mount Frame'        subheading='Turn Your Memories into Timeless Frames.' link='/store?category=party' />
          <Scard img='Ticket.jpg'      heading='Entry Ticket'       subheading='Manage event peacefully'               link='/store?category=party' />
          <Scard img='entryFrame.jpg'  heading='Event Entry Frame'  subheading='Decorative Frame for Event Entry'      link='/store?category=party' />
        </div>

        <Services heading='School Prints' subheading='Needs of school administration and students.' />
        <div className="wraper">
          <Scard img='reportCard.jpg'  heading='Marksheets'       subheading='Creative designed report-card'            link='/store?category=school' />
          <Scard img='idCard.jpg'      heading='Student ID Card'  subheading='ID-Card and other printed Uniform items'  link='/store?category=school' />
          <Scard img='Project.jpg'     heading='School Project'   subheading='Help place for every student'             link='/store?category=school' />
          <Scard img='schoolCover.jpg' heading='School Diary'     subheading='Printed Notebooks and Homework Diaries.'  link='/store?category=school' />
          <Scard img='cadPrints.jpg'   heading='CAD Blueprints'   subheading='Large Layout prints above A1 size.'       link='/store?category=school' />
        </div>

      </section>
    </>
  )
}

export default Layout
