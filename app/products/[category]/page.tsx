"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useCallback } from "react"

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
      "Cooking Oil 5L",
      "Sugar 50kg",
      "Wheat Flour 25kg",
      "Maize Flour 10kg",
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

export default function ProductsPage() {
  const params = useParams()
  const category = params?.category as string

  const categoryData = category ? CATEGORY_PRODUCTS[category] : null

  const handleSignIn = useCallback(() => {
    if (typeof window === "undefined") return
    window.open("https://app.vendai.digital", "_blank", "noopener,noreferrer")
  }, [])

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
  
  // Calculate second-to-last row for small screens
  const secondLastRowStartSm = lastRowStartSm - columnsSmall

  return (
    <div
      className="relative min-h-screen text-white antialiased"
      style={{ 
        fontFamily: FONT_STACK,
        backgroundColor: 'var(--background)',
        backgroundImage: `
          radial-gradient(closest-side at 18% 20%, rgba(56, 189, 248, 0.18), transparent 65%),
          radial-gradient(farthest-corner at 85% 10%, rgba(59, 130, 246, 0.16), transparent 60%),
          radial-gradient(closest-side at 50% 100%, rgba(129, 140, 248, 0.14), transparent 70%),
          linear-gradient(135deg, rgba(6, 12, 23, 0.94), rgba(3, 18, 34, 0.98))
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-30 overflow-hidden bg-[color:var(--background)]/75 px-3 py-1 text-[10px] tracking-[0.12em] text-white backdrop-blur-sm sm:px-6 sm:py-2 sm:text-sm sm:tracking-[0.15em]">
        <div className="flex h-full items-center justify-between">
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

      {/* Main Content */}
      <main className="pt-16 sm:pt-24">
        <div className="w-full">
          {/* Product Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-3 lg:gap-4">
              {categoryData.items.map((item, index) => {
                const isLastRowLg = index >= lastRowStartLg
                const isLastRowSm = index >= lastRowStartSm
                const isSecondLastRowSm = index >= secondLastRowStartSm && index < lastRowStartSm
                
                const productName = typeof item === 'string' ? item : item.name
                const productImage = typeof item === 'string' ? null : item.image
                
                return (
                  <div
                    key={`${category}-${index}`}
                    className={`group relative flex flex-col items-center transition-all duration-300 ${
                      isLastRowLg ? 'hidden sm:block' : ''
                    } ${isLastRowSm ? 'mb-8 sm:mb-12' : ''}`}
                  >
                    <div className="mb-2 flex aspect-square w-[85%] items-center justify-center overflow-hidden rounded-lg transition-all duration-300 sm:w-[80%]">
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
                    <h3 className="text-center text-xs font-light uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white sm:text-sm">
                      {productName}
                    </h3>
                  </div>
                )
              })}
            </div>

            {/* Progressive blur/darken gradient overlay - different heights for mobile and desktop */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-md sm:h-[70%] sm:from-black/60 sm:via-black/30 sm:backdrop-blur-lg" style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }} />

            {/* Overlay CTA - positioned over last row */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center pb-4 sm:pb-6 lg:pb-8">
              <div className="pointer-events-auto mb-6 flex flex-col items-center justify-center space-y-4 rounded-2xl border border-white/10 bg-[#4a4538]/95 px-6 py-8 backdrop-blur-sm sm:mb-8 sm:space-y-6 sm:px-16 sm:py-16 lg:mb-12 lg:px-20 lg:py-20">
                <h2 className="text-center text-xl font-light text-white sm:text-3xl lg:text-4xl" style={{ lineHeight: '1.3' }}>
                  Ready to start buying<br />wholesale online?
                </h2>
                
                <div className="space-y-2 text-center text-xs text-white/90 sm:space-y-3 sm:text-base">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 text-white/80 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light tracking-wide">60-day payment terms</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 text-white/80 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light tracking-wide">Free returns on all opening orders</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 text-white/80 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light tracking-wide">Unique products curated for your store</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignIn}
                  className="mt-2 rounded-lg bg-white px-6 py-2.5 text-xs font-light uppercase tracking-[0.2em] text-[#4a4538] transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:mt-4 sm:px-12 sm:py-4 sm:text-base"
                >
                  Sign up to shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
