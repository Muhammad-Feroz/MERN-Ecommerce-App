import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import useFetch from '../hooks/useFetch'
import { fecthRequest } from '../utils'
import { PRODUCTS } from '../utils/data'

const Main = () => {
  const { products, loading, error } = useFetch('products?sort=featured', 'GET')

  return (
    <>
      <Banner />
      <HeroSection />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <SectionHeading heading="Featured Products" subheading="The best products in the world." />
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {
            loading ?
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="h-96 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md"></div>
              </div>
              :
              error ?
                <div className="flex flex-col space-y-4">
                  <div className="h-96 bg-gray-200 rounded-md text-center">
                    {error}
                  </div>
                </div>
                :
                products?.map((product) => <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>
    </>
  )
}

export default Main