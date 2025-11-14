import { useAuth } from '../contexts/MockAuthContext'
import { LayoutDashboard, Users, UserPlus, Settings, TrendingUp, BarChart3, FileText, HelpCircle } from 'lucide-react'

const LOGO_URL = 'https://images.miraclesoft.com/me-portal/email-signature/30years.png'

export default function Sidebar({ active, onNavigate }) {
  const { mockDB } = useAuth()

  const menuItems = [
    { id: 'grid', label: 'Employee Directory', icon: Users, badge: mockDB?.users?.length },
    { id: 'add', label: 'Add Employee', icon: UserPlus },
    { id: 'update', label: 'Update Employee', icon: Settings },
  ]

  const secondaryItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
  ]

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700/50">
      {/* Brand Section with Logo */}
      <div className="p-6 bg-white/5 backdrop-blur-sm border-b border-slate-700/50">
        <div className="bg-white rounded-2xl p-4 shadow-xl">
          <img 
            src={LOGO_URL} 
            alt="Miracle Software 30 Years" 
            className="w-full h-auto"
          />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold text-white tracking-wide">Admin Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Employee Management System</p>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Main Menu</p>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = active === item.id
              const Icon = item.icon
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30' 
                      : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'}`} />
                  <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Analytics</p>
          <div className="space-y-1">
            {secondaryItems.map((item) => {
              const Icon = item.icon
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-700/70 hover:text-white group"
                >
                  <Icon className="h-5 w-5 text-slate-400 group-hover:text-sky-400" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="px-3 mt-auto">
          <div className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-5 border border-sky-500/30 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-sky-500/30 rounded-xl">
                <TrendingUp className="h-5 w-5 text-sky-300" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Staff</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{mockDB?.users?.length || 0}</span>
              <span className="text-sm text-sky-300 font-medium mb-1">Employees</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
              <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-1.5 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Active this month</p>
          </div>
        </div>
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-slate-700/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700/70 hover:text-white transition-all duration-200 group">
          <HelpCircle className="h-5 w-5 text-slate-400 group-hover:text-sky-400" />
          <span className="font-medium text-sm">Help & Support</span>
        </button>
      </div>
    </aside>
  )
}
