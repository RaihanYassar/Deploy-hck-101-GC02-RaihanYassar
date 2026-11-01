
export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[#e3dfd5] bg-[#f7f5f0]/95 backdrop-blur-md">
      <div className="navbar mx-auto min-h-20 max-w-7xl px-5 md:px-10">

        {/* Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-4 w-52 border border-[#e3dfd5] bg-[#f7f5f0] p-3 shadow-xl"
            >
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#collection">Collection</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
            </ul>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#home"
              className="text-xs uppercase tracking-[0.18em] text-[#55534c] transition-colors hover:text-[#9b7b46]"
            >
              Home
            </a>
          </div>
        </div>

        {/* Brand Logo */}
        <div className="navbar-center">
          <a
            href="#home"
            className="flex flex-col items-center leading-none"
          >
            <span className="font-serif text-3xl font-semibold tracking-[0.12em] text-[#171714]">
              BV
            </span>

            <span className="mt-1 text-[8px] tracking-[0.35em] text-[#9b7b46]">
              BLUVERIE
            </span>
          </a>
        </div>

        {/* Right Navigation */}
        <div className="navbar-end">
          <a
            href="#collection"
            className="border border-[#171714] px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#171714] transition-all duration-300 hover:bg-[#171714] hover:text-[#f7f5f0] md:px-6"
          >
            Discover
          </a>
        </div>

      </div>
    </div>
  )
}
