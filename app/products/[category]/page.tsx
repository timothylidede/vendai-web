"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useCallback } from "react"

const FONT_STACK = '"Neue Haas Grotesk Display Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'

// Category to product mapping
const CATEGORY_PRODUCTS: Record<string, { name: string; items: string[] }> = {
  "general-trade": {
    name: "General Trade",
    items: [
      "Rice 25kg",
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

  return (
    <div
      className="relative min-h-screen bg-[color:var(--background)] text-white antialiased"
      style={{ fontFamily: FONT_STACK }}
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[color:var(--background)]/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logo-icon-remove.png"
            alt="vendai icon"
            className="h-7 w-7 transition-all duration-500 group-hover:rotate-[360deg] sm:h-8 sm:w-8"
          />
          <span className="text-sm font-light uppercase tracking-[0.3em] text-white/90 sm:text-base">
            {categoryData.name}
          </span>
        </Link>
        <button
          type="button"
          onClick={handleSignIn}
          className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/90 transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-6 sm:text-sm"
        >
          sign in
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:gap-8">
            {categoryData.items.map((item, index) => (
              <div
                key={`${category}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex h-full w-full flex-col items-center justify-center p-4">
                  <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg bg-white/10 transition-all duration-300 group-hover:bg-white/15 sm:h-40 sm:w-40">
                    {/* Placeholder for product image */}
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
                  </div>
                  <h3 className="text-center text-xs font-light uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white sm:text-sm">
                    {item}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
