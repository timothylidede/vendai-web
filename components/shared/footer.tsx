export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-white dark:bg-[#111111] py-12 px-4 font-thin text-sm">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/vendai-icon.png" alt="vendai icon" className="h-5 w-5" />
            <span className="font-bold">vendai</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-thin">
              privacy
            </a>
            <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-thin">
              terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
