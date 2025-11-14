import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/MockAuthContext'
import { Search, Plus, Menu, Edit, LogOut, Users } from 'lucide-react'

export default function App() {
  const { user, employee, loading, signOut } = useAuth()
  const [view, setView] = useState('grid')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-700 font-semibold">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!user || !employee) {
    return <Login />
  }

  if (employee.role === 'employee') {
    return <EmployeePortal />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-64 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col"
        >
          {/* Logo Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 mb-8 border border-blue-400/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl border-4 border-white/20">
                30
              </div>
              <div className="text-white text-xs leading-tight">
                <div className="font-semibold">Celebrating 30</div>
                <div className="text-blue-200">years of</div>
                <div className="text-blue-200">OPEx Silence</div>
              </div>
            </div>
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              Miracle<br />Software<br />Systems
            </h2>
          </motion.div>

          {/* Menu */}
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Main Menu
            </div>
            <nav className="space-y-2">
              {[
                { id: 'grid', label: 'Employee Grid', icon: Users },
                { id: 'add', label: 'Add Employee', icon: Plus },
                { id: 'update', label: 'Update Employee', icon: Edit },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => setView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    view === item.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-700/50 rounded-xl p-4 mb-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">3</div>
              <div className="text-xs text-slate-400">Quick Stats</div>
            </div>
            <div className="text-xs text-slate-400">Total Employees</div>
          </motion.div>

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={signOut}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl m-6 mb-0 p-6 flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
                30
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Miracle Software Systems</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{employee.name}</div>
                  <div className="text-xs text-slate-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Online
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Menu className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </motion.header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {view === 'grid' && <ModernEmployeeGrid onEdit={(emp) => { setSelectedEmployee(emp); setView('update'); }} onDelete={() => setRefreshTrigger(prev => prev + 1)} refreshTrigger={refreshTrigger} />}
              {view === 'add' && <ModernAddEmployee onSuccess={() => setRefreshTrigger(prev => prev + 1)} />}
              {view === 'update' && <ModernUpdateEmployee selected={selectedEmployee} onSuccess={() => setRefreshTrigger(prev => prev + 1)} />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

// Modern Employee Grid Component
function ModernEmployeeGrid({ onEdit, onDelete, refreshTrigger }) {
  const { mockDB } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    fetchEmployees()
  }, [refreshTrigger])

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const { data } = await mockDB.employees.select().order('created_at')
      setEmployees(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || emp.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    try {
      await mockDB.employees.delete().eq('id', id)()
      setEmployees(employees.filter(e => e.id !== id))
      if (onDelete) onDelete()
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-slate-50 p-8 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-6 h-6 text-slate-600" />
              <h2 className="text-3xl font-bold text-slate-900">Employee Grid</h2>
            </div>
            <p className="text-slate-600">👤 Administrator Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            <button className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Employee Directory Header */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Employee Directory</h3>
            <p className="text-slate-600">{filteredEmployees.length} active employees</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600 font-semibold">ROLE</div>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Active
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 rounded-xl mb-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <div className="col-span-3">EMPLOYEE</div>
          <div className="col-span-3">CONTACT</div>
          <div className="col-span-2">ROLE</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-2 text-center">ACTIONS</div>
        </div>

        {/* Employee Rows */}
        <div className="space-y-3">
          {filteredEmployees.map((emp, index) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 px-6 py-5 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors items-center"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${
                  emp.role === 'admin' ? 'bg-gradient-to-br from-purple-400 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'
                } flex items-center justify-center text-white font-bold text-lg`}>
                  {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{emp.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Online
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-sm text-slate-900">{emp.email}</div>
                <div className="text-xs text-slate-600">📞 {emp.phone || '+1-555-0100'}</div>
              </div>
              <div className="col-span-2">
                <span className={`inline-block px-4 py-2 rounded-lg text-xs font-bold ${
                  emp.role === 'admin' ? 'bg-purple-500 text-white' : 'bg-blue-400 text-white'
                }`}>
                  {emp.role.toUpperCase()}
                </span>
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => onEdit(emp)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1 text-sm font-semibold"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <div>Showing {filteredEmployees.length} of {employees.length} employees</div>
          <div className="flex items-center gap-2">
            <span>Page</span>
            <span className="font-bold">1</span>
            <span>of 1</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Import statements at top
import Login from './pages/Login'
import EmployeePortal from './components/employee/EmployeePortal'
import ModernAddEmployee from './components/admin/AddEmployee'
import ModernUpdateEmployee from './components/admin/UpdateEmployee'
