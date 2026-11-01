import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://market.bluveri.web.id'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'oldest', label: 'Oldest' },
]

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const [totalData, setTotalData] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(`${API_URL}/pub/categories`)

        setCategories(data.categories || [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')

        const sort = sortBy === 'newest' ? 'DESC' : 'ASC'

        const { data } = await axios.get(`${API_URL}/pub/products`, {
          params: {
            search: search.trim() || undefined,
            category: selectedCategory === 'All'
              ? undefined
              : selectedCategory,
            sort,
            page: currentPage,
          },
        })

        setProducts(data.data || [])
        setTotalData(data.totalData || 0)
        setTotalPages(data.totalPage || 1)
      } catch (error) {
        console.error('Failed to fetch products:', error)

        setProducts([])
        setTotalData(0)
        setTotalPages(1)

        setError(
          error.response?.data?.message ||
          'Unable to load timepieces. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, selectedCategory, sortBy, currentPage])

  // Client-side Price Sorting
  const displayedProducts = useMemo(() => {
    const sorted = [...products]

    if (sortBy === 'price-low') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price))
    }

    if (sortBy === 'price-high') {
      sorted.sort((a, b) => Number(b.price) - Number(a.price))
    }

    return sorted
  }, [products, sortBy])

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleCategory = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSort = (value) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearch('')
    setSelectedCategory('All')
    setSortBy('newest')
    setCurrentPage(1)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(price) || 0)
  }

  const activeSortLabel = sortOptions.find(
    (option) => option.value === sortBy
  )?.label

  return (
    <main id="home" className="min-h-screen bg-[#f7f5f0] text-[#171714]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#171714] px-6 py-20 text-[#f7f5f0] md:px-12 md:py-28">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-[#c5a46d]/20" />

        <div className="pointer-events-none absolute -right-10 -top-14 h-60 w-60 rounded-full border border-[#c5a46d]/20" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-[#c5a46d]">
            BLUVERIE — Fine Timepieces
          </p>

          <h1 className="max-w-4xl font-serif text-5xl leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Every Second
            <span className="block italic text-[#c5a46d]">
              Matters.
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/60 md:text-base">
              A timeless expression of precision, craftsmanship,
              and understated elegance. Discover the art of
              exceptional watchmaking.
            </p>

            <a
              href="#collection"
              className="inline-flex w-fit items-center gap-4 border-b border-[#c5a46d] pb-3 text-xs uppercase tracking-[0.2em] transition-colors hover:text-[#c5a46d]"
            >
              Explore Collection
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24"
      >
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9b7b46]">
              The Art of Time
            </p>

            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
              Our Collection
            </h2>

            <p className="mt-3 text-sm text-[#77756e]">
              Exceptional timepieces, made to be remembered.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.15em] text-[#77756e]">
            {totalData} Timepieces
          </p>
        </div>

        {/* Search */}
        <div className="mb-7">
          <label className="flex w-full max-w-md items-center gap-3 border-b border-[#d9d5ca] py-3 transition-colors focus-within:border-[#9b7b46]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 text-[#77756e]"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search timepieces..."
              aria-label="Search timepieces"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#a5a197]"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch('')}
                className="text-xs text-[#77756e] hover:text-black"
              >
                Clear
              </button>
            )}
          </label>
        </div>

        {/* Category Filter & Sort */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategory('All')}
              className={`border px-4 py-2.5 text-xs tracking-wide transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'border-[#171714] bg-[#171714] text-[#f7f5f0]'
                  : 'border-[#dedacf] bg-transparent text-[#66645d] hover:border-[#9b7b46] hover:text-[#9b7b46]'
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategory(String(category.id))}
                className={`border px-4 py-2.5 text-xs tracking-wide transition-all duration-300 ${
                  selectedCategory === String(category.id)
                    ? 'border-[#171714] bg-[#171714] text-[#f7f5f0]'
                    : 'border-[#dedacf] bg-transparent text-[#66645d] hover:border-[#9b7b46] hover:text-[#9b7b46]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2 rounded-none border-b border-[#dedacf] bg-transparent px-2 text-xs font-normal uppercase tracking-[0.15em] text-[#171714] shadow-none hover:border-[#9b7b46] hover:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>

              <span>Sort By</span>

              <span className="text-[#9b7b46]">
                {activeSortLabel}
              </span>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-56 border border-[#e3dfd5] bg-[#f7f5f0] p-2 text-sm shadow-xl"
            >
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSort(option.value)}
                    className={`rounded-none py-3 ${
                      sortBy === option.value
                        ? 'bg-[#171714] text-[#c5a46d]'
                        : 'text-[#55534c] hover:bg-[#ebe8e0]'
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#9b7b46]" />
          </div>
        ) : error ? (
          <div className="border-y border-[#dedacf] py-20 text-center">
            <p className="font-serif text-2xl">
              Unable to Load Collection
            </p>

            <p className="mt-3 text-sm text-[#77756e]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => page)}
              className="mt-6 border border-[#171714] px-5 py-3 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#171714] hover:text-white"
            >
              Retry
            </button>
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedProducts.map((product) => (
              <article className="group">
                <div className="relative overflow-hidden bg-[#ebe8e0]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute left-4 top-4">
                    <span className="inline-block bg-[#f7f5f0]/90 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-[#5b503d]">
                      {product.Category?.name || 'Timepiece'}
                    </span>
                  </div>

                  {product.stock <= 3 && (
                    <div className="absolute right-4 top-4">
                      <span className="bg-[#171714]/90 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#c5a46d]">
                        Limited Stock
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    aria-label={`Explore ${product.name}`}
                    title="Explore product"
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[#f7f5f0] text-xl text-[#171714] opacity-0 transition-all duration-300 hover:bg-[#c5a46d] group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
                  >
                    ↗
                  </button>
                </div>

                <div className="border-b border-[#e3dfd5] py-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg transition-colors group-hover:text-[#9b7b46]">
                      {product.name}
                    </h3>

                    <p className="shrink-0 pt-1 text-sm font-medium">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs leading-6 text-[#77756e]">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[#8b887f]">
                    <span>
                      {product.stock > 0
                        ? `${product.stock} Available`
                        : 'Out of Stock'}
                    </span>

                    <span>
                      Ref. BV-{String(product.id).padStart(3, '0')}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-y border-[#dedacf] py-20 text-center">
            <p className="font-serif text-2xl">
              No timepieces found
            </p>

            <p className="mt-3 text-sm text-[#77756e]">
              Try another search or select a different category.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 border border-[#171714] px-5 py-3 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#171714] hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalData > 0 && (
          <div className="mt-14 flex items-center justify-center gap-5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-10 w-10 items-center justify-center border border-[#dedacf] transition-colors hover:border-[#171714] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous page"
            >
              ←
            </button>

            <span className="text-xs uppercase tracking-[0.2em]">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-10 w-10 items-center justify-center border border-[#dedacf] transition-colors hover:border-[#171714] disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
