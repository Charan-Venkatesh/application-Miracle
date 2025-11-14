export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="https://www.miraclesoft.com/images/partner/miracle-logo.png"
        alt="MiracleSoft"
        className="h-10 w-auto object-contain"
      />
      <span className="hidden sm:inline-block text-lg font-semibold tracking-tight text-slate-800">
        Miracle Software Systems
      </span>
    </div>
  )
}
