import { useAuth } from '../contexts/AuthContext'

export default function TopHeader({ title }) {
  const { employee } = useAuth()

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {employee?.role === 'admin' ? 'Administrator Portal' : 'Employee Portal'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
            <span>🔔</span>
            <span>Notifications</span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-sm font-semibold text-white shadow-md">
              {getInitials(employee?.name)}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-slate-800">{employee?.name || 'User'}</div>
              <div className="text-xs text-slate-500 capitalize">{employee?.role || 'Employee'}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
