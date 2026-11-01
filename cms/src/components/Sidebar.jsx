
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const menus = [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Products',
      path: '/products'
    },
    {
      name: 'Categories',
      path: '/categories'
    },
    {
      name: 'Add Staff',
      path: '/staff'
    }
  ]

  return (
    <aside className='w-64 min-h-screen bg-[#171714] text-white flex flex-col'>
      <div className='px-7 py-8 border-b border-white/10'>
        <h1 className='text-2xl font-serif tracking-[0.2em] text-[#c5a46d]'>
          BLUVERIE
        </h1>

        <p className='text-[10px] tracking-[0.3em] text-gray-400 mt-2'>
          CMS MANAGEMENT
        </p>
      </div>

      <nav className='flex-1 px-4 py-8 space-y-2'>
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) => `
              block px-4 py-3 text-sm tracking-wide transition duration-300
              ${
                isActive
                  ? 'bg-[#c5a46d] text-[#171714]'
                  : 'text-gray-300 hover:bg-white/10 hover:text-[#c5a46d]'
              }
            `}
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>

      <div className='px-7 py-6 border-t border-white/10'>
        <p className='text-xs text-gray-400'>
          Every Second Matters.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
