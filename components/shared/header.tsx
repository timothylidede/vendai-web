"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function Header() {
  const handleDownload = () => {
    toast({
      title: "Starting download…",
      description:
        "If your browser asks for confirmation, proceed to download. On Windows SmartScreen, use More info → Run anyway.",
    })
    // Use direct navigation to leverage browser download manager, resume, and retries
    const ts = Date.now()
    window.location.href = `/api/download/win?_=${ts}`;
  };

  return (
    <>
      <header className="fixed z-50 bg-white dark:bg-[#111111] rounded-xl mt-2 md:mt-4 mx-2 md:mx-8 lg:mx-16 left-0 right-0">
        <div className="container mx-auto px-3 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="group flex items-center gap-0.5 md:gap-1 p-1 md:p-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg transition-all duration-300 hover:bg-[#111111]/10 dark:hover:bg-[#111111]/50 hover:scale-105">
              <img src="/logo-icon.png" alt="vendai icon" className="h-6 w-6 md:h-8 md:w-8 transition-all duration-700 group-hover:animate-[spin_2s_linear_infinite]" tabIndex={0} />
              <img src="/logo-text.png" alt="vendai" className="h-5 md:h-7 select-text cursor-pointer transition-all duration-300 group-hover:brightness-125" tabIndex={0} />
            </a>
          </div>

          <div className="flex items-center gap-1.5 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs md:text-base font-medium border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 h-8 md:h-10 px-2 md:px-4"
              onClick={() => window.location.href = 'https://app.vendai.digital'}
            >
              sign in.
            </Button>
            <Button
              size="sm"
              className="text-xs md:text-base font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-1 md:gap-2 h-8 md:h-10 px-2 md:px-4"
              onClick={handleDownload}
            >
              <img src="/microsoft.png" alt="Windows" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">download.</span>
              <span className="sm:hidden">get</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="h-16 md:h-20"></div>
    </>
  )
}
