"use client"
import { AnimateIn } from "@/components/ui/animate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { 
  ShoppingCart, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  BarChart3,
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Sales by 30%",
    description: "AI-powered recommendations and inventory optimization help you sell more.",
    stat: "30% average increase",
    color: "text-green-500"
  },
  {
    icon: Clock,
    title: "Save 5 Hours Daily",
    description: "Automated inventory management and AI assistant handle routine tasks.",
    stat: "5+ hours saved daily",
    color: "text-blue-500"
  },
  {
    icon: DollarSign,
    title: "Reduce Costs by 25%",
    description: "Direct distributor connections and smart ordering minimize waste.",
    stat: "25% cost reduction",
    color: "text-purple-500"
  },
  {
    icon: Users,
    title: "Better Customer Service",
    description: "Faster checkouts, accurate inventory, and personalized recommendations.",
    stat: "50% faster service",
    color: "text-orange-500"
  }
]

const features = [
  {
    title: "Smart Inventory Management",
    description: "Never run out of popular items or overstock slow movers",
    icon: BarChart3,
    details: ["Automated reorder alerts", "Demand forecasting", "Stock optimization"]
  },
  {
    title: "Direct Distributor Access",
    description: "Connect with verified distributors for better prices",
    icon: ShoppingCart,
    details: ["Wholesale pricing", "Bulk order discounts", "Reliable suppliers"]
  },
  {
    title: "Mobile POS System",
    description: "Complete point-of-sale solution that works anywhere",
    icon: Smartphone,
    details: ["Mobile payments", "Receipt printing", "Offline capability"]
  },
  {
    title: "AI Business Assistant",
    description: "Natural language interface that understands your business",
    icon: Zap,
    details: ["Voice commands", "Swahili support", "Smart suggestions"]
  },
  {
    title: "Customer Management",
    description: "Build relationships and increase customer loyalty",
    icon: Users,
    details: ["Customer profiles", "Purchase history", "Loyalty programs"]
  },
  {
    title: "Secure & Reliable",
    description: "Bank-level security with automatic data backup",
    icon: Shield,
    details: ["Data encryption", "Cloud backup", "Secure payments"]
  }
]

const testimonials = [
  {
    name: "Mary Wanjiku",
    business: "Wanjiku Supermarket, Nairobi",
    quote: "VendAI helped me increase my sales by 40% in just 3 months. The AI assistant is like having a business partner!",
    rating: 5
  },
  {
    name: "John Kimani",
    business: "Kimani Store, Mombasa",
    quote: "I save so much time on inventory. VendAI knows what I need before I do. Best investment for my business.",
    rating: 5
  },
  {
    name: "Grace Nyong'o",
    business: "Grace Mini-Mart, Kisumu",
    quote: "The distributor connections alone saved me 20% on costs. My customers love the faster service too.",
    rating: 5
  }
]

export default function RetailersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-mono text-foreground">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Hero Section */}
          <AnimateIn className="text-center mb-20">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              🏪 For Kenyan Retailers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your <br />
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Minimart Business
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of Kenyan retailers using VendAI to increase sales, reduce costs, 
              and provide better customer service. Free to use, easy to setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/download'}>
                <Zap className="w-5 h-5" />
                Start Free Today
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </AnimateIn>

          {/* Benefits Grid */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven Results for Retailers</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real results from Kenyan businesses just like yours
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                        <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {benefit.description}
                      </p>
                      <Badge variant="secondary" className={benefit.color}>
                        {benefit.stat}
                      </Badge>
                    </CardContent>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* Features for Retailers */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything Your Business Needs</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Designed specifically for Kenyan minimarts and small retail businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* Testimonials */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Retailers Say</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real stories from business owners across Kenya
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="border-t pt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.business}</p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* How it Works */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get Started in 3 Steps</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Setup is quick and easy - no technical knowledge required
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Download & Install",
                  description: "Get VendAI from our download page and install on your device"
                },
                {
                  step: "2", 
                  title: "Setup Your Store",
                  description: "Add your products, connect with distributors, and configure settings"
                },
                {
                  step: "3",
                  title: "Start Selling",
                  description: "Begin taking payments, managing inventory, and growing your business"
                }
              ].map((step, index) => (
                <AnimateIn key={index} delay={index * 0.2}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* CTA Section */}
          <AnimateIn className="text-center">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of successful Kenyan retailers. VendAI is free to download and use. 
                  Start transforming your business today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => window.location.href = '/download'}>
                    <Zap className="w-5 h-5" />
                    Download VendAI Free
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Support
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  No credit card required • Always free to use • Setup in minutes
                </p>
              </CardContent>
            </Card>
          </AnimateIn>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
