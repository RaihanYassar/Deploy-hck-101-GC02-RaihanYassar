import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

function AddProductPage() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
    authorId: ''
  })

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://market.bluveri.web.id/categories',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setCategories(response.data.categories || [])
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to load categories.'
        )
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      await axios.post(
        'https://market.bluveri.web.id/products',
        {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          categoryId: Number(form.categoryId),
          authorId: Number(form.authorId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate('/products')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to create product.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-[#f7f5f0]'>
      <Sidebar />

      <main className='flex-1 min-w-0 p-6 lg:p-10'>
        <div className='mb-8'>
          <p className='text-xs tracking-[0.3em] text-[#9b7b46] mb-2'>
            INVENTORY MANAGEMENT
          </p>

          <h1 className='text-3xl font-serif text-[#171714]'>
            Add Product
          </h1>

          <p className='text-sm text-gray-500 mt-2'>
            Add a new timepiece to your collection.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white border border-[#e8e3d9] p-6 lg:p-8 max-w-4xl'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='lg:col-span-2'>
              <label className='block text-sm mb-2'>
                Product Name
              </label>

              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                required
                placeholder='Enter product name'
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d]'
              />
            </div>

            <div className='lg:col-span-2'>
              <label className='block text-sm mb-2'>
                Description
              </label>

              <textarea
                name='description'
                value={form.description}
                onChange={handleChange}
                required
                rows='4'
                placeholder='Enter product description'
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d] resize-none'
              />
            </div>

            <div>
              <label className='block text-sm mb-2'>
                Price (USD)
              </label>

              <input
                type='number'
                name='price'
                value={form.price}
                onChange={handleChange}
                min='0'
                required
                placeholder='Enter price'
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d]'
              />
            </div>

            <div>
              <label className='block text-sm mb-2'>
                Stock
              </label>

              <input
                type='number'
                name='stock'
                value={form.stock}
                onChange={handleChange}
                min='0'
                required
                placeholder='Enter stock'
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d]'
              />
            </div>

            <div className='lg:col-span-2'>
              <label className='block text-sm mb-2'>
                Image URL
              </label>

              <input
                type='url'
                name='imageUrl'
                value={form.imageUrl}
                onChange={handleChange}
                required
                placeholder='Enter product image URL'
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d]'
              />
            </div>

            <div>
              <label className='block text-sm mb-2'>
                Category
              </label>

              <select
                name='categoryId'
                value={form.categoryId}
                onChange={handleChange}
                required
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d] bg-white'
              >
                <option value=''>
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm mb-2'>
                Author ID
              </label>

              <input
                type='number'
                name='authorId'
                value={form.authorId}
                onChange={handleChange}
                min='1'
                required
                placeholder='Enter author ID'
                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#c5a46d]'
              />
            </div>
          </div>

          {error && (
            <p className='text-sm text-red-600 mt-6'>
              {error}
            </p>
          )}

          <div className='flex justify-end gap-3 mt-8 pt-6 border-t border-[#e8e3d9]'>
            <Button
              variant='secondary'
              onClick={() => navigate('/products')}
            >
              Cancel
            </Button>

            <Button
              type='submit'
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddProductPage