
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

function ProductsPage() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('access_token')

      const response = await axios.get(
        'https://market.bluveri.web.id/products',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setProducts(response.data.data || [])
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to load products.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmation) return

    try {
      const token = localStorage.getItem('access_token')

      await axios.delete(
        `https://market.bluveri.web.id/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchProducts()
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to delete product.'
      )
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className='flex min-h-screen bg-[#f7f5f0]'>
      <Sidebar />

      <main className='flex-1 min-w-0 p-6 lg:p-10'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-10'>
          <div>
            <p className='text-xs tracking-[0.3em] text-[#9b7b46] mb-2'>
              INVENTORY MANAGEMENT
            </p>

            <h1 className='text-3xl font-serif text-[#171714]'>
              Products
            </h1>

            <p className='text-sm text-gray-500 mt-2'>
              Manage your BLUVERIE watch collection.
            </p>
          </div>

          <Button onClick={() => navigate('/products/add')}>
            + Add Product
          </Button>
        </div>

        <div className='bg-white border border-[#e8e3d9]'>
          <div className='flex items-center justify-between p-6 border-b border-[#e8e3d9]'>
            <div>
              <h2 className='font-serif text-xl text-[#171714]'>
                Product Collection
              </h2>

              <p className='text-xs text-gray-400 mt-1'>
                Total: {products.length} products
              </p>
            </div>

            <Button
              variant='secondary'
              onClick={fetchProducts}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className='p-10 text-center text-sm text-gray-500'>
              Loading products...
            </div>
          ) : error ? (
            <div className='p-10 text-center'>
              <p className='text-sm text-red-600 mb-4'>
                {error}
              </p>

              <Button onClick={fetchProducts}>
                Try Again
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className='p-10 text-center text-sm text-gray-500'>
              No products found.
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead className='bg-[#f7f5f0] text-xs uppercase tracking-wider text-gray-500'>
                  <tr>
                    <th className='px-6 py-4'>Product</th>
                    <th className='px-6 py-4'>Category</th>
                    <th className='px-6 py-4'>Price</th>
                    <th className='px-6 py-4'>Stock</th>
                    <th className='px-6 py-4'>Actions</th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-[#eeeae2]'>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-4 min-w-52'>
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className='w-14 h-14 object-cover bg-[#f7f5f0]'
                          />

                          <div>
                            <p className='text-sm font-medium text-[#171714]'>
                              {product.name}
                            </p>

                            <p className='text-xs text-gray-400 mt-1'>
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className='px-6 py-4 text-sm text-gray-600'>
                        {product.Category?.name || '-'}
                      </td>

                      <td className='px-6 py-4 text-sm text-[#171714]'>
                        {formatPrice(product.price)}
                      </td>

                      <td className='px-6 py-4 text-sm text-gray-600'>
                        {product.stock}
                      </td>

                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='secondary'
                            onClick={() => navigate(`/products/image/${product.id}`)}
                          >
                            Image
                          </Button>

                          <Button
                            variant='secondary'
                            onClick={() => navigate(`/products/edit/${product.id}`)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant='danger'
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ProductsPage
