import { Link, NavLink } from "react-router-dom";

export default function ProductCard({ product }) {
  const link = window.location.pathname === '/' ? `/products/${product?._id}` : `${product?._id}`
  return (
    <NavLink
      to={link}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm italic text-gray-500">{product.options}</p>
          <p className="text-base font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </NavLink>
  )
}
