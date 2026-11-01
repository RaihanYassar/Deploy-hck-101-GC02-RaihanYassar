
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const token = localStorage.getItem('access_token')

    const fetchCategories = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await axios.get(
                'https://market.bluveri.web.id/categories',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setCategories(response.data.categories)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to fetch categories.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!name.trim()) {
            setError('Category name is required.')
            return
        }

        try {
            setLoading(true)
            setError('')
            setSuccess('')

            if (editingId) {
                await axios.put(
                    `https://market.bluveri.web.id/categories/${editingId}`,
                    {
                        name: name.trim()
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setSuccess('Category updated successfully.')
            } else {
                await axios.post(
                    'https://market.bluveri.web.id/categories',
                    {
                        name: name.trim()
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setSuccess('Category created successfully.')
            }

            setName('')
            setEditingId(null)

            await fetchCategories()
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to save category.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (category) => {
        setEditingId(category.id)
        setName(category.name)
        setError('')
        setSuccess('')
    }

    const handleCancel = () => {
        setEditingId(null)
        setName('')
        setError('')
        setSuccess('')
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
                        Categories
                    </h1>

                    <p className='text-sm text-gray-500 mt-2'>
                        Manage your BLUVERIE product categories.
                    </p>
                </div>

                <div className='bg-white border border-[#e8e3d9] p-6 lg:p-8 mb-8'>
                    <div className='mb-6'>
                        <h2 className='text-xl font-serif text-[#171714]'>
                            {editingId ? 'Edit Category' : 'Add New Category'}
                        </h2>

                        <p className='text-sm text-gray-500 mt-1'>
                            {editingId
                                ? 'Update the selected category name.'
                                : 'Create a new category for your products.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='max-w-xl'>
                            <label className='block text-sm text-[#171714] mb-2'>
                                Category Name
                            </label>

                            <input
                                type='text'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder='Enter category name'
                                className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#9b7b46]'
                            />
                        </div>

                        {error && (
                            <p className='text-sm text-red-600 mt-4'>
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className='text-sm text-green-700 mt-4'>
                                {success}
                            </p>
                        )}

                        <div className='flex gap-3 mt-6'>
                            <Button
                                type='submit'
                                disabled={loading}
                            >
                                {loading
                                    ? 'Saving...'
                                    : editingId
                                        ? 'Update Category'
                                        : 'Add Category'}
                            </Button>

                            {editingId && (
                                <Button
                                    variant='secondary'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                <div className='bg-white border border-[#e8e3d9]'>
                    <div className='p-6 border-b border-[#e8e3d9]'>
                        <h2 className='text-xl font-serif text-[#171714]'>
                            Category List
                        </h2>

                        <p className='text-sm text-gray-500 mt-1'>
                            Total categories: {categories.length}
                        </p>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm text-left'>
                            <thead className='bg-[#f7f5f0] text-[#6b665c] uppercase text-xs tracking-wider'>
                                <tr>
                                    <th className='px-6 py-4'>No.</th>
                                    <th className='px-6 py-4'>Category Name</th>
                                    <th className='px-6 py-4'>Category ID</th>
                                    <th className='px-6 py-4'>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading && categories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan='4'
                                            className='px-6 py-10 text-center text-gray-500'
                                        >
                                            Loading categories...
                                        </td>
                                    </tr>
                                ) : categories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan='4'
                                            className='px-6 py-10 text-center text-gray-500'
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category, index) => (
                                        <tr
                                            key={category.id}
                                            className='border-t border-[#eeeae2] hover:bg-[#faf9f6]'
                                        >
                                            <td className='px-6 py-4 text-gray-500'>
                                                {index + 1}
                                            </td>

                                            <td className='px-6 py-4 font-medium text-[#171714]'>
                                                {category.name}
                                            </td>

                                            <td className='px-6 py-4 text-gray-500'>
                                                {category.id}
                                            </td>

                                            <td className='px-6 py-4'>
                                                <Button
                                                    variant='secondary'
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CategoriesPage
