
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

function ImageProductPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const token = localStorage.getItem('access_token')

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!image) {
      setError('Please select an image.')
      return
    }

    const formData = new FormData()
    formData.append('image', image)

    try {
      setLoading(true)
      setError('')

      await axios.patch(
        `https://market.bluveri.web.id/products/${id}/img-url`,
        formData,
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
        'Failed to upload product image.'
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
            Upload Product Image
          </h1>

          <p className='text-sm text-gray-500 mt-2'>
            Upload a new image for your timepiece.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white border border-[#e8e3d9] p-6 lg:p-8 max-w-4xl'
        >
          <div>
            <label className='block text-sm mb-2'>
              Product Image
            </label>

            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              required
              className='w-full border border-[#e3dfd5] px-4 py-3 text-sm'
            />
          </div>

          {preview && (
            <div className='mt-6'>
              <p className='text-sm mb-3'>
                Image Preview
              </p>

              <img
                src={preview}
                alt='Product preview'
                className='w-full max-w-sm h-64 object-contain border border-[#e8e3d9] bg-[#f7f5f0] p-4'
              />
            </div>
          )}

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
              disabled={loading || !image}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ImageProductPage
