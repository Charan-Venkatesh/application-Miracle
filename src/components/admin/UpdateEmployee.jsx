import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function UpdateEmployee({ selected, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        email: selected.email,
        phone: selected.phone || '',
        role: selected.role,
      })
      setError('')
      setSuccess('')
    }
  }, [selected])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.email) {
      setError('Name and email are required')
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase
        .from('employees')
        .update({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        })
        .eq('id', selected.id)

      if (updateError) throw updateError

      setSuccess('Employee updated successfully!')
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message || 'Failed to update employee')
    } finally {
      setLoading(false)
    }
  }

  if (!selected) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="text-5xl mb-4">👤</div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No Employee Selected</h3>
        <p className="text-slate-600">
          Please select an employee from the Employee Grid to update their information
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Update Employee Information</h2>
        <p className="text-slate-600 mt-1">Modify employee details and role</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Role <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold">Employee ID:</span>
          <code className="px-3 py-1 bg-slate-100 rounded font-mono text-xs">{selected.id}</code>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600 mt-2">
          <span className="font-semibold">Created:</span>
          <span>{new Date(selected.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
