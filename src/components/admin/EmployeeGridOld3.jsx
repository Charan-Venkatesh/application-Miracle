import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/MockAuthContext'

export default function EmployeeGrid({ onEdit, onDelete, refreshTrigger }) {
  const { mockDB } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    fetchEmployees()
  }, [refreshTrigger])

  const fetchEmployees = async () => {
    setLoading(true)
    setError('')

    try {
      const { data, error } = await mockDB.employees
        .select()
        .order('created_at')

      if (error) throw error

      setEmployees(data || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return

    try {
      const { error } = await mockDB.employees.delete().eq('id', id)()

      if (error) throw error

      setEmployees(employees.filter((e) => e.id !== id))
      if (onDelete) onDelete()
    } catch (err) {
      alert('Failed to delete employee: ' + err.message)
    }
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || emp.role === filterRole
    return matchesSearch && matchesRole
  })

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-500 border-r-transparent"></div>
        <p className="mt-6 text-slate-600 font-semibold">Loading employees...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-rose-200 p-8">
        <div className="text-center text-rose-600 font-semibold">⚠️ Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white via-white to-slate-50 rounded-2xl shadow-2xl border border-slate-200/80">
      <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Employee Directory</h2>
            <p className="text-slate-600 mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">{filteredEmployees.length} active employees</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md w-full sm:w-64"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-sm hover:shadow-md"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="employee">Employees</option>
            </select>
            <button
              onClick={fetchEmployees}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-xl flex items-center gap-2 justify-center"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-8 py-5 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-16 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-lg font-semibold text-slate-700">No employees found</p>
                  <p className="text-sm text-slate-500 mt-2">Try adjusting your search or filters</p>
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gradient-to-r hover:from-sky-50/50 hover:to-blue-50/50 transition-all duration-200 group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-base font-bold text-white shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                          {employee.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-base">{employee.name}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">ID: {employee.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-700 font-medium flex items-center gap-2">
                        <span>📧</span>
                        {employee.email}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <span>📱</span>
                        {employee.phone || 'Not provided'}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${
                        employee.role === 'admin'
                          ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300'
                          : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300'
                      }`}
                    >
                      <span className="mr-1.5">{employee.role === 'admin' ? '👑' : '👤'}</span>
                      {employee.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(employee)}
                        className="px-5 py-2.5 text-sm font-bold text-sky-700 bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl hover:from-sky-100 hover:to-sky-200 transition-all duration-200 shadow-sm hover:shadow-md border border-sky-200"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="px-5 py-2.5 text-sm font-bold text-rose-700 bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl hover:from-rose-100 hover:to-rose-200 transition-all duration-200 shadow-sm hover:shadow-md border border-rose-200"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="font-medium">Showing {filteredEmployees.length} of {employees.length} employees</div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Page</span>
            <span className="px-3 py-1 bg-sky-100 text-sky-700 font-bold rounded-lg">1</span>
            <span className="text-slate-500">of 1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
