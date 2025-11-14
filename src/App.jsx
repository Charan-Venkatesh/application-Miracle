import { useState } from 'react'
import { useAuth } from './contexts/MockAuthContext'
import Login from './pages/Login'
import Sidebar from './components/SidebarNew2'
import TopHeader from './components/TopHeaderNew2'
import Footer from './components/Footer'
import AddEmployee from './components/admin/AddEmployee'
import EmployeeGrid from './components/admin/EmployeeGridNew'
import UpdateEmployee from './components/admin/UpdateEmployee'
import EmployeePortal from './components/employee/EmployeePortal'

export default function App() {
  const { user, employee, loading } = useAuth()
  const [view, setView] = useState('grid')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  console.log('App rendering:', { user, employee, loading })

  const handleEdit = (emp) => {
    setSelectedEmployee(emp)
    setView('update')
  }

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  if (loading) {
    console.log('Loading state...')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-800 font-semibold text-lg">Loading Miracle Portal...</p>
        </div>
      </div>
    )
  }

  if (!user || !employee) {
    console.log('No user, showing login')
    return <Login />
  }

  if (employee.role === 'employee') {
    console.log('Rendering employee portal')
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <TopHeader title="Employee Portal" />
        <main className="flex-1 p-6">
          <EmployeePortal />
        </main>
        <Footer />
      </div>
    )
  }

  console.log('Rendering admin dashboard, view:', view)

  console.log('Rendering admin dashboard, view:', view)

  const getTitle = () => {
    switch (view) {
      case 'add':
        return 'Add Employee'
      case 'grid':
        return 'Employee Grid'
      case 'update':
        return 'Update Employee'
      default:
        return 'Dashboard'
    }
  }

  console.log('About to render admin layout with view:', view)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 to-slate-200">
      <Sidebar active={view} onNavigate={setView} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader title={getTitle()} />

        <main className="flex-1 p-6 overflow-auto bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {view === 'add' && <AddEmployee onSuccess={handleSuccess} />}
            {view === 'grid' && (
              <EmployeeGrid
                onEdit={handleEdit}
                onDelete={handleSuccess}
                refreshTrigger={refreshTrigger}
              />
            )}
            {view === 'update' && (
              <UpdateEmployee selected={selectedEmployee} onSuccess={handleSuccess} />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
