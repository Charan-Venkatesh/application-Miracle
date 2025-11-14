import { useState } from 'react'
import { useAuth } from '../../contexts/MockAuthContext'

export default function AddEmployee({ onSuccess }) {
  const { signUp, mockDB } = useAuth()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.email || !form.password) {
      setError('Name, email, and password are required')
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await signUp(
        form.email,
        form.password,
        form.name,
        form.role
      )

      if (authError) throw authError

      setSuccess('✅ Employee added successfully!')
      setForm({ name: '', email: '', phone: '', role: 'employee', password: '' })
      setTimeout(() => setSuccess(''), 3000)
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message || 'Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-white via-white to-slate-50 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
      <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-600">
        <h2 className="text-3xl font-bold text-white mb-2">Add New Employee</h2>
        <p className="text-sky-100">Create a new employee account with login credentials</p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 p-5 bg-gradient-to-r from-rose-50 to-rose-100 border-l-4 border-rose-500 rounded-xl text-rose-700 font-semibold flex items-center gap-3 shadow-lg animate-shake">
            <span className="text-2xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 rounded-xl text-emerald-700 font-semibold flex items-center gap-3 shadow-lg animate-bounce">
            <span className="text-2xl">✅</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>👤</span>
                <span>Full Name <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter full name"
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>📧</span>
                <span>Email Address <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>📱</span>
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>👑</span>
                <span>Role <span className="text-rose-500">*</span></span>
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md font-bold text-slate-700 bg-white"
                required
              >
                <option value="employee">👤 Employee</option>
                <option value="admin">👑 Administrator</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>🔒</span>
                <span>Password <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 6 characters"
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md font-medium"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl hover:from-sky-600 hover:to-blue-700 focus:ring-4 focus:ring-sky-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Employee...</span>
                </>
              ) : (
                <>
                  <span>➕</span>
                  <span>Add Employee</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setForm({ name: '', email: '', phone: '', role: 'employee', password: '' })}
              className="px-8 py-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-bold rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-200 shadow-md hover:shadow-lg border border-slate-300"
            >
              🔄 Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
