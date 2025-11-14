import { useState, useEffect } from 'react'

export default function Logo({ animate = false }) {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Miracle Software Systems'

  useEffect(() => {
    if (animate) {
      let index = 0
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
        }
      }, 100) // 100ms per letter

      return () => clearInterval(interval)
    } else {
      setDisplayText(fullText)
    }
  }, [animate])

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src="https://images.miraclesoft.com/me-portal/email-signature/30years.png"
        alt="Miracle Software - 30 Years"
        className="h-20 w-auto object-contain"
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 min-h-[32px]">
          {displayText}
          {animate && displayText.length < fullText.length && (
            <span className="animate-pulse">|</span>
          )}
        </h1>
      </div>
    </div>
  )
}
