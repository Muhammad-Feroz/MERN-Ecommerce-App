import { useEffect, useState } from "react"
import { fecthRequest } from "../utils"

const useFetch = (url, method, key = 'products', body = null) => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const products = await fecthRequest(url, method, body);
      console.log(products);
      if (products?.error) setError(products.error);
      else setProducts(products?.[key]);
      setLoading(false);
    }
    fetch();
  }, [refetch])

  return { products, loading, error, refetch: () => setRefetch((prev) => !prev) }
}

export default useFetch