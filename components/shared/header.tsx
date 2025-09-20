"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  // OS detection for download button
  const [os, setOs] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform.toLowerCase();
      if (platform.includes("win")) setOs("windows");
      else if (platform.includes("mac")) setOs("mac");
      else setOs("");
    }
  }, []);

  const handleDownload = () => {
    // Use direct navigation to leverage browser download manager, resume, and retries
    window.location.href =
      "https://github.com/timothylidede/vendai-pos/releases/latest/download/VendAI-POS-Windows-Setup.exe";
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
              {os === "windows" && <img src="/microsoft.png" alt="Windows" className="w-5 h-5" />} 
              {os === "mac" && <img src="/apple.png" alt="Mac" className="w-5 h-5" />} 
              download.
            </Button>
          </div>
        </div>
      </header>
      <div className="h-26"></div>
    </>
  )
}
