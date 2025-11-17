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
    // Must start with letter, only letters, spaces, hyphens, apostrophes allowed
    if (!/^[A-Za-z][A-Za-z\s'-]{1,49}$/.test(trimmedName)) {
      return 'Name must start with a letter and contain only letters, spaces, hyphens, or apostrophes'
    }
    // No multiple consecutive spaces
    if (/\s{2,}/.test(trimmedName)) {
      return 'Name cannot contain multiple consecutive spaces'
    }
    return null
  }

  const validatePhone = (phone) => {
    const trimmedPhone = phone.trim()
    if (!trimmedPhone) {
      return null // Phone is optional
    }
    // Remove all non-digit characters for validation
    const digitsOnly = trimmedPhone.replace(/\D/g, '')
    
    // Check if it's a valid international format (10-15 digits)
    if (!/^\+?[0-9]{10,15}$/.test(trimmedPhone.replace(/[\s\-\(\)\.]/g, ''))) {
      // If no + prefix, check for Indian format (starts with 6-9, exactly 10 digits)
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
    // Accept only valid characters
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
    // Check for @ symbol
    if (!trimmedEmail.includes('@')) {
      return 'Email must contain @ symbol'
    }
    // No spaces allowed
    if (/\s/.test(trimmedEmail)) {
      return 'Email cannot contain spaces'
    }
    // Standard email regex: must have chars before @, valid domain with . after @
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      return 'Invalid email format. Must be like user@domain.com'
    }
    return null
  }

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (password.length > 128) {
      return 'Password must not exceed 128 characters'
    }
    // Check for spaces
    if (/\s/.test(password)) {
      return 'Password cannot contain spaces'
    }
    // Strong password: at least one uppercase, one lowercase, one digit, one special char
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one digit'
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return 'Password must contain at least one special character (@$!%*?&)'
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

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setForm({ ...form, password })
    const error = validatePassword(password)
    setValidationErrors({ ...validationErrors, password: error })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate all fields
    const nameError = validateName(form.name)
    const emailError = validateEmail(form.email)
    const phoneError = validatePhone(form.phone)
    const passwordError = validatePassword(form.password)

    const errors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError
    }

    setValidationErrors(errors)

    // Check if there are any validation errors
    if (nameError || emailError || phoneError || passwordError) {
      setError('Please fix the validation errors before submitting')
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
                onChange={handleNameChange}
                placeholder="Enter full name"
                className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all shadow-sm hover:shadow-md font-medium ${
                  validationErrors.name 
                    ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                    : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
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
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>📧</span>
                <span>Email Address <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleEmailChange}
                placeholder="email@example.com"
                className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all shadow-sm hover:shadow-md font-medium ${
                  validationErrors.email 
                    ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                    : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
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
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>📱</span>
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handlePhoneChange}
                placeholder="+1 (555) 000-0000 or 9876543210"
                className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all shadow-sm hover:shadow-md font-medium ${
                  validationErrors.phone 
                    ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                    : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
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
                onChange={handlePasswordChange}
                placeholder="Min 8 chars: 1 uppercase, 1 lowercase, 1 digit, 1 special char"
                className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 transition-all shadow-sm hover:shadow-md font-medium ${
                  validationErrors.password 
                    ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500' 
                    : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                }`}
                required
                minLength={8}
              />
              {validationErrors.password && (
                <p className="mt-2 text-sm text-rose-600 font-semibold flex items-center gap-1">
                  <span>⚠️</span>
                  {validationErrors.password}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Must contain: uppercase, lowercase, digit, special character (@$!%*?&)
              </p>
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
