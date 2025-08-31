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
              href="/features"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              features.
            </a>
            <a
              href="/pricing"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              pricing.
            </a>
            <a
              href="/retailers"
              className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              retailers.
            </a>
            <a
              href="/distributors"
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
            className="absolute inset-0 w-full h-full object-cover opacity-4 mix-blend-luminosity"
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
              vendai is a retail assistant, built with care.
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
          <h2 className="text-center font-bold text-white text-xl mt-30 mb-15 font-mono opacity-50">
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
      <section id="features" className="py-20 mt-20 px-4 bg-white dark:bg-[#111111] relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-start mb-16">
            <AnimateIn className="max-w-2xl">
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
              the retail assistant.
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl font-medium">
             faster inventory management, insights, and distributor connections in one platform.
            </p>
            </AnimateIn>
            <AnimateIn>
              <Button
                size="sm"
                className="text-base font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-10"
              >
                see more features.
              </Button>
            </AnimateIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* AI Inventory Assistant Card */}
            <AnimateIn delay={0.1}>
              <div className="group relative">
                {/* Gradient border ring - hidden by default, shown on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-green-400 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Glass card */}
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[400px] flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4 text-black dark:text-white">intelligent assistant</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed">
                      understands your business and helps you make smarter decisions.
                    </p>
                  </div>
                  
                  {/* 3D Gradient Triangle */}
                  <div className="flex-1 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    <div className="relative w-full h-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                        <div className="absolute w-full h-full bg-gradient-to-r from-red-500 via-green-400 to-red-500 transform rotate-45 origin-center" 
                             style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}>
                        </div>
                        <div className="absolute w-full h-full bg-black/50 transform rotate-45 translate-y-1 translate-x-1"
                             style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}>
                        </div>
                      </div>
                      <div className="absolute top-5 right-5 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transform rotate-12 animate-float"></div>
                      <div className="absolute bottom-5 left-5 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg transform -rotate-12 animate-float-delayed"></div>
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
                    <h3 className="text-xl font-bold mb-4 text-black dark:text-white">feels familiar</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed">
                      designed to work seamlessly with your existing workflow.
                    </p>
                  </div>
                  
                  {/* 3D Gradient Sphere */}
                  <div className="flex-1 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    <div className="relative w-full h-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-sm"></div>
                        <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                        <div className="absolute -inset-1 w-32 h-32 rounded-full bg-black/50 transform translate-y-0.5 translate-x-0.5"></div>
                      </div>
                      <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm animate-float"></div>
                      <div className="absolute bottom-8 left-8 w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 blur-sm animate-float-delayed"></div>
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
                    <h3 className="text-xl font-bold mb-4 text-black dark:text-white">direct orders</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed">
                      connect and order directly from trusted distributors.
                    </p>
                  </div>
                  
                  {/* 3D Gradient Cubes */}
                  <div className="flex-1 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    <div className="relative w-full h-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-32 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transform rotate-12 rounded-xl"></div>
                        <div className="absolute inset-0 w-32 h-32 bg-black/50 transform rotate-12 translate-y-1 translate-x-1 rounded-xl"></div>
                      </div>
                      <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 transform -rotate-12 rounded-xl animate-float"></div>
                      <div className="absolute bottom-10 left-10 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 transform rotate-45 rounded-xl animate-float-delayed"></div>
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
        <div className="container mx-auto max-w-4xl text-center">
          <AnimateIn>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-red-500 via-green-400 to-red-500 bg-clip-text text-transparent">
              see vendai in action
            </h2>
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Futuristic Frame */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-green-400/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
                
                {/* Screen Content */}
                <div className="relative w-full h-full p-8">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white/50 text-sm font-medium">vendai terminal v1.0</div>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="text-left space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-green-400 font-mono">$</span>
                      <div className="flex-1">
                        <p className="text-white font-mono mb-2">vendai analyze inventory</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-purple-400 font-medium">→ Analyzing current stock levels...</p>
                          <p className="text-green-400 font-medium">→ 15 items need restocking</p>
                          <p className="text-blue-400 font-medium">→ Generating AI-powered insights</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-green-400 font-mono">$</span>
                      <div className="flex-1">
                        <p className="text-white font-mono mb-2">vendai optimize orders</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-yellow-400 font-medium">→ Calculating optimal order quantities</p>
                          <p className="text-pink-400 font-medium">→ Finding best distributor prices</p>
                          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full mt-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glowing Effects */}
                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-white dark:bg-[#111111] py-16 px-4 font-medium text-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/vendai-icon.png" alt="vendai icon" className="h-6 w-6" />
                <span className="font-bold text-lg">vendai</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                AI-powered retail management platform helping businesses grow smarter.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">Product</h3>
              <ul className="space-y-3">
                <li><a href="/features" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Features</a></li>
                <li><a href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Documentation</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-bold mb-4 text-black dark:text-white">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-400">
              © 2025 Vendai. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}