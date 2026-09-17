function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Yesanu
        </p>
      </div>
    </footer>
  )
}

export default Footer
