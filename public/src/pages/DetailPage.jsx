
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://market.bluveri.web.id'

export default function DetailPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchProduct() {
      try {
        setLoading(true)
        setError('')
        setProduct(null)

        const { data } = await axios.get(
          `${API_URL}/pub/products/${id}`
        )

        if (!cancelled) {
          setProduct(data.data)
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error.response?.data?.message ||
            'Unable to load this timepiece.'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(price) || 0)
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0]">
        <span className="loading loading-spinner loading-lg text-[#9b7b46]" />
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f5f0] px-6 text-center text-[#171714]">
        <p className="font-serif text-3xl">
          Timepiece Not Found
        </p>

        <p className="mt-4 text-sm text-[#77756e]">
          {error || 'This timepiece could not be found.'}
        </p>

        <Link
          to="/"
          className="mt-8 border border-[#171714] px-6 py-3 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#171714] hover:text-white"
        >
          Back to Collection
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171714]">
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#77756e] transition-colors hover:text-[#9b7b46]"
        >
          <span aria-hidden="true">←</span>
          Back to Collection
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative overflow-hidden bg-[#ebe8e0]">
            <div className="aspect-[4/5]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {product.stock <= 3 && (
              <span className="absolute right-4 top-4 bg-[#171714]/90 px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-[#c5a46d]">
                Limited Stock
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b46]">
              {product.Category?.name || 'BLUVERIE Collection'}
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 text-2xl">
              {formatPrice(product.price)}
            </p>

            <div className="my-8 h-px bg-[#dedacf]" />

            <h2 className="text-xs uppercase tracking-[0.2em] text-[#9b7b46]">
              Description
            </h2>

            <p className="mt-4 text-sm leading-8 text-[#77756e]">
              {product.description || 'A timeless BLUVERIE timepiece.'}
            </p>

            <div className="mt-8 border-y border-[#dedacf] py-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.15em] text-[#77756e]">
                  Availability
                </span>

                <span className="text-sm">
                  {product.stock > 0
                    ? `${product.stock} Available`
                    : 'Out of Stock'}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.15em] text-[#77756e]">
                  Reference
                </span>

                <span className="text-sm">
                  BV-{String(product.id).padStart(3, '0')}
                </span>
              </div>
            </div>

            <p className="mt-8 text-xs leading-6 text-[#77756e]">
              BLUVERIE — Every Second Matters.
              Timeless design, crafted for every moment.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex w-fit border border-[#171714] px-7 py-4 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#171714] hover:text-[#f7f5f0]"
            >
              Explore More Timepieces
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#171714] px-6 py-12 text-center text-[#f7f5f0]">
        <p className="font-serif text-3xl tracking-[0.2em]">
          BLUVERIE
        </p>

        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#c5a46d]">
          Every Second Matters
        </p>

        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} BLUVERIE. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
