import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import CheckBox from '../components/CheckBox'
import Input from '../components/Input'
import InputSelect from '../components/InputSelect'
import SectionHeading from '../components/SectionHeading'

export default function AddProduct() {
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    images: '',
    category: '',
    colors: [],
    stock: '',
    featured: false,
  })

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ecommerce_app')
    formData.append('cloud_name', process.env.VITE_CLOUDINARY_CLOUD_NAME)
    const res = await fetch(process.env.VITE_CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    console.log(data, 'data')
    return { url: data.secure_url }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const { url } = await uploadImage(data.images)
    console.log(url, 'url')

    if (!url) {
      return alert('Image upload failed')
    }

    const res = await fetch('http://localhost:8800/api/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        ...data,
        images: [url],
      }),
    })

    if (res.ok) {
      alert('Product added successfully')
      setData({
        name: '',
        description: '',
        price: '',
        images: '',
        category: '',
        colors: [],
        stock: '',
        featured: false,
      })
    } else {
      alert('Product addition failed')
    }
  }

  return (
    <>
      <SectionHeading heading="Add Product" subheading={'You can add the product here'} />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Input
                  label='Product Name'
                  placeholder='Black T-Shirt'
                  type='text'
                  name='productName'
                  className='sm:max-w-md'
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Product description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-lg"
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a description about the product.</p>
              </div>

              <div className="col-span-full">
                <Input
                  label='Product Price'
                  placeholder='100'
                  type='number'
                  name='productPrice'
                  className='sm:max-w-md'
                  value={data.price}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Product image
                </label>
                <div className="mt-2 sm:max-w-lg flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setData({ ...data, images: e.target.files[0] })} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-full sm:max-w-md">
                <InputSelect
                  label={'Category'}
                  people={[
                    { name: 'Tees', id: 'tees' },
                    { name: 'Crewnecks', id: 'crewnecks' },
                    { name: 'Sweat Shirts', id: 'sweatshirts' },
                  ]}
                  className='sm:max-w-md'
                  onChange={(e) => setData({ ...data, category: e.id })}
                />
              </div>

              <div className="col-span-full sm:max-w-md">
                <CheckBox
                  label={'Colors'}
                  people={[
                    { name: 'Red', id: 'red' },
                    { name: 'Blue', id: 'blue' },
                    { name: 'Green', id: 'green' },
                    { name: 'Yellow', id: 'yellow' },
                    { name: 'Purple', id: 'purple' },
                    { name: 'Orange', id: 'orange' },
                    { name: 'Pink', id: 'pink' },
                    { name: 'Black', id: 'black' },
                    { name: 'White', id: 'white' },
                  ]}
                  className='sm:max-w-md'
                  onChange={(person, checked) => {
                    if (checked) {
                      setData({ ...data, colors: [...data.colors, person.id] })
                    } else {
                      setData({ ...data, colors: data.colors.filter((color) => color !== person.id) })
                    }
                  }}
                />
              </div>

            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}