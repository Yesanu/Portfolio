function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Yehezkiel Satya
        </p>
        <p className="text-text-muted text-xs tracking-wider uppercase">
          Built with React & Framer Motion
        </p>
      </div>
    </footer>
  )
}

export default Footer
