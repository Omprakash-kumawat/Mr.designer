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
        <Scard img= 'keychain.jpg' heading='Key chain'  subheading = 'Move Your brand name everywhere'/>
        <Scard img= 'Business-card.jpg' heading='Business-Card'  subheading = 'Luxury in Every Introduction.'/>
        <Scard img= 'digitalWatch.jpg' heading='Office watch'  subheading = 'Decorate your office with your brand name.'/>
        <Scard img= 'sticker.jpeg' heading='Sticker/Tegs'  subheading = 'Manage and schedule your tasks with tegs.'/>
        <Scard img= 'printedTshirt.webp' heading='Printed T-shirt'  subheading = 'Printed T-shirt a uniform for your company.'/>
        <Scard img= 'img4_.jpg' heading='Stamp (Seal)'  subheading = 'Requirement of every Officer.'/>
        </div>

        <Services heading ='Party Requirements' subheading = 'Make your event memorable and more attractive.'/>
        <div className="wraper">
        <Scard img= 'weddingCard.jpg' heading='Traditional Card'  subheading = 'Make Your Desk Speak Your Name'/>
        <Scard img= 'mountFrame.webp' heading='Mount Frame'  subheading = 'Turn Your Memories into Timeless Frames.'/>
        <Scard img= 'Ticket.jpg' heading='Entry Ticket'  subheading = 'Manage event peacefully'/>
        <Scard img= 'entryFrame.jpg' heading='Evnet Entry Frame'  subheading = 'Decorative Frame for Event Entry'/>
        </div>
        <Services heading ='School Prints' subheading = 'Needs of school administration and students.'/>
        <div className="wraper">
        <Scard img= 'reportCard.jpg' heading='Marksheets '  subheading = 'Creative designed repoart-card'/>
        <Scard img= 'idCard.jpg' heading='Student id-Card'  subheading = 'id-Card and other printed Uniform items'/>
        <Scard img= 'Project.jpg' heading='School Project'  subheading = 'Help place for every student'/>
        <Scard img= 'schoolCover.jpg' heading='School Diary '  subheading = 'Printed Notebooks and Homework Diaries.'/>
        <Scard img= 'cadPrints.jpg' heading='Cad Blue-prints'  subheading = 'Large Layout prints above A1 size.'/>
        </div>

      </section>
    </>
  )
}

export default Layout
