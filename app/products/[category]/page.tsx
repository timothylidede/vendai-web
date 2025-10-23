"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, TransitionEvent } from "react"

const FONT_STACK = '"Neue Haas Grotesk Display Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'

// Category to product mapping
type ProductItem = {
  name: string
  image?: string
}

const CATEGORY_PRODUCTS: Record<string, { name: string; items: (string | ProductItem)[] }> = {
  "general-trade": {
    name: "General Trade",
    items: [
      { name: "Rice 25kg", image: "/image-gen/products/rice.png" },
      { name: "Cooking Oil 5L", image: "/image-gen/products/cooking-oil.png" },
      { name: "Maize Flour 10kg", image: "/image-gen/products/maize-flour.png" },
      { name: "Wheat Flour 25kg", image: "/image-gen/products/wheat-flour.png" },
      { name: "Sugar 50kg", image: "/image-gen/products/sugar.png" },
      "Salt 1kg",
      "Tea Leaves 500g",
      "Milk Powder 900g",
      "Laundry Soap 800g",
    ],
  },
  "food-beverage": {
    name: "Food & Beverage",
    items: [
      "Bottled Water 500ml",
      "Soft Drinks 2L",
      "Fruit Juice 1L",
      "Energy Drinks 250ml",
      "Coffee 200g",
      "Biscuits Assorted",
      "Instant Noodles",
      "Canned Beans 400g",
      "Tomato Paste 70g",
    ],
  },
  electrical: {
    name: "Electrical",
    items: [
      "LED Bulbs 9W",
      "Extension Cable 5m",
      "Wall Sockets",
      "Light Switches",
      "Circuit Breakers",
      "Electrical Tape",
      "Wire Cable 2.5mm",
      "Bulb Holders",
      "Fuse Box",
    ],
  },
  construction: {
    name: "Construction",
    items: [
      "Cement 50kg",
      "Iron Sheets 3m",
      "Steel Bars 12mm",
      "Sand per Tonne",
      "Ballast per Tonne",
      "Paint 20L",
      "Nails 1kg",
      "Wood Timber 4x2",
      "Roofing Nails",
    ],
  },
  fmcg: {
    name: "FMCG",
    items: [
      "Washing Powder 2kg",
      "Bar Soap 800g",
      "Tissue Paper 10pk",
      "Toothpaste 150ml",
      "Shampoo 500ml",
      "Body Lotion 400ml",
      "Air Freshener",
      "Dishwashing Liquid",
      "Toilet Cleaner",
    ],
  },
  cosmetics: {
    name: "Cosmetics",
    items: [
      "Body Lotion 500ml",
      "Face Cream 50ml",
      "Lipstick Assorted",
      "Nail Polish Set",
      "Perfume 100ml",
      "Hair Oil 200ml",
      "Makeup Kit",
      "Eyeliner Pencil",
      "Foundation 30ml",
    ],
  },
  furniture: {
    name: "Furniture",
    items: [
      "Office Chair",
      "Study Desk",
      "Coffee Table",
      "Bookshelf 5-Tier",
      "Dining Table Set",
      "Wardrobe 3-Door",
      "Sofa 3-Seater",
      "Bed Frame Queen",
      "Cabinet Storage",
    ],
  },
  electronics: {
    name: "Electronics",
    items: [
      "Smartphone Basic",
      "Feature Phone",
      "Laptop Charger",
      "USB Cable Type-C",
      "Power Bank 10000mAh",
      "Earphones Wired",
      "Memory Card 32GB",
      "Phone Cases",
      "Screen Protector",
    ],
  },
  chemical: {
    name: "Chemical",
    items: [
      "Bleach 5L",
      "Disinfectant 5L",
      "Detergent Liquid 5L",
      "Floor Cleaner 5L",
      "Acid Cleaner",
      "Glass Cleaner",
      "Degreaser 5L",
      "Sanitizer 5L",
      "Insecticide Spray",
    ],
  },
  packaging: {
    name: "Packaging",
    items: [
      "Carton Boxes 10pk",
      "Bubble Wrap Roll",
      "Packing Tape 48mm",
      "Plastic Bags 1kg",
      "Paper Bags Brown",
      "Stretch Film Roll",
      "Foam Padding",
      "Label Stickers",
      "Rope Twine 100m",
    ],
  },
  textile: {
    name: "Textile",
    items: [
      "Cotton Fabric 5m",
      "Polyester Fabric 5m",
      "Thread Spools Set",
      "Zippers Assorted",
      "Buttons Pack",
      "Elastic Band 10m",
      "Lace Trim 5m",
      "Denim Fabric 5m",
      "Sewing Needles",
    ],
  },
  agricultural: {
    name: "Agricultural",
    items: [
      "Fertilizer 50kg",
      "Pesticide 1L",
      "Seeds Maize 10kg",
      "Farming Tools Set",
      "Irrigation Pipes",
      "Greenhouse Film",
      "Animal Feed 25kg",
      "Water Tank 500L",
      "Garden Hose 20m",
    ],
  },
  pharmaceutical: {
    name: "Pharmaceutical",
    items: [
      "Paracetamol 500mg",
      "Ibuprofen 400mg",
      "Antibiotics Pack",
      "Multivitamins",
      "First Aid Kit",
      "Bandages Roll",
      "Antiseptic 500ml",
      "Cough Syrup",
      "Pain Relief Gel",
    ],
  },
  stationery: {
    name: "Stationery",
    items: [
      "A4 Paper 500 Sheets",
      "Pens Blue 50pk",
      "Notebooks A5 10pk",
      "Staplers Heavy Duty",
      "Paper Clips 100pk",
      "Folders Plastic 10pk",
      "Markers Set 12pk",
      "Erasers White 20pk",
      "Rulers 30cm 10pk",
    ],
  },
  automotive: {
    name: "Automotive",
    items: [
      "Engine Oil 5L",
      "Brake Fluid 1L",
      "Car Batteries",
      "Tyres Assorted",
      "Spark Plugs Set",
      "Air Filters",
      "Brake Pads",
      "Coolant 5L",
      "Wiper Blades Pair",
    ],
  },
  plumbing: {
    name: "Plumbing",
    items: [
      "PVC Pipes 4m",
      "Pipe Fittings Set",
      "Taps Kitchen",
      "Shower Heads",
      "Toilet Seats",
      "Sink Drain Kit",
      "Water Heater",
      "Pipe Wrench",
      "Sealant Tape",
    ],
  },
  "industrial-equipment": {
    name: "Industrial Equipment",
    items: [
      "Safety Helmets",
      "Work Gloves 10pk",
      "Industrial Masks",
      "Welding Rods 5kg",
      "Power Drill",
      "Angle Grinder",
      "Measuring Tape 10m",
      "Safety Goggles",
      "Tool Box Large",
    ],
  },
  "cleaning-supplies": {
    name: "Cleaning Supplies",
    items: [
      "Mop & Bucket Set",
      "Broom Heavy Duty",
      "Trash Bags 50pk",
      "Cleaning Gloves 10pk",
      "Sponges 20pk",
      "Dustpan & Brush",
      "Window Cleaner 5L",
      "Toilet Brush Set",
      "Microfiber Cloths",
    ],
  },
  alcohol: {
    name: "Alcohol",
    items: [
      "Beer Bottles 24pk",
      "Wine Red 750ml",
      "Whiskey 1L",
      "Vodka 750ml",
      "Gin 750ml",
      "Rum 1L",
      "Champagne 750ml",
      "Tequila 750ml",
      "Brandy 750ml",
    ],
  },
}

const PAGE_BACKGROUND_STYLE: CSSProperties = {
  fontFamily: FONT_STACK,
  backgroundColor: "var(--background)",
  backgroundImage: `
    radial-gradient(closest-side at 18% 20%, rgba(56, 189, 248, 0.18), transparent 65%),
    radial-gradient(farthest-corner at 85% 10%, rgba(59, 130, 246, 0.16), transparent 60%),
    radial-gradient(closest-side at 50% 100%, rgba(129, 140, 248, 0.14), transparent 70%),
    linear-gradient(135deg, rgba(6, 12, 23, 0.94), rgba(3, 18, 34, 0.98))
  `,
  backgroundAttachment: "fixed",
}

type Rect = {
  top: number
  left: number
  width: number
  height: number
}

type SelectedProductState = {
  name: string
  image?: string
}

type ProductDetailOverlayProps = {
  product: SelectedProductState
  originRect: Rect
  isClosing: boolean
  onCloseComplete: () => void
}

function ProductDetailOverlay({ product, originRect, isClosing, onCloseComplete }: ProductDetailOverlayProps) {
  const initialStyle = useMemo<CSSProperties>(
    () => ({
      left: `${originRect.left}px`,
      top: `${originRect.top}px`,
      width: `${originRect.width}px`,
      height: `${originRect.height}px`,
      borderRadius: "0.5rem",
    }),
    [originRect]
  )

  const [imageStyle, setImageStyle] = useState<CSSProperties>(initialStyle)
  const [targetMetrics, setTargetMetrics] = useState({ width: originRect.width, top: originRect.top })
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    setImageStyle(initialStyle)
    setTargetMetrics({ width: originRect.width, top: originRect.top })
    setContentVisible(false)
  }, [initialStyle, originRect])

  useEffect(() => {
    if (isClosing) {
      setContentVisible(false)
      setImageStyle(initialStyle)
      return
    }

    const frame = requestAnimationFrame(() => {
      if (typeof window === "undefined") return
      const width = Math.min(originRect.width, window.innerWidth * 0.7)
      const top = Math.max(window.innerHeight * 0.2, 112)
      setTargetMetrics({ width, top })
      setImageStyle({
        left: `calc(50% - ${width / 2}px)`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${width}px`,
        borderRadius: "0.5rem",
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [initialStyle, isClosing, originRect.width])

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "top") return
      if (isClosing) {
        onCloseComplete()
        return
      }
      setContentVisible(true)
    },
    [isClosing, onCloseComplete]
  )

  const detailsStyle = useMemo<CSSProperties>(
    () => ({
      left: "50%",
      top: `${targetMetrics.top + targetMetrics.width + 24}px`,
      transform: "translateX(-50%)",
    }),
    [targetMetrics.top, targetMetrics.width]
  )

  return (
    <div className="fixed inset-0 z-20">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        style={PAGE_BACKGROUND_STYLE}
      />
      <div
        className="absolute z-20 flex items-center justify-center overflow-hidden transition-[top,left,width,height,border-radius] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
        style={{ ...imageStyle, pointerEvents: "none", position: "absolute" }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="relative h-full w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 420px, 70vw"
              className="object-contain"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/30">
              <svg
                className="h-24 w-24 sm:h-32 sm:w-32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div
        className={`absolute z-20 w-full max-w-sm text-center transition-all duration-300 ease-out ${
          contentVisible && !isClosing ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={detailsStyle}
      >
        <h1 className="mb-2 text-[9px] font-light uppercase tracking-[0.25em] text-white/90 sm:text-[10px]">
          {product.name}
        </h1>
        <p className="mb-4 text-[9px] font-light uppercase tracking-[0.2em] text-white/70 sm:text-[10px]">
          $20
        </p>
        <button
          type="button"
          className="mx-auto flex items-center justify-center rounded-lg bg-white px-6 py-2 text-[9px] font-light uppercase tracking-[0.2em] text-[#0a1929] transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:text-[10px]"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const params = useParams()
  const category = params?.category as string

  const categoryData = category ? CATEGORY_PRODUCTS[category] : null
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductState | null>(null)
  const [originRect, setOriginRect] = useState<Rect | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const imageRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleSignIn = useCallback(() => {
    if (typeof window === "undefined") return
    window.open("https://app.vendai.digital", "_blank", "noopener,noreferrer")
  }, [])

  const handleProductClick = useCallback(
    (item: string | ProductItem, index: number) => {
      if (selectedProduct || isClosing) return

      const productName = typeof item === "string" ? item : item.name
      const productImage = typeof item === "string" ? undefined : item.image
      const rect = imageRefs.current[index]?.getBoundingClientRect()

      let nextRect: Rect | null = null

      if (rect) {
        nextRect = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        }
      } else if (typeof window !== "undefined") {
        const width = Math.min(300, window.innerWidth * 0.6)
        nextRect = {
          top: window.innerHeight * 0.25,
          left: (window.innerWidth - width) / 2,
          width,
          height: width,
        }
      }

      if (!nextRect) return

      setOriginRect(nextRect)
      setIsClosing(false)
      setSelectedProduct({ name: productName, image: productImage })
    },
    [selectedProduct, isClosing]
  )

  const handleBackToProducts = useCallback(() => {
    if (!selectedProduct || isClosing) return
    setIsClosing(true)
  }, [selectedProduct, isClosing])

  const handleCloseComplete = useCallback(() => {
    setSelectedProduct(null)
    setOriginRect(null)
    setIsClosing(false)
  }, [])

  const assignImageRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      imageRefs.current[index] = node
    },
    []
  )

  useEffect(() => {
    if (!selectedProduct) return
    if (typeof document === "undefined") return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProduct])

  if (!categoryData) {
    notFound()
  }

  // Calculate grid layout
  const totalItems = categoryData.items.length
  const columns = 3 // lg:grid-cols-3
  const columnsSmall = 2 // grid-cols-2
  
  // Determine which items are in the last row (for different screen sizes)
  const lastRowStartLg = Math.floor((totalItems - 1) / columns) * columns
  const lastRowStartSm = Math.floor((totalItems - 1) / columnsSmall) * columnsSmall
  
  return (
    <div
      className="relative min-h-screen text-white antialiased"
      style={PAGE_BACKGROUND_STYLE}
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-30 overflow-hidden bg-[color:var(--background)]/75 px-3 py-1 text-[10px] tracking-[0.12em] text-white backdrop-blur-sm sm:px-6 sm:py-2 sm:text-sm sm:tracking-[0.15em]">
        <div className="flex h-full items-center justify-between">
          {selectedProduct ? (
            <button
              onClick={handleBackToProducts}
              className="group flex items-center transition-opacity duration-300 hover:opacity-70"
              aria-label="Back to all products"
            >
              <svg 
                className="h-5 w-5 sm:h-6 sm:w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
          ) : (
            <Link href="/" className="group flex items-center transition-opacity duration-300 hover:opacity-70">
              <svg 
                className="h-5 w-5 sm:h-6 sm:w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </Link>
          )}
          <span className="absolute left-1/2 -translate-x-1/2 text-[9px] font-light uppercase tracking-[0.25em] text-white/90 sm:text-[10px]">
            {categoryData.name}
          </span>
          <a
            href="https://app.vendai.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:py-1.5 sm:text-[10px]"
          >
            sign up
          </a>
        </div>
      </header>

      {selectedProduct && originRect && (
        <ProductDetailOverlay
          product={selectedProduct}
          originRect={originRect}
          isClosing={isClosing}
          onCloseComplete={handleCloseComplete}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 sm:pt-24">
        <div className="w-full">
          {/* Product Grid */}
          <div
            className={`relative transition-opacity duration-300 ${
              selectedProduct ? 'pointer-events-none' : ''
            } ${selectedProduct && !isClosing ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden={Boolean(selectedProduct)}
          >
            <div className="grid grid-cols-2 gap-x-1 gap-y-6 sm:grid-cols-3 sm:gap-x-2 sm:gap-y-8 lg:gap-x-3 lg:gap-y-10">
                {categoryData.items.map((item, index) => {
                  const isLastRowLg = index >= lastRowStartLg
                  const isLastRowSm = index >= lastRowStartSm
                  
                  const productName = typeof item === 'string' ? item : item.name
                  const productImage = typeof item === 'string' ? null : item.image
                  
                  return (
                    <button
                      key={`${category}-${index}`}
                      type="button"
                      onClick={() => handleProductClick(item, index)}
                      className={`group relative flex flex-col items-center transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        isLastRowLg ? 'hidden sm:block' : ''
                      } ${isLastRowSm ? 'mb-8 sm:mb-12' : ''}`}
                      aria-label={`View ${productName}`}
                    >
                      <div
                        ref={assignImageRef(index)}
                        className="mb-2 flex aspect-square w-[70%] items-center justify-center overflow-hidden rounded-lg transition-all duration-300 sm:w-[65%]"
                      >
                        {productImage ? (
                          <Image
                            src={productImage}
                            alt={productName}
                            width={300}
                            height={300}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-white/30">
                            <svg
                              className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={0.5}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="text-center text-[9px] font-light uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white sm:text-[10px]">
                        {productName}
                      </h3>
                    </button>
                  )
                })}
              </div>

              {/* Progressive blur/darken gradient overlay - different heights for mobile and desktop */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-md sm:h-[70%] sm:from-black/60 sm:via-black/30 sm:backdrop-blur-lg" style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }} />

              {/* Overlay CTA - positioned over last row */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center pb-2 sm:pb-3 lg:pb-4">
                <div className="pointer-events-auto relative mb-2 flex w-[95%] max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/20 backdrop-blur-xl sm:mb-3 sm:flex-row lg:mb-4" 
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 12, 23, 0.85), rgba(3, 18, 34, 0.9))',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  }}>
                  {/* Left side - Content */}
                  <div className="flex flex-1 flex-col items-start justify-center space-y-4 px-6 py-8 sm:space-y-6 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                    <h2 className="text-left text-xl font-light text-white sm:text-3xl lg:text-4xl" style={{ lineHeight: '1.3' }}>
                      Ready to start buying<br />wholesale online?
                    </h2>
                    
                    <div className="space-y-2 text-left text-xs text-white/90 sm:space-y-3 sm:text-base">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 text-white/80 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-light tracking-wide">60-day payment terms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 text-white/80 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-light tracking-wide">Free returns on all opening orders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 text-white/80 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-light tracking-wide">Unique products curated for your store</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSignIn}
                      className="mt-2 rounded-lg bg-white px-6 py-2.5 text-xs font-light uppercase tracking-[0.2em] text-[#0a1929] transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:mt-4 sm:px-12 sm:py-4 sm:text-base"
                    >
                      Sign up to buy
                    </button>
                  </div>

                  {/* Right side - Image */}
                  <div className="relative hidden sm:block sm:w-2/5">
                    <Image
                      src="/woman.png"
                      alt="Store owner"
                      width={500}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}
