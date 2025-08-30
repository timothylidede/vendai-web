"use client"
import { useEffect, useState } from "react"
import { useTypewriter } from "@/hooks/use-typewriter"

import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/ui/animate"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, Truck, CreditCard, Zap } from "lucide-react"

export default function HomePage() {
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
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-mono text-foreground">
      {/* Header */}
  <header className="fixed z-50 bg-white dark:bg-[#111111] rounded-xl mt-4 mx-16 left-auto right-auto" style={{left: 0, right: 0}}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="group flex items-center gap-1 p-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg transition-all duration-300 hover:bg-[#111111]/10 dark:hover:bg-[#111111]/50 hover:scale-105">
              <img src="/logo-icon.png" alt="vendai icon" className="h-8 w-8 transition-all duration-700 group-hover:animate-[spin_2s_linear_infinite]" tabIndex={0} />
              <img src="/logo-text.png" alt="vendai" className="h-7 select-text cursor-pointer transition-all duration-300 group-hover:brightness-125" tabIndex={0} />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              features.
            </a>
            <a
              href="#pricing"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              pricing.
            </a>
            <a
              href="#retailers"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              retailers.
            </a>
            <a
              href="#distributors"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              distributors.
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              sign in.
            </Button>
            <Button
              size="sm"
              className="text-base font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2 h-10"
            >
              {os === "windows" && <img src="/microsoft.png" alt="Windows" className="w-5 h-5" />} 
              {os === "mac" && <img src="/apple.png" alt="Mac" className="w-5 h-5" />} 
              download.
            </Button>
          </div>
        </div>
      </header>

      {/* Space for fixed header */}
      <div className="h-26"></div>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col px-2 md:px-6 rounded-lg md:rounded-2xl mx-6 md:mx-12 overflow-hidden" style={{zIndex:1}}>
        {/* Video Background */}
        <div className="absolute inset-0 bg-[#111111] rounded-lg md:rounded-2xl">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-3 mix-blend-luminosity"
            autoPlay
            loop
            muted
            playsInline
            style={{ transform: 'scale(1.01)' }}
            ref={(el) => {
              if (el) {
                el.playbackRate = 0.5;
              }
            }}
          >
            <source src="/videos/50s.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="container mx-auto max-w-3xl text-center text-white text-sm pt-20 relative z-10">
          <AnimateIn className="space-y-8">
              <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl leading-tight bg-gradient-to-r from-red-500 via-green-400 to-red-500 bg-clip-text text-transparent font-mono">
                <span className="font-black">AI</span>{' '}
                <span className="inline-block font-black">
                  {useTypewriter(["pos.", "retail.", "erp."])}
                </span>
              </h1>
            <p className="text-lg font-bold md:text-xl leading-relaxed max-w-3xl mx-auto opacity-90">
              built with care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 z-10">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 text-base px-8 py-4 h-auto font-bold flex items-center gap-2">
                {os === "windows" && <img src="/white_microsoft.png" alt="Windows" className="w-6 h-6" />} 
                {os === "mac" && <img src="/white_apple.png" alt="Mac" className="w-6 h-6" />} 
                {os === "windows" && "download for windows."}
                {os === "mac" && "download for mac."}
                {!os && "download."}
              </Button>
              <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-base px-8 py-4 h-auto font-bold"
                >
                  all downloads.
                </Button>
            </div>
          </AnimateIn>
        </div>

        {/* Demo Placeholder */}
        <div className="relative z-0 mt-12">
          <AnimateIn delay={0.4}>
            <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 shadow-2xl max-w-2xl mx-auto">
              <div className="bg-gray-900 dark:bg-gray-800 rounded-md p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 font-thin">vendai dashboard.</span>
                </div>
                <div className="space-y-2 text-gray-300 font-thin">
                  <div className="text-blue-400">inventory.check().</div>
                  <div className="text-green-400">→ 15 items need restocking.</div>
                  <div className="text-yellow-400">ai.suggest_order().</div>
                  <div className="text-green-400">→ order placed with best distributor.</div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="bg-[#111111] py-12">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-white text-xl mt-30 mb-15 font-mono opacity-50">
            trusted by leading consumer brands.
          </h2>
          <div className="flex flex-col space-y-10">
            {/* Top row */}
            <div className="grid grid-cols-5 gap-22 items-center justify-items-center">
              <img src="/brand_images/coke.png" alt="Coca Cola" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/unilever.png" alt="Unilever" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/bidco.png" alt="Bidco" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/brookside.png" alt="Brookside" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/proctor.png" alt="Proctor & Gamble" className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            {/* Bottom row */}
            <div className="grid grid-cols-5 gap-2 items-center justify-items-center">
              <img src="/brand_images/del-monte.png" alt="Del Monte" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/ketepa.png" alt="Ketepa" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/peptang.png" alt="Peptang" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/cadbury.png" alt="Cadbury" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/capwell.png" alt="Capwell" className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with Glass Cards */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-[#111111] relative">
        <div className="container mx-auto max-w-6xl">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 font-thin md:font-normal text-black dark:text-white">
              everything you need.
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-thin">
              inventory management, ai insights, and distributor connections in one platform.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* AI Inventory Assistant Card */}
            <AnimateIn delay={0.1}>
              <div className="group relative">
                {/* Gradient border ring - hidden by default, shown on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-green-400 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Glass card */}
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[400px] flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 font-thin text-black dark:text-white">intelligent assistant</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-thin text-sm leading-relaxed">
                      understands your business and helps you make smarter decisions.
                    </p>
                  </div>
                  
                  {/* Image placeholder space */}
                  <div className="flex-1 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10 dark:border-white/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/2 to-transparent"></div>
                    <div className="text-center space-y-3 relative z-10">
                      <Brain className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-thin">
                        Image placeholder - Add your visual here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* AI Price Optimization Card */}
            <AnimateIn delay={0.2}>
              <div className="group relative">
                {/* Gradient border ring */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-green-400 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Glass card */}
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[400px] flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 font-thin text-black dark:text-white">feels familiar</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-thin text-sm leading-relaxed">
                      designed to work seamlessly with your existing workflow.
                    </p>
                  </div>
                  
                  {/* Image placeholder space */}
                  <div className="flex-1 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10 dark:border-white/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/2 to-transparent"></div>
                    <div className="text-center space-y-3 relative z-10">
                      <CreditCard className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-thin">
                        Image placeholder - Add your visual here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Direct Distributor Orders Card */}
            <AnimateIn delay={0.3}>
              <div className="group relative">
                {/* Gradient border ring */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-green-400 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Glass card */}
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[400px] flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 font-thin text-black dark:text-white">direct orders</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-thin text-sm leading-relaxed">
                      connect and order directly from trusted distributors.
                    </p>
                  </div>
                  
                  {/* Image placeholder space */}
                  <div className="flex-1 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10 dark:border-white/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/2 to-transparent"></div>
                    <div className="text-center space-y-3 relative z-10">
                      <Truck className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-thin">
                        Image placeholder - Add your visual here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Demo Placeholder Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#111111]">
        <div className="container mx-auto max-w-4xl text-center text-sm">
          <AnimateIn>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-thin md:font-normal">
              see vendai in action
            </h2>
            <div className="bg-white dark:bg-black rounded-lg shadow-xl p-8 border">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4 font-thin">
                  <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">demo video placeholder</p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  )
}