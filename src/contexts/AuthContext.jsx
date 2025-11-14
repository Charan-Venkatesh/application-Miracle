import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      (async () => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchEmployeeData(session.user.id)
        }
        setLoading(false)
      })()
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchEmployeeData(session.user.id)
        } else {
          setEmployee(null)
        }
      })()
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchEmployeeData = async (userId) => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error('Error fetching employee data:', error)
      return
    }
    setEmployee(data)
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email, password, name, role) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return { data, error }

    if (data.user) {
      const { error: employeeError } = await supabase
        .from('employees')
        .insert([
          {
            user_id: data.user.id,
            name,
            email,
            role,
            created_by: data.user.id,
          },
        ])

      if (employeeError) {
        return { data, error: employeeError }
      }
    }

    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const value = {
    user,
    employee,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
