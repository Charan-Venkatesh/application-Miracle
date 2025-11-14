// Mock Authentication Context - No Supabase Required
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Mock user database
const MOCK_USERS = {
  'admin@miracle.com': {
    password: 'Admin@123456',
    user: {
      id: 'admin-001',
      email: 'admin@miracle.com',
    },
    employee: {
      id: 'emp-001',
      user_id: 'admin-001',
      name: 'Admin User',
      email: 'admin@miracle.com',
      phone: '+1-555-0100',
      role: 'admin',
      created_at: new Date().toISOString(),
    }
  },
  'employee1@miracle.com': {
    password: 'Employee@123',
    user: {
      id: 'emp1-001',
      email: 'employee1@miracle.com',
    },
    employee: {
      id: 'emp-002',
      user_id: 'emp1-001',
      name: 'John Smith',
      email: 'employee1@miracle.com',
      phone: '+1-555-0101',
      role: 'employee',
      created_at: new Date().toISOString(),
    }
  },
  'employee2@miracle.com': {
    password: 'Employee@123',
    user: {
      id: 'emp2-001',
      email: 'employee2@miracle.com',
    },
    employee: {
      id: 'emp-003',
      user_id: 'emp2-001',
      name: 'Jane Doe',
      email: 'employee2@miracle.com',
      phone: '+1-555-0102',
      role: 'employee',
      created_at: new Date().toISOString(),
    }
  }
}

// Mock employees database
let mockEmployees = Object.values(MOCK_USERS).map(u => u.employee)

export const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    
    const mockUser = MOCK_USERS[email]
    
    if (!mockUser || mockUser.password !== password) {
      return { 
        data: null, 
        error: { message: 'Invalid login credentials' } 
      }
    }

    setUser(mockUser.user)
    setEmployee(mockUser.employee)
    
    return { 
      data: { user: mockUser.user }, 
      error: null 
    }
  }

  const signUp = async (email, password, name, role) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if user already exists
    if (MOCK_USERS[email]) {
      return {
        data: null,
        error: { message: 'User already exists' }
      }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email: email,
    }

    const newEmployee = {
      id: `emp-${Date.now()}`,
      user_id: newUser.id,
      name,
      email,
      phone: '',
      role,
      created_at: new Date().toISOString(),
      created_by: user?.id || newUser.id
    }

    MOCK_USERS[email] = {
      password,
      user: newUser,
      employee: newEmployee
    }

    mockEmployees.push(newEmployee)

    return { 
      data: { user: newUser }, 
      error: null 
    }
  }

  const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    setUser(null)
    setEmployee(null)
    return { error: null }
  }

  // Mock database operations
  const mockDB = {
    employees: {
      select: () => ({
        eq: () => ({
          maybeSingle: async () => {
            await new Promise(resolve => setTimeout(resolve, 200))
            return { data: employee, error: null }
          }
        }),
        order: () => ({
          then: async (callback) => {
            await new Promise(resolve => setTimeout(resolve, 200))
            const result = { data: mockEmployees, error: null }
            if (callback) callback(result)
            return result
          }
        })
      }),
      insert: (data) => ({
        select: () => ({
          single: async () => {
            await new Promise(resolve => setTimeout(resolve, 300))
            const newEmp = { 
              ...data[0], 
              id: `emp-${Date.now()}`,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
            mockEmployees.push(newEmp)
            return { data: newEmp, error: null }
          }
        })
      }),
      update: (data) => ({
        eq: (field, value) => ({
          select: () => ({
            single: async () => {
              await new Promise(resolve => setTimeout(resolve, 300))
              const index = mockEmployees.findIndex(e => e.id === value)
              if (index !== -1) {
                mockEmployees[index] = { 
                  ...mockEmployees[index], 
                  ...data,
                  updated_at: new Date().toISOString()
                }
                return { data: mockEmployees[index], error: null }
              }
              return { data: null, error: { message: 'Employee not found' } }
            }
          })
        })
      }),
      delete: () => ({
        eq: (field, value) => async () => {
          await new Promise(resolve => setTimeout(resolve, 300))
          const index = mockEmployees.findIndex(e => e.id === value)
          if (index !== -1) {
            mockEmployees.splice(index, 1)
            return { error: null }
          }
          return { error: { message: 'Employee not found' } }
        }
      })
    }
  }

  const value = {
    user,
    employee,
    loading,
    signIn,
    signUp,
    signOut,
    mockDB: {
      ...mockDB,
      users: mockEmployees, // Expose users array directly
      deleteUser: (email) => {
        const index = mockEmployees.findIndex(e => e.email === email)
        if (index !== -1) {
          mockEmployees.splice(index, 1)
        }
      }
    }
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
