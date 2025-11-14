import { useState } from 'react'
import { useAuth } from '../contexts/MockAuthContext'
import { Bell, Search, Settings, LogOut, User, Shield, ChevronDown } from 'lucide-react'

const LOGO_URL = 'https://images.miraclesoft.com/me-portal/email-signature/30years.png'

export default function TopHeader({ title }) {
  const { user, employee, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 backdrop-blur-xl bg-white/95 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left Section - Logo & Search */}
        <div className="flex items-center gap-8">
          <img 
            src={LOGO_URL}
            alt="Miracle Software 30 Years" 
            className="h-12 w-auto"
          />
          
          {/* Global Search */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-11 pr-4 py-2.5 w-80 bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 focus:bg-white transition-all duration-200 text-sm text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2.5 hover:bg-slate-50 rounded-xl transition-colors duration-200 group">
            <Bell className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors duration-200 group">
            <Settings className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-slate-200"></div>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                  {employee?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="text-left hidden xl:block">
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  {employee?.role || user?.role || 'Admin'}
                  {(employee?.role === 'admin' || user?.role === 'admin') && (
                    <Shield className="h-3.5 w-3.5 text-amber-500" />
                  )}
                </div>
                <div className="text-xs text-slate-500">{employee?.email || user?.email}</div>
              </div>

              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200/80 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="text-sm font-semibold text-slate-800">{employee?.name || 'Administrator'}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{employee?.email || user?.email}</div>
                </div>
                
                <div className="py-1">
                  <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <User className="h-4 w-4 text-slate-400" />
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <Settings className="h-4 w-4 text-slate-400" />
                    Settings
                  </button>
                </div>

                <div className="border-t border-slate-100 py-1">
                  <button 
                    onClick={signOut}
                    className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
