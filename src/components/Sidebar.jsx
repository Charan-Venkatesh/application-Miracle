import Logo from './Logo'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar({ active, onNavigate }) {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  const menuItems = [
    { id: 'add', label: 'Add Employee', icon: '➕' },
    { id: 'grid', label: 'Employee Grid', icon: '📋' },
    { id: 'update', label: 'Employee Update', icon: '✏️' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
              active === item.id
                ? 'bg-sky-50 text-sky-700 shadow-sm'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
