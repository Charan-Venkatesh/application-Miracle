import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/MockAuthContext'
import { Search, Filter, Edit, Trash2, Mail, Phone, Users, TrendingUp, CheckCircle, Plus, MoreVertical } from 'lucide-react'

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
      // Get users from mock database
      const users = mockDB.users || []
      setEmployees(users)
    } catch (err) {
      setError(err.message || 'Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (email) => {
    if (!confirm('Are you sure you want to delete this employee?')) return

    try {
      mockDB.deleteUser(email)
      fetchEmployees()
      if (onDelete) onDelete()
    } catch (err) {
      alert('Failed to delete employee: ' + err.message)
    }
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || emp.role.toLowerCase() === filterRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-16 text-center shadow-sm">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-500 border-r-transparent"></div>
        <p className="mt-4 text-slate-600 font-medium text-sm">Loading employees...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-rose-200 p-8 shadow-sm">
        <div className="text-center text-rose-600 font-semibold">⚠️ Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1.5">Employee Directory</h2>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manage your workforce efficiently
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2.5 w-72 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all text-sm text-slate-700 placeholder-slate-400 shadow-sm"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all text-sm text-slate-700 appearance-none cursor-pointer shadow-sm"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all hover:scale-105">
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-sky-600 mb-1.5 uppercase tracking-wider">Total Staff</p>
              <p className="text-3xl font-bold text-slate-900">{filteredEmployees.length}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">active employees</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Users className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 mb-1.5 uppercase tracking-wider">Active Status</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm">100% Active</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">all employees online</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-violet-600 mb-1.5 uppercase tracking-wider">Performance</p>
              <p className="text-3xl font-bold text-slate-900">{filteredEmployees.length} <span className="text-base font-normal text-slate-400">/ {employees.length}</span></p>
              <p className="text-xs text-slate-500 mt-1 font-medium">filtered results</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Employee Details
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-lg font-bold text-slate-700">No employees found</p>
                    <p className="text-sm text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => {
                  return (
                    <tr 
                      key={employee.id} 
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
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
                            <div className="font-bold text-slate-800 text-sm">{employee.name}</div>
                            <div className="text-xs text-slate-500 font-semibold mt-0.5">ID: {employee.id.slice(0, 10)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div className="text-sm text-slate-700 flex items-center gap-2.5 font-medium">
                            <div className="p-1.5 bg-sky-100 rounded-lg">
                              <Mail className="h-3.5 w-3.5 text-sky-600" />
                            </div>
                            {employee.email}
                          </div>
                          <div className="text-sm text-slate-600 flex items-center gap-2.5 font-medium">
                            <div className="p-1.5 bg-slate-100 rounded-lg">
                              <Phone className="h-3.5 w-3.5 text-slate-600" />
                            </div>
                            {employee.phone || 'Not provided'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide shadow-sm ${
                            employee.role === 'admin'
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          }`}
                        >
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm">
                          <span className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEdit(employee)}
                            className="p-2.5 text-sky-600 hover:bg-sky-50 rounded-xl transition-all hover:scale-110"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.email)}
                            className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all hover:scale-110"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all hover:scale-110"
                            title="More options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-600 font-semibold">
              Showing <span className="text-sky-600">{filteredEmployees.length}</span> of <span className="text-sky-600">{employees.length}</span> employees
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Page</span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg text-xs shadow-sm">1</span>
              <span className="text-slate-500 font-medium">of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
