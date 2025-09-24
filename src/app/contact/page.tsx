import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <ContactForm/>
    </main> 
    <Footer/>
    </>
  )
}
export default page
