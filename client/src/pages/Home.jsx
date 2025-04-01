import React from 'react'
import ContentCarousel from '../components/home/ContentCarousel'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
    <div>
      <ContentCarousel />

      <p className='font-extrabold text-4xl text-center my-4'>THE BEST SELLER</p>
      <BestSeller />


      <p className='font-extrabold text-4xl text-center my-4'>NEW ARRIVAL</p>
      <NewProduct />



    </div>
  )
}

export default Home