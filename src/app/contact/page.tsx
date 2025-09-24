import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="p-6 text-zinc-500">読み込み中...</div>}>
        <ContactForm />
      </Suspense>
    </main> 
    <Footer/>
    </>
  )
}
export default page
