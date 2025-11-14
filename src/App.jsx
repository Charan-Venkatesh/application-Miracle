import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import Footer from './components/Footer'
import AddEmployee from './components/admin/AddEmployee'
import EmployeeGrid from './components/admin/EmployeeGrid'
import UpdateEmployee from './components/admin/UpdateEmployee'
import EmployeePortal from './components/employee/EmployeePortal'

export default function App() {
  const { user, employee, loading } = useAuth()
  const [view, setView] = useState('grid')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleEdit = (emp) => {
    setSelectedEmployee(emp)
    setView('update')
  }

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !employee) {
    return <Login />
  }

  if (employee.role === 'employee') {
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

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar active={view} onNavigate={setView} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader title={getTitle()} />

        <main className="flex-1 p-6 overflow-auto">
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
