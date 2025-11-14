import { useAuth } from '../contexts/MockAuthContext'
import { useState } from 'react'
import { Search, Bell, Settings, User, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TopHeader({ title }) {
  const { employee, signOut } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-sm text-slate-500 font-medium">
                {employee?.role === 'admin' ? 'Administrator Portal' : 'Employee Portal'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-sky-300 transition-all duration-200 focus-within:ring-2 focus-within:ring-sky-100 focus-within:border-sky-400">
            <span className="text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-48"
            />
          </div>

          {/* Notifications */}
          <button className="relative hidden sm:flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 shadow-sm hover:shadow-md group">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="relative group">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ring-2 ring-white hover:scale-105">
                {getInitials(employee?.name)}
              </div>
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-slate-800">{employee?.name || 'User'}</div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="capitalize font-medium">{employee?.role || 'Employee'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span className="text-emerald-600 font-medium">Online</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2.5 text-sm font-semibold text-rose-600 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl hover:from-rose-100 hover:to-rose-200 transition-all duration-200 shadow-sm hover:shadow-md border border-rose-200 hover:border-rose-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
