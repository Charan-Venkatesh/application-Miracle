import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/MockAuthContext'
import Logo from '../components/Logo'

const WATERMARK_URL = 'https://images.miraclesoft.com/me-portal/email-signature/30years.png'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger content animation after mount
    setTimeout(() => setShowContent(true), 100)
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
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Watermark Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
      >
        <motion.img
          src={WATERMARK_URL}
          alt="watermark"
          className="w-[900px] h-auto"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [-3, 3, -3],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'grayscale(0.3) blur(1px)' }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sky-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              {/* Logo Section */}
              <motion.div
                className="text-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="inline-block mb-6"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.img
                    src={WATERMARK_URL}
                    alt="Miracle Software - 30 Years"
                    className="h-24 w-auto mx-auto"
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                    Miracle Software Systems
                  </h1>
                  <motion.p
                    className="text-slate-600 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span>Employee Portal</span>
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 80 }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-400/10 to-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-pink-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center mb-8"
                    >
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                      <p className="text-sm text-slate-600">Sign in to access your dashboard</p>
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-lg"
                      >
                        <p className="text-sm text-rose-700 font-medium">{error}</p>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@miracle.com"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-slate-800 placeholder-slate-400"
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-slate-800 placeholder-slate-400"
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="relative w-full py-4 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span>Signing in...</span>
                            </>
                          ) : (
                            <>
                              <span>Sign In</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </motion.button>
                    </form>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="mt-8 pt-6 border-t border-slate-200 text-center"
                    >
                      <p className="text-xs text-slate-500">
                        🔒 Secured with enterprise authentication
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Contact your administrator if you need access
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-slate-600 font-medium">
                  Powered by Miracle Software Systems
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .bg-size-200 {
          background-size: 200% auto;
        }
        .bg-pos-0 {
          background-position: 0% center;
        }
        .bg-pos-100 {
          background-position: 100% center;
        }
      `}</style>
    </div>
  )
}
