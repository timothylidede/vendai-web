"use client"
import { AnimateIn } from "@/components/ui/animate"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-mono text-foreground">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 pt-32 pb-20">
        <AnimateIn>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-red-500 via-green-400 to-red-500 bg-clip-text text-transparent">
            features.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-thin mb-12">
            discover everything vendai can do for your business.
          </p>
        </AnimateIn>

        {/* Feature sections will go here */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add detailed feature sections */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
