export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600 gap-2">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Miracle Software Systems, Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-sky-600 transition-colors">
            Privacy
          </a>
          <a href="#terms" className="hover:text-sky-600 transition-colors">
            Terms
          </a>
          <a href="#sitemap" className="hover:text-sky-600 transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  )
}
