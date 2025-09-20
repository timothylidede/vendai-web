"use client"
import { AnimateIn } from "@/components/ui/animate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { 
  Brain, 
  Truck, 
  CreditCard, 
  BarChart3, 
  Smartphone, 
  ShoppingCart,
  Zap,
  Users,
  Package,
  TrendingUp,
  MessageSquare,
  Shield
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Inventory",
    description: "Smart inventory management that learns your business patterns and predicts stock needs.",
    benefits: ["Automated reordering", "Demand forecasting", "Stock optimization"],
    category: "AI Core"
  },
  {
    icon: Truck,
    title: "Direct Distributor Network",
    description: "Connect directly with distributors for seamless restocking and better pricing.",
    benefits: ["Real-time catalog access", "Bulk ordering", "Competitive pricing"],
    category: "Supply Chain"
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Deep insights into your business performance with AI-driven recommendations.",
    benefits: ["Sales analytics", "Profit tracking", "Performance insights"],
    category: "Analytics"
  },
  {
    icon: CreditCard,
    title: "Integrated POS System",
    description: "Complete point-of-sale solution with payment processing and receipt management.",
    benefits: ["Multiple payment methods", "Receipt printing", "Transaction history"],
    category: "POS"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for mobile devices with offline capability for uninterrupted service.",
    benefits: ["Works offline", "Mobile optimized", "Cloud sync"],
    category: "Technology"
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Build customer relationships with purchase history and loyalty programs.",
    benefits: ["Customer profiles", "Purchase history", "Loyalty tracking"],
    category: "CRM"
  },
  {
    icon: Package,
    title: "Product Catalog",
    description: "Comprehensive product database with barcode scanning and pricing management.",
    benefits: ["Barcode scanning", "Price management", "Product variants"],
    category: "Catalog"
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Natural language interface that understands your shop's operations and language.",
    benefits: ["Voice commands", "Local language support", "Smart suggestions"],
    category: "AI Core"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Bank-level security with automatic backups and data protection.",
    benefits: ["Data encryption", "Automatic backups", "Secure payments"],
    category: "Security"
  }
]

const categories = ["All", "AI Core", "Supply Chain", "Analytics", "POS", "Technology", "CRM", "Catalog", "Security"]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-sans text-foreground">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimateIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Features Built for <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
                Modern Retail
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how VendAI transforms your minimart with cutting-edge AI technology, 
              seamless integrations, and powerful analytics.
            </p>
          </AnimateIn>

          {/* Hero Feature */}
          <AnimateIn className="mb-20">
            <Card className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge variant="secondary" className="mb-4">
                      🚀 Core Feature
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      AI That Speaks Your Language
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      VendAI's LLM-powered OS understands your shop's unique language and operations. 
                      From Swahili commands to local product names, our AI adapts to your business.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="outline">Swahili Support</Badge>
                      <Badge variant="outline">Local Products</Badge>
                      <Badge variant="outline">Voice Commands</Badge>
                      <Badge variant="outline">Smart Learning</Badge>
                    </div>
                    <Button size="lg" onClick={() => window.location.href = '/download'}>
                      <Brain className="w-5 h-5" />
                      Try VendAI Now
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <Brain className="w-24 h-24 text-blue-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimateIn>

          {/* Features Grid */}
          <AnimateIn className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive features designed specifically for Kenyan minimarts and retail businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* CTA Section */}
          <AnimateIn className="text-center">
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Shop?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of Kenyan retailers already using VendAI to grow their business. 
                  Free to download and use.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => window.location.href = '/download'}>
                    <Zap className="w-5 h-5" />
                    Download VendAI
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.location.href = '/retailers'}>
                    <Users className="w-5 h-5" />
                    For Retailers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimateIn>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
