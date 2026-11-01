
import { useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

function StaffPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const token = localStorage.getItem('access_token')

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            setError('')
            setSuccess('')

            const response = await axios.post(
                'https://market.bluveri.web.id/add-user',
                {
                    ...form,
                    role: 'staff'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSuccess(
                response.data.message || 'Staff created successfully.'
            )

            setForm({
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: ''
            })
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to create staff account.'
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
                        USER MANAGEMENT
                    </p>

                    <h1 className='text-3xl font-serif text-[#171714]'>
                        Staff Management
                    </h1>

                    <p className='text-sm text-gray-500 mt-2'>
                        Create and manage BLUVERIE staff accounts.
                    </p>
                </div>

                <div className='bg-white border border-[#e8e3d9] p-6 lg:p-8 max-w-4xl'>
                    <div className='mb-8'>
                        <h2 className='text-xl font-serif text-[#171714]'>
                            Add New Staff
                        </h2>

                        <p className='text-sm text-gray-500 mt-1'>
                            Fill in the information below to create a staff account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-sm text-[#171714] mb-2'>
                                    Username
                                </label>

                                <input
                                    type='text'
                                    name='username'
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder='Enter username'
                                    required
                                    className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#9b7b46]'
                                />
                            </div>

                            <div>
                                <label className='block text-sm text-[#171714] mb-2'>
                                    Email Address
                                </label>

                                <input
                                    type='email'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder='Enter email address'
                                    required
                                    className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#9b7b46]'
                                />
                            </div>

                            <div>
                                <label className='block text-sm text-[#171714] mb-2'>
                                    Password
                                </label>

                                <input
                                    type='password'
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder='Enter password'
                                    required
                                    className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#9b7b46]'
                                />
                            </div>

                            <div>
                                <label className='block text-sm text-[#171714] mb-2'>
                                    Phone Number
                                </label>

                                <input
                                    type='tel'
                                    name='phoneNumber'
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    placeholder='Enter phone number'
                                    required
                                    className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#9b7b46]'
                                />
                            </div>

                            <div className='lg:col-span-2'>
                                <label className='block text-sm text-[#171714] mb-2'>
                                    Address
                                </label>

                                <textarea
                                    name='address'
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder='Enter staff address'
                                    rows='4'
                                    required
                                    className='w-full border border-[#e3dfd5] px-4 py-3 text-sm outline-none focus:border-[#9b7b46] resize-none'
                                />
                            </div>
                        </div>

                        <div className='mt-6 p-4 bg-[#f7f5f0] border border-[#e8e3d9]'>
                            <p className='text-xs tracking-wider text-[#9b7b46] mb-1'>
                                ACCOUNT ROLE
                            </p>

                            <p className='text-sm font-medium text-[#171714]'>
                                Staff
                            </p>

                            <p className='text-xs text-gray-500 mt-1'>
                                This account will be registered with the Staff role.
                            </p>
                        </div>

                        {error && (
                            <p className='text-sm text-red-600 mt-6'>
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className='text-sm text-green-700 mt-6'>
                                {success}
                            </p>
                        )}

                        <div className='flex justify-end mt-8 pt-6 border-t border-[#e8e3d9]'>
                            <Button
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Staff'}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default StaffPage
