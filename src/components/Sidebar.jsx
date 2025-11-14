import Logo from './Logo'
import { useAuth } from '../contexts/MockAuthContext'

export default function Sidebar({ active, onNavigate }) {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  const menuItems = [
    { id: 'grid', label: 'Employee Grid', icon: '📋' },
    { id: 'add', label: 'Add Employee', icon: '➕' },
    { id: 'update', label: 'Update Employee', icon: '✏️' },
  ]

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 min-h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <Logo animate={false} />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-2 mb-2">Main Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`group w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${
              active === item.id
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/50 scale-105'
                : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1'
            }`}
          >
            <span className={`text-xl transition-transform duration-300 ${
              active === item.id ? 'scale-110' : 'group-hover:scale-110'
            }`}>{item.icon}</span>
            <span>{item.label}</span>
            {active === item.id && (
              <span className="absolute right-3 h-2 w-2 rounded-full bg-white animate-pulse"></span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="mb-4 p-4 bg-gradient-to-br from-sky-500/10 to-blue-600/10 rounded-xl border border-sky-500/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💼</span>
            <span className="text-xs font-semibold text-slate-300">Quick Stats</span>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-xs text-slate-400">Total Employees</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl border border-rose-400/20"
        >
          <span className="flex items-center justify-center gap-2">
            <span>🚪</span>
            <span>Logout</span>
          </span>
        </button>
      </div>
    </aside>
  )
}
