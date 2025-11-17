import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/MockAuthContext'

export default function UpdateEmployee({ selected, onSuccess }) {
  const { mockDB } = useAuth()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const validateName = (name) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return 'Name is required'
    }
    if (trimmedName.length < 2) {
      return 'Name must be at least 2 characters'
    }
    if (trimmedName.length > 50) {
      return 'Name must not exceed 50 characters'
    }
    if (!/^[A-Za-z][A-Za-z\s'-]{1,49}$/.test(trimmedName)) {
      return 'Name must start with a letter and contain only letters, spaces, hyphens, or apostrophes'
    }
    if (/\s{2,}/.test(trimmedName)) {
      return 'Name cannot contain multiple consecutive spaces'
    }
    return null
  }

  const validatePhone = (phone) => {
    const trimmedPhone = phone.trim()
    if (!trimmedPhone) {
      return null
    }
    const digitsOnly = trimmedPhone.replace(/\D/g, '')
    if (!/^\+?[0-9]{10,15}$/.test(trimmedPhone.replace(/[\s\-\(\)\.]/g, ''))) {
      if (!trimmedPhone.startsWith('+') && !/^[6-9]\d{9}$/.test(digitsOnly)) {
        return 'Invalid phone number. Use 10 digits starting with 6-9 or international format with +'
      }
    }
    if (digitsOnly.length < 10) {
      return 'Phone number must be at least 10 digits'
    }
    if (digitsOnly.length > 15) {
      return 'Phone number must not exceed 15 digits'
    }
    if (!/^[\d\s\-\(\)\+\.]+$/.test(trimmedPhone)) {
      return 'Phone number contains invalid characters'
    }
    return null
  }

  const validateEmail = (email) => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      return 'Email is required'
    }
    if (trimmedEmail.length < 3 || trimmedEmail.length > 254) {
      return 'Email must be between 3 and 254 characters'
    }
    if (!trimmedEmail.includes('@')) {
      return 'Email must contain @ symbol'
    }
    if (/\s/.test(trimmedEmail)) {
      return 'Email cannot contain spaces'
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      return 'Invalid email format. Must be like user@domain.com'
    }
    return null
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setForm({ ...form, name })
    const error = validateName(name)
    setValidationErrors({ ...validationErrors, name: error })
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    setForm({ ...form, email })
    const error = validateEmail(email)
    setValidationErrors({ ...validationErrors, email: error })
  }

  const handlePhoneChange = (e) => {
    const phone = e.target.value
    setForm({ ...form, phone })
    const error = validatePhone(phone)
    setValidationErrors({ ...validationErrors, phone: error })
  }

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
      setValidationErrors({})
    }
  }, [selected])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const nameError = validateName(form.name)
    const emailError = validateEmail(form.email)
    const phoneError = validatePhone(form.phone)

    const errors = {
      name: nameError,
      email: emailError,
      phone: phoneError
    }

    setValidationErrors(errors)

    if (nameError || emailError || phoneError) {
      setError('Please fix the validation errors before submitting')
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await mockDB.employees
        .update({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        })
        .eq('id', selected.id)
        .select()
        .single()

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
              onChange={handleNameChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                validationErrors.name 
                  ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                  : 'border-slate-300 focus:ring-sky-500 focus:border-sky-500'
              }`}
              required
            />
            {validationErrors.name && (
              <p className="mt-2 text-sm text-rose-600 font-semibold flex items-center gap-1">
                <span>⚠️</span>
                {validationErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleEmailChange}
              placeholder="email@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                validationErrors.email 
                  ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                  : 'border-slate-300 focus:ring-sky-500 focus:border-sky-500'
              }`}
              required
            />
            {validationErrors.email && (
              <p className="mt-2 text-sm text-rose-600 font-semibold flex items-center gap-1">
                <span>⚠️</span>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="+1 (555) 000-0000 or 9876543210"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                validationErrors.phone 
                  ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                  : 'border-slate-300 focus:ring-sky-500 focus:border-sky-500'
              }`}
            />
            {validationErrors.phone && (
              <p className="mt-2 text-sm text-rose-600 font-semibold flex items-center gap-1">
                <span>⚠️</span>
                {validationErrors.phone}
              </p>
            )}
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
