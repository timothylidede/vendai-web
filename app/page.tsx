"use client"

import Image from "next/image"
import Link from "next/link"
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react"

import { toast } from "@/hooks/use-toast"

type GalleryImageConfig = {
  id: string
  label: string
  src: string
  alt: string
}

type GalleryCategory = GalleryImageConfig & { index: number }

const galleryImages: GalleryImageConfig[] = [
  {
    id: "general-trade",
    label: "general trade",
    src: "/image-gen/latest/general-trade.png",
    alt: "Flat illustration of a bustling wholesale market with boxes, sacks, and pallets on a clean white backdrop.",
  },
  {
    id: "food-beverage",
    label: "food & beverage",
    src: "/image-gen/latest/food-and-beverage.png",
    alt: "Minimal counter arrangement of bread, bottled juice, and canned goods with soft realistic lighting.",
  },
  {
    id: "electrical",
    label: "electrical",
    src: "/image-gen/latest/electrical.png",
    alt: "Organized flat lay of cables, bulbs, sockets, and circuit components shot on white with crisp shadows.",
  },
  {
    id: "construction",
    label: "construction",
    src: "/image-gen/latest/construction.png",
    alt: "Neatly staged hammer, hard hat, cement bag, and steel rods in a minimal industrial setup.",
  },
  {
    id: "fmcg",
    label: "fmcg",
    src: "/image-gen/latest/fmcg.png",
    alt: "Fast-moving consumer goods like soap, snacks, water, and detergent displayed under bright light.",
  },
  {
    id: "cosmetics",
    label: "cosmetics",
    src: "/image-gen/latest/cosmetics.png",
    alt: "Pastel-toned arrangement of lipstick, perfume bottle, and lotion tube with soft gradients.",
  },
  {
    id: "furniture",
    label: "furniture",
    src: "/image-gen/latest/furniture.png",
    alt: "Modern wooden chair and table styled inside a minimal white room with natural highlights.",
  },
  {
    id: "electronics",
    label: "electronics",
    src: "/image-gen/latest/electronics.png",
    alt: "Sleek layout of smartphone, laptop, and headphones with silver and blue reflections.",
  },
  {
    id: "chemical",
    label: "chemical",
    src: "/image-gen/latest/chemical.png",
    alt: "Laboratory bench with industrial chemical containers, beakers, and safety gloves on white.",
  },
  {
    id: "packaging",
    label: "packaging",
    src: "/image-gen/latest/packaging.png",
    alt: "Stacked cardboard boxes, plastic wrap, and packaging rolls in a tidy studio arrangement.",
  },
  {
    id: "textile",
    label: "textile",
    src: "/image-gen/latest/textile.png",
    alt: "Colorful rolls of fabric, threads, and a sewing machine bathed in bright neutral light.",
  },
  {
    id: "agricultural",
    label: "agricultural",
    src: "/image-gen/latest/agricultural.png",
    alt: "Fresh produce like corn, tomatoes, and greens paired with farm tools under warm sunlight.",
  },
  {
    id: "pharmaceutical",
    label: "pharmaceutical",
    src: "/image-gen/latest/pharmaceutical.png",
    alt: "Clean medical still life of medicine bottles, capsules, and a cross icon in blue-white palette.",
  },
  {
    id: "stationery",
    label: "stationery",
    src: "/image-gen/latest/stationery.png",
    alt: "Organized pens, notebooks, stapler, and paperclips spread across a white desk.",
  },
  {
    id: "automotive",
    label: "automotive",
    src: "/image-gen/latest/automotive.png",
    alt: "Industrial layout of car tire, wrench, and spark plug with metallic textures.",
  },
  {
    id: "plumbing",
    label: "plumbing",
    src: "/image-gen/latest/plumbing.png",
    alt: "Polished tap, wrench, pipes, and fittings arranged neatly on a white background.",
  },
  {
    id: "industrial-equipment",
    label: "industrial equipment",
    src: "/image-gen/latest/industrial-equipment.png",
    alt: "Factory gear, machine parts, and a safety helmet lit in a minimal industrial vignette.",
  },
  {
    id: "cleaning-supplies",
    label: "cleaning supplies",
    src: "/image-gen/latest/cleaning-supplies.png",
    alt: "Bright display of detergents, spray bottles, mop, and gloves against a white surface.",
  },
  {
    id: "alcohol",
    label: "alcohol",
    src: "/image-gen/latest/alcohol.png",
    alt: "Elegant arrangement of wine bottle, whiskey glass, and beer bottles under warm bar lighting.",
  },
]

const galleryCategories: GalleryCategory[] = galleryImages.map((item, index) => ({
  ...item,
  index,
}))

const categoryColumns: GalleryCategory[][] = [
  galleryCategories.slice(0, 10),
  galleryCategories.slice(10),
]

const formatCategoryLabel = (label: string) =>
  label.replace(/\b\w/g, (char) => char.toUpperCase())

const DISPLAY_YEAR = new Date().getFullYear()
const FONT_STACK = '"Neue Haas Grotesk Display Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'
const IMAGE_WIDTH = 290
const IMAGE_HEIGHT = (IMAGE_WIDTH * 4) / 3
const IMAGE_START_OFFSET = 295 // Starting X position per image (Studio Chen matches)
const IMAGE_BOTTOM_SPACING = 40 // Space from bottom (Studio Chen constant)
const CONTAINER_HEIGHT_MULTIPLIER = 1.02 // Container height = image height for tight stacking
const DELAY_MULTIPLIER = 0.8 // Studio Chen delay coefficient

function GalleryImage({
  item,
  index,
  scrollY,
}: {
  item: GalleryImageConfig
  index: number
  scrollY: number
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Studio Chen's EXACT formula from their minified webpack bundle
  const containerHeight = IMAGE_HEIGHT * CONTAINER_HEIGHT_MULTIPLIER
  
  // Their config object structure (verified from minified code)
  const config = {
    start: IMAGE_START_OFFSET * index,
    delay: index === 0 ? 0 : DELAY_MULTIPLIER * IMAGE_HEIGHT,
    target: IMAGE_HEIGHT * CONTAINER_HEIGHT_MULTIPLIER * index,
    threshold: IMAGE_HEIGHT * CONTAINER_HEIGHT_MULTIPLIER * (index + 1),
  }

  // Their exact progress calculation from minified bundle:
  // Math.min(1, Math.max(0, (scroll - delay) * multiplier) / target)
  const calculateProgress = (cfg: typeof config, multiplier: number = 1) => {
    if (cfg.target === 0) return 1 // First image always at origin
    const adjusted = (scrollY - cfg.delay) * multiplier
    return Math.min(1, Math.max(0, adjusted / cfg.target))
  }

  // Apply linear interpolation for progress (Studio Chen pattern)
  const progress = calculateProgress(config)

  // Their exact transform formula: start * (1 - progress)
  // Rounded to 3 decimals like Studio Chen
  const translateX = Math.round(config.start * (1 - progress) * 1000) / 1000
  
  // Indicator visibility threshold (Studio Chen pattern)
  const showIndicator = scrollY > config.threshold

  return (
    <div
      className="sticky will-change-transform"
      style={{
        width: `${IMAGE_WIDTH}px`,
        height: `${containerHeight}px`,
        bottom: `${IMAGE_BOTTOM_SPACING - containerHeight}px`, // Studio Chen bottom calculation
        transformOrigin: "top left", // Explicit origin like Studio Chen
        transform: `translate3d(${translateX}px, 0px, 0px)`, // Studio Chen format
      }}
    >
      <Link href={`/gallery?slide=${index}`} className="block cursor-pointer relative group">
        <svg
          className={`${showIndicator ? "opacity-100" : "opacity-0"} group-hover:opacity-100 mix-blend-difference w-2 absolute top-2.5 left-2.5 z-20 transition-opacity duration-300`}
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 2.745H5.5M2.75488 0L2.75488 5.5" stroke="white" strokeWidth="0.5" />
        </svg>
        <div className="relative h-full w-full overflow-hidden rounded-[22px]">
          <Image
            src={item.src}
            alt={item.alt}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes="290px"
            className={`w-full h-full object-cover origin-top-left will-change-transform transition-opacity duration-[350ms] ease-in-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ width: "290px", height: `${IMAGE_HEIGHT}px` }}
            onLoad={() => setIsLoaded(true)}
            priority={index === 0}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white transition-all duration-300 group-hover:bg-black/65">
            <span className="translate-y-4 text-xs font-bold tracking-[0.3em] uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.label}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

function Gallery() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId: number | null = null
    
    // Studio Chen's RAF-throttled scroll handler pattern
    const updateScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY || window.pageYOffset || 0)
        rafId = null
      })
    }

    // Initialize on mount
    updateScroll()
    
    window.addEventListener("scroll", updateScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", updateScroll)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Studio Chen's container width matches viewport with padding compensation
  return (
    <div 
      className="contain-paint -mx-2.5 px-2.5"
      style={{ width: "100vw" }} // Explicit width like Studio Chen
    >
      {galleryImages.map((item, index) => (
        <GalleryImage key={item.id} item={item} index={index} scrollY={scrollY} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [isWindows, setIsWindows] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const platform = window.navigator.platform?.toLowerCase?.() ?? ""
    setIsWindows(platform.includes("win"))

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReduceMotion(mq.matches)
    updateMotion()
    mq.addEventListener?.("change", updateMotion)
    return () => mq.removeEventListener?.("change", updateMotion)
  }, [])

  const handleDownload = () => {
    toast({
      title: "Starting download…",
      description:
        "If your browser asks for confirmation, proceed to download. On Windows, you may need More info → Run anyway.",
    })

    const ts = Date.now()
    window.location.href = `/api/download/win?_=${ts}`
  }

  return (
    <div
      className="relative min-h-screen text-white antialiased"
      style={{ fontFamily: FONT_STACK }}
    >

      <main className="relative z-10">
        <section className="mx-auto pl-2 pr-2 pb-20 pt-4 sm:pl-2 lg:pl-2 lg:pb-28 lg:pt-2">
          <div className="grid gap-y-16 lg:grid-cols-[290px_minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-20">
            <div className="space-y-12">

              <div className="text-sm leading-relaxed text-white/70" style={{ width: "290px" }}>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  {categoryColumns.map((column, columnIndex) => (
                    <div key={`category-column-${columnIndex}`} className="space-y-2">
                      {column.map((category) => (
                        <Link
                          key={category.id}
                          href={`/gallery?slide=${category.index}`}
                          className="flex items-center justify-between text-white/80 transition-all duration-300 hover:opacity-60 hover:text-blue-300 no-underline border-b border-transparent hover:border-blue-300/50"
                        >
                          <span className="truncate">{formatCategoryLabel(category.label)}</span>
                          <span className="text-xs text-white/50">-&gt;</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-start sm:justify-center sm:text-center lg:flex lg:justify-center">
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 z-20">
                <div className="group relative flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full opacity-90 bg-[conic-gradient(at_50%_50%,#0ea5e9,#6366f1,#38bdf8,#3b82f6,#22d3ee,#0ea5e9)] animate-[spin_18s_linear_infinite] group-hover:animate-[spin_6s_linear_infinite]" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-black/70 backdrop-blur-sm">
                    <img
                      src="/logo-icon-remove.png"
                      alt="vendai icon"
                      className="h-14 w-14 transition-all duration-500 group-hover:animate-[spin_0.9s_linear_infinite]"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.location.href = 'https://app.vendai.digital'}
                  className="px-6 py-2 text-xs uppercase tracking-[0.2em] bg-black text-white rounded-full hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                >
                  sign in
                </button>
              </div>
            </div>

            <div></div>
          </div>

          <div className="mt-24 lg:mt-70 flex justify-center">
            <Gallery />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-transparent px-2 py-10 text-[9px] uppercase tracking-[0.35em] text-white/60 sm:px-4 lg:px-6">
        <div className="max-w-6xl">
          <a
            href="https://www.vendai.africa"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-transparent text-white/60 transition-colors duration-200 hover:text-white"
          >
            <span className="transition-opacity duration-200 group-hover:opacity-80">visit our company website</span>
            <span className="text-xs text-white/50 transition-transform duration-200 group-hover:translate-x-1">-&gt;</span>
          </a>
        </div>
      </footer>
    </div>
  )
}