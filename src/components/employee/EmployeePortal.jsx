import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/MockAuthContext'

export default function EmployeePortal() {
  const { employee, mockDB } = useAuth()
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    setLoading(true)
    try {
      const { data, error } = await mockDB.employees
        .select()
        .order('name')

      if (error) throw error

      setTeam(data || [])
    } catch (err) {
      console.error('Error fetching team:', err)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {getInitials(employee?.name)}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{employee?.name}</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">Role:</span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    employee?.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {employee?.role}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">Email:</span>
                <a href={`mailto:${employee?.email}`} className="text-sky-600 hover:underline">
                  {employee?.email}
                </a>
              </div>
              {employee?.phone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-semibold">Phone:</span>
                  <a href={`tel:${employee?.phone}`} className="text-sky-600 hover:underline">
                    {employee?.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Team Directory</h3>
            <p className="text-slate-600 mt-1">Connect with your colleagues</p>
          </div>
          <button
            onClick={fetchTeam}
            className="px-4 py-2 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 font-medium transition-colors duration-200"
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading team members...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className={`p-5 rounded-lg border-2 transition-all duration-200 ${
                  member.id === employee?.id
                    ? 'border-sky-300 bg-sky-50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-sm font-semibold text-white">
                    {getInitials(member.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 truncate">
                      {member.name}
                      {member.id === employee?.id && (
                        <span className="ml-2 text-xs text-sky-600">(You)</span>
                      )}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        member.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="text-slate-600 truncate">{member.email}</div>
                  {member.phone && <div className="text-slate-600">{member.phone}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && team.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-slate-600">No team members found</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl shadow-sm border border-sky-100 p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="#"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200"
          >
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-semibold text-slate-800">Calendar</h4>
            <p className="text-sm text-slate-600 mt-1">View your schedule</p>
          </a>
          <a
            href="#"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200"
          >
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-slate-800">Reports</h4>
            <p className="text-sm text-slate-600 mt-1">Access your reports</p>
          </a>
          <a
            href="#"
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-semibold text-slate-800">Settings</h4>
            <p className="text-sm text-slate-600 mt-1">Manage preferences</p>
          </a>
        </div>
      </div>
    </div>
  )
}
