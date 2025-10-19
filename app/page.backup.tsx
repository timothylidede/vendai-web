"use client"
import { useEffect, useRef, useState } from "react"
import { useTypewriter } from "@/hooks/use-typewriter"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { AnimateIn } from "@/components/ui/animate"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, Truck, CreditCard, Zap } from "lucide-react"

export default function HomePage() {
  // Windows-only branding for download CTA
  const [isWindows, setIsWindows] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform.toLowerCase();
      setIsWindows(platform.includes("win"));
    }
  }, []);

  // Performance: lazy-load hero video only when in view and respect reduced motion
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;
    if (prefersReducedMotion) return; // don't auto-play/load video if user prefers reduced motion

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Defer setting src until in view
          if (!videoSrc) setVideoSrc("/videos/50s.mp4");
          // Try to play when ready
          if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
            const p = videoRef.current.play?.();
            if (p && typeof p.then === "function") {
              p.catch(() => {/* autoplay might be blocked; ignore */});
            }
          }
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion, videoSrc]);

  const handleDownload = () => {
    // Friendly hint about Google Drive's confirmation and SmartScreen
    toast({
      title: "Starting download…",
      description:
        "If your browser asks for confirmation, proceed to download. On Windows, you may need More info → Run anyway.",
    })
    // Direct navigation for reliability (browser download manager)
    const ts = Date.now()
    window.location.href = `/api/download/win?_=${ts}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-sans text-foreground">
      {/* Header */}
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

      {/* Space for fixed header */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-5rem)] flex flex-col px-2 md:px-6 rounded-lg md:rounded-2xl mx-2 md:mx-6 lg:mx-12 overflow-hidden" style={{zIndex:1}}>
        {/* Video Background */}
        <div className="absolute inset-0 bg-[#111111] rounded-lg md:rounded-2xl">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-4 mix-blend-luminosity"
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
            preload="none"
            poster="/placeholder.jpg"
            src={videoSrc || undefined}
            aria-hidden="true"
            style={{ transform: 'scale(1.01)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="container mx-auto max-w-3xl text-center text-white text-sm pt-12 md:pt-20 px-4 relative z-10">
          <AnimateIn className="space-y-6 md:space-y-8">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight bg-gradient-to-r from-red-500 via-green-400 to-red-500 bg-clip-text text-transparent font-sans">
                <span className="font-black">AI</span>{' '}
                <span className="inline-block font-black">
                  {useTypewriter(["pos.", "retail.", "erp."])}
                </span>
              </h1>
            <p className="text-base sm:text-lg font-bold md:text-xl leading-relaxed max-w-3xl mx-auto opacity-90 px-4">
              vendai is a retail assistant, built with care.
            </p>

            <div className="flex flex-col gap-3 md:gap-4 justify-center pt-6 md:pt-8 z-10 px-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 via-green-400 to-red-500 text-white hover:opacity-90 text-sm md:text-base px-6 md:px-8 py-3 md:py-4 h-auto font-bold w-full sm:w-auto"
                onClick={() => window.location.href = 'https://app.vendai.digital'}
              >
                sign in to web app.
              </Button>
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 text-sm md:text-base px-6 md:px-8 py-3 md:py-4 h-auto font-bold flex items-center justify-center gap-2 w-full sm:w-auto" onClick={handleDownload}>
                <img src="/white_microsoft.png" alt="Windows" className="w-5 h-5 md:w-6 md:h-6" />
                {isWindows ? "download desktop app." : "download desktop."}
              </Button>
            </div>
            
            {/* Choice explanation */}
            <div className="text-center pt-4 md:pt-6 px-4">
              <p className="text-white/60 text-xs sm:text-sm max-w-2xl mx-auto">
                <strong className="text-white/80">Choose your experience:</strong> Start immediately in your browser with the web app, or download the desktop version for offline access and native OS integration.
              </p>
              <p className="text-white/50 text-xs mt-2">
                Need help? Visit the <a className="underline hover:text-white/70" href="/download">downloads page</a> for installation guides.
              </p>
            </div>
          </AnimateIn>
        </div>

        {/* Demo Placeholder */}
        <div className="relative z-0 mt-8 md:mt-12 px-4">
          <AnimateIn delay={0.4}>
            <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-3 md:p-4 shadow-2xl max-w-2xl mx-auto">
              <div className="bg-gray-900 dark:bg-gray-800 rounded-md p-4 md:p-6 font-mono text-xs md:text-sm">
                <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4 text-gray-400">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-2 md:ml-4 font-thin text-xs md:text-sm">vendai dashboard.</span>
                </div>
                <div className="space-y-1.5 md:space-y-2 text-gray-300 font-thin">
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
      <section className="bg-[#111111] py-8 md:py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-center font-bold text-white text-base md:text-xl mb-6 md:mb-10 font-sans opacity-50">
            trusted by leading consumer brands.
          </h2>
          <div className="flex flex-col space-y-6 md:space-y-10">
            {/* Top row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-8 items-center justify-items-center">
              <img src="/brand_images/coke.png" alt="Coca Cola" className="h-10 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/unilever.png" alt="Unilever" className="h-10 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/bidco.png" alt="Bidco" className="h-10 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/brookside.png" alt="Brookside" className="h-10 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/proctor.png" alt="Proctor & Gamble" className="h-10 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            {/* Bottom row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-8 items-center justify-items-center">
              <img src="/brand_images/del-monte.png" alt="Del Monte" className="h-8 md:h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/ketepa.png" alt="Ketepa" className="h-8 md:h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/peptang.png" alt="Peptang" className="h-8 md:h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/cadbury.png" alt="Cadbury" className="h-8 md:h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/brand_images/capwell.png" alt="Capwell" className="h-8 md:h-14 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with Glass Cards */}
      <section id="features" className="py-12 md:py-20 mt-10 md:mt-20 px-4 bg-white dark:bg-[#111111] relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 mb-10 md:mb-16">
            <AnimateIn className="max-w-2xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-black dark:text-white">
                the retail assistant.
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl font-medium">
                faster inventory management, insights, and distributor connections in one platform.
              </p>
            </AnimateIn>
            <AnimateIn>
              <Button
                size="sm"
                className="text-sm md:text-base font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-9 md:h-10 px-4 md:px-6"
              >
                see more features.
              </Button>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            {/* AI Inventory Assistant Card */}
            <AnimateIn delay={0.1}>
              <div className="group relative">
                {/* Gradient border ring - hidden by default, shown on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-green-400 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Glass card */}
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[300px] md:min-h-[400px] flex flex-col">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-black dark:text-white">intelligent assistant</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-xs md:text-sm leading-relaxed">
                      understands your business and helps you make smarter decisions.
                    </p>
                  </div>
                  
                  {/* 3D Gradient Triangle */}
                  <div className="flex-1 bg-black/50 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden p-4 md:p-8">
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
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[300px] md:min-h-[400px] flex flex-col">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-black dark:text-white">feels familiar</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-xs md:text-sm leading-relaxed">
                      designed to work seamlessly with your existing workflow.
                    </p>
                  </div>
                  
                  {/* 3D Gradient Sphere */}
                  <div className="flex-1 bg-black/50 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden p-4 md:p-8">
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
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:bg-white/8 dark:group-hover:bg-white/8 group-hover:border-white/20 min-h-[300px] md:min-h-[400px] flex flex-col">
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-black dark:text-white">direct orders</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-xs md:text-sm leading-relaxed">
                      connect and order directly from trusted distributors.
                    </p>
                  </div>
                  
                  {/* 3D Gradient Cubes */}
                  <div className="flex-1 bg-black/50 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden p-4 md:p-8">
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

  {/* Footer */}
      <footer className="border-t border-gray-800 bg-white dark:bg-[#111111] py-8 md:py-16 px-4 font-medium text-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <img src="/vendai-icon.png" alt="vendai icon" className="h-5 w-5 md:h-6 md:w-6" />
                <span className="font-bold text-base md:text-lg">vendai</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                AI-powered retail management platform helping businesses grow smarter.
              </p>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base text-black dark:text-white">Contact Us</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="mailto:hello@vendai.digital" className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white break-all">hello@vendai.digital</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © 2025 Vendai. All rights reserved.
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <a href="https://x.com/vendai.digital" className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Twitter
              </a>
              <a href="https://linkedin.com/company/vendai" className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
