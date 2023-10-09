import { filters } from '../utils/data'
import SectionHeading from '../components/SectionHeading'
import SideFilter from '../components/SideFilter'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'

export default function Products({
  banner = true,
}) {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');

  const [filterParams, setFilters] = useState({
    category: category || [],
    sort: sort || 'featured',
  })

  const { products, loading, error, refetch } = useFetch(`products?${filterParams.category.length > 0 ? `category=${filterParams.category}&` : ''}sort=${filterParams.sort}`, 'GET', 'products')

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if(filterParams.category.length > 0) params.set('category', filterParams.category);
    params.set('sort', filterParams.sort);
    history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    refetch();
  }

  useEffect(() => {
    updateUrlParams()
  }, [filterParams])

  return (
    <div className="bg-white">
      {banner && (
        <div>
          <div className="relative bg-white">
            <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              Get free delivery on orders over $100
            </p>
          </div>
        </div>
      )}
      <div>
        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <SectionHeading heading="Products" subheading={'Checkout these amazing products'} />

          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <SideFilter filters={filters} setFilters={setFilters} filterParams={filterParams} />

            <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
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
                      products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
