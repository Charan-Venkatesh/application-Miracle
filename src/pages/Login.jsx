import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/MockAuthContext'

const LOGO_URL = 'https://images.miraclesoft.com/me-portal/email-signature/30years.png'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSplash, setShowSplash] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  
  const fullText = 'Miracle Software Systems'

  console.log('Login component rendered, showSplash:', showSplash)

  useEffect(() => {
    console.log('Starting animation...')
    // Slower letter by letter animation
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        // After text completes, wait 2 seconds then show login form
        setTimeout(() => {
          console.log('Hiding splash, showing login')
          setShowSplash(false)
        }, 2000)
      }
    }, 120) // 120ms per letter (slower)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) throw error
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Large Watermark Background - always visible */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
      >
        <motion.img
          src={LOGO_URL}
          alt="watermark"
          className="w-[1200px] h-auto"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'grayscale(0.4) opacity(0.5)' }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          /* Splash Screen - Page 1 */
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
          >
            {/* Logo animation - comes from bottom */}
            <motion.div
              initial={{ y: 300, opacity: 0, scale: 0.3 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 80,
                duration: 1.5
              }}
              className="mb-16"
            >
              <motion.img
                src={LOGO_URL}
                alt="Miracle Software 30 Years"
                className="w-48 h-48 object-contain drop-shadow-2xl"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Company name with letter-by-letter animation */}
            <div className="text-center">
              <motion.h1
                className="text-7xl font-bold text-slate-900 mb-6 tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {displayedText}
                {displayedText.length < fullText.length && (
                  <motion.span
                    className="inline-block w-1 h-16 bg-slate-900 ml-2"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 }}
                className="text-2xl text-slate-700 font-medium"
              >
                Employee Portal
              </motion.p>
            </div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.5 }}
              className="mt-20"
            >
              <motion.div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-slate-500 rounded-full"
                    animate={{
                      y: [-12, 12, -12],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* Login Form - Page 2 */
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
          >
            <div className="w-full max-w-md">
              {/* Logo at top - comes from top */}
              <motion.div
                className="text-center mb-8"
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.2
                }}
              >
                <motion.img
                  src={LOGO_URL}
                  alt="30 Years"
                  className="w-28 h-28 mx-auto mb-6"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Title - comes from top */}
              <motion.div
                className="text-center mb-8"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.4
                }}
              >
                <h2 className="text-4xl font-bold text-slate-900 mb-3">Miracle Software Systems</h2>
                <p className="text-slate-600 text-lg">Sign in to access your employee portal</p>
              </motion.div>

              {/* Login Card - comes from bottom */}
              <motion.div
                className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 p-8"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.6
                }}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-lg"
                  >
                    <p className="text-sm text-rose-700 font-medium">{error}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-300 transition-all text-slate-900 text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-slate-900 mb-3">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                        className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-300 transition-all text-slate-900 text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#0087c7] to-[#00a1e4] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Signing in...</span>
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
