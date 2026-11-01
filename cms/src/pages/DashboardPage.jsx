
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'

function DashboardPage() {
    const [summaries, setSummaries] = useState([
        {
            title: 'Total Products',
            value: '...',
            description: 'Products available'
        },
        {
            title: 'Total Categories',
            value: '...',
            description: 'Categories available'
        }
    ])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                setError('')

                const headers = {
                    Authorization: `Bearer ${token}`
                }

                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        axios.get(
                            'https://market.bluveri.web.id/products',
                            { headers }
                        ),
                        axios.get(
                            'https://market.bluveri.web.id/categories',
                            { headers }
                        )
                    ])

                const products = productsResponse.data.data || []
                const categories = categoriesResponse.data.categories || []

                setSummaries([
                    {
                        title: 'Total Products',
                        value: products.length.toLocaleString(),
                        description: 'Products available'
                    },
                    {
                        title: 'Total Categories',
                        value: categories.length.toLocaleString(),
                        description: 'Categories available'
                    }
                ])
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Failed to load dashboard data.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    return (
        <div className='flex min-h-screen bg-[#f7f5f0]'>
            <Sidebar />

            <main className='flex-1 min-w-0 p-8 lg:p-12'>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10'>
                    <div>
                        <p className='text-xs tracking-[0.3em] text-[#9b7b46] mb-2'>
                            OVERVIEW
                        </p>

                        <h1 className='text-3xl font-serif text-[#171714]'>
                            Dashboard
                        </h1>

                        <p className='text-sm text-gray-500 mt-2'>
                            Welcome to BLUVERIE management system.
                        </p>
                    </div>

                    <Button variant='secondary'>
                        Every Second Matters
                    </Button>
                </div>

                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-600 p-4 mb-6 text-sm'>
                        {error}
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {summaries.map((item) => (
                        <div
                            key={item.title}
                            className='bg-white border border-[#e8e3d9] p-7'
                        >
                            <p className='text-sm text-gray-500'>
                                {item.title}
                            </p>

                            <h2 className='text-4xl font-serif text-[#171714] mt-4'>
                                {loading && item.value !== '—'
                                    ? '...'
                                    : item.value}
                            </h2>

                            <p className='text-xs text-gray-400 mt-3'>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <section className='mt-10 bg-white border border-[#e8e3d9] p-8'>
                    <p className='text-xs tracking-[0.3em] text-[#9b7b46] mb-3'>
                        BLUVERIE MANAGEMENT
                    </p>

                    <h2 className='text-2xl font-serif text-[#171714]'>
                        Manage Your Collection
                    </h2>

                    <p className='text-sm text-gray-500 mt-3 max-w-xl'>
                        Manage your watch collection, organize product categories,
                        and maintain your staff accounts through this dashboard.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default DashboardPage
