import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/MockAuthContext'
import { motion } from 'framer-motion'
import { Search, Filter, Edit, Trash2, Mail, Phone, Users, TrendingUp, CheckCircle, Plus } from 'lucide-react'

export default function EmployeeGrid({ onEdit, onDelete, refreshTrigger }) {
  const { mockDB } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  console.log('EmployeeGrid rendering, mockDB:', mockDB)

  useEffect(() => {
    console.log('EmployeeGrid useEffect triggered')
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
    const matchesSearch = emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || emp.role.toLowerCase() === filterRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-sky-500 border-r-transparent"></div>
        <p className="mt-4 text-slate-600 font-medium text-sm">Loading employees...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-rose-200 p-8">
        <div className="text-center text-rose-600 font-semibold">⚠️ Error: {error}</div>
      </div>
    )
  }

  return (
    <motion.div 
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Employee Grid</h2>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Administrator Portal
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="pl-9 pr-4 py-2 w-64 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition-all text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition-all text-sm text-slate-700 appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Add Button */}
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-medium text-sm shadow-sm hover:shadow-md transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="h-4 w-4" />
            Add
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div 
          className="bg-white border border-slate-200 rounded-lg p-4"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">EMPLOYEE DIRECTORY</p>
              <p className="text-2xl font-bold text-slate-900">{filteredEmployees.length}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">active employees</p>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center shadow-md shadow-sky-500/20">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white border border-slate-200 rounded-lg p-4"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">ROLE</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-md border border-sky-200">Active</span>
              </div>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white border border-slate-200 rounded-lg p-4"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">STATUS</p>
              <p className="text-2xl font-bold text-slate-900">{filteredEmployees.length} <span className="text-sm font-normal text-slate-400">of {employees.length}</span></p>
              <p className="text-[11px] text-slate-400 mt-0.5">filtered results</p>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-violet-500/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3.5 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3.5 text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-base font-semibold text-slate-700">No employees found</p>
                    <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee, index) => (
                  <motion.tr 
                    key={employee.email || index} 
                    className="hover:bg-slate-50/50 transition-colors group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                            {(employee.email || 'U')[0].toUpperCase()}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{employee.email}</div>
                          <div className="text-xs text-slate-500 font-medium">User ID: {index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-slate-700 flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          {employee.email}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          Not provided
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${
                          employee.role === 'admin'
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {employee.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          onClick={() => onEdit(employee)}
                          className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(employee.email)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-600 font-medium">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Page</span>
              <span className="px-3 py-1 bg-sky-500 text-white font-semibold rounded-md text-xs">1</span>
              <span className="text-slate-500">of 1</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
