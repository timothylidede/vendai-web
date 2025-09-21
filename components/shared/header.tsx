"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function Header() {
  const handleDownload = () => {
    toast({
      title: "Starting download…",
      description:
        "If prompted, click 'Download anyway'. On Windows SmartScreen, use More info → Run anyway.",
    })
    // Use direct navigation to leverage browser download manager, resume, and retries
    const ts = Date.now()
    window.location.href = `/api/download/win?_=${ts}`;
  };

  return (
    <>
      <header className="fixed z-50 bg-white dark:bg-[#111111] rounded-xl mt-4 mx-16 left-auto right-auto" style={{left: 0, right: 0}}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="group flex items-center gap-1 p-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg transition-all duration-300 hover:bg-[#111111]/10 dark:hover:bg-[#111111]/50 hover:scale-105">
              <img src="/logo-icon.png" alt="vendai icon" className="h-8 w-8 transition-all duration-700 group-hover:animate-[spin_2s_linear_infinite]" tabIndex={0} />
              <img src="/logo-text.png" alt="vendai" className="h-7 select-text cursor-pointer transition-all duration-300 group-hover:brightness-125" tabIndex={0} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="text-base font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2 h-10"
              onClick={handleDownload}
            >
              <img src="/microsoft.png" alt="Windows" className="w-5 h-5" />
              download.
            </Button>
          </div>
        </div>
      </header>
      <div className="h-26"></div>
    </>
  )
}
