
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'

function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError('')

            const response = await axios.post(
                'https://market.bluveri.web.id/login',
                {
                    email,
                    password
                }
            )

            const token = response.data.access_token

            if (!token) {
                throw new Error('Access token tidak ditemukan')
            }

            localStorage.setItem('access_token', token)

            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.error(err)

            setError(
                err.response?.data?.message ||
                err.message ||
                'Login gagal. Periksa email dan password.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#f7f5f0] px-5 py-10'>

            <div className='w-full max-w-md'>

                <div className='text-center mb-10'>
                    <h1 className='text-4xl font-serif tracking-[0.25em] text-[#171714]'>
                        BLUVERIE
                    </h1>

                    <p className='text-[10px] tracking-[0.4em] text-[#9b7b46] mt-3'>
                        EVERY SECOND MATTERS
                    </p>
                </div>

                <div className='bg-white border border-[#e5e0d6] shadow-xl px-8 py-10 sm:px-10'>

                    <div className='mb-8'>
                        <h2 className='text-2xl font-serif text-[#171714]'>
                            Welcome Back
                        </h2>

                        <p className='text-sm text-gray-500 mt-2'>
                            Sign in to your BLUVERIE administration panel.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className='space-y-6'>

                        <div>
                            <label className='block text-xs font-medium tracking-wider text-[#555] mb-2'>
                                EMAIL ADDRESS
                            </label>

                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                required
                                className='w-full border border-[#dedbd3] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#9b7b46]'
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-medium tracking-wider text-[#555] mb-2'>
                                PASSWORD
                            </label>

                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password'
                                required
                                className='w-full border border-[#dedbd3] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#9b7b46]'
                            />
                        </div>

                        {error && (
                            <div className='border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
                                {error}
                            </div>
                        )}

                        <Button
                            type='submit'
                            disabled={loading}
                            className='w-full'
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>

                    </form>

                    <div className='mt-8 border-t border-[#eeeae2] pt-6 text-center'>
                        <p className='text-[10px] tracking-[0.2em] text-gray-400'>
                            BLUVERIE MANAGEMENT SYSTEM
                        </p>
                    </div>

                </div>

                <p className='text-center text-xs text-gray-400 mt-8'>
                    © 2026 BLUVERIE. All Rights Reserved.
                </p>

            </div>

        </div>
    )
}

export default LoginPage
