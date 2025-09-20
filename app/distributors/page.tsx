"use client"
import { AnimateIn } from "@/components/ui/animate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { 
  Network, 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Users, 
  BarChart3,
  Truck,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Building,
  Package,
  Clock
} from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Reach 10,000+ Retailers",
    description: "Connect with our growing network of verified Kenyan retailers.",
    stat: "10,000+ active retailers",
    color: "text-green-500"
  },
  {
    icon: TrendingUp,
    title: "Increase Sales Volume",
    description: "AI-powered demand forecasting drives more consistent orders.",
    stat: "40% volume increase",
    color: "text-blue-500"
  },
  {
    icon: Clock,
    title: "Faster Order Processing",
    description: "Automated ordering and inventory sync reduce processing time.",
    stat: "75% faster processing",
    color: "text-purple-500"
  },
  {
    icon: DollarSign,
    title: "Reduce Sales Costs",
    description: "Direct digital connections eliminate intermediary costs.",
    stat: "30% cost reduction",
    color: "text-orange-500"
  }
]

const features = [
  {
    title: "Digital Catalog Management",
    description: "Manage your product catalog and pricing across all retailers",
    icon: Package,
    details: ["Real-time price updates", "Product availability sync", "Bulk catalog uploads"]
  },
  {
    title: "Direct Retailer Access",
    description: "Connect directly with verified retailers across Kenya",
    icon: Network,
    details: ["Verified retailer network", "Geographic targeting", "Relationship management"]
  },
  {
    title: "Order Management System",
    description: "Streamlined order processing and fulfillment tracking",
    icon: Truck,
    details: ["Automated order routing", "Delivery tracking", "Invoice generation"]
  },
  {
    title: "Analytics & Insights",
    description: "Understand retailer demand and optimize your distribution",
    icon: BarChart3,
    details: ["Demand forecasting", "Sales analytics", "Market insights"]
  },
  {
    title: "Territory Management",
    description: "Manage sales territories and representative assignments",
    icon: Globe,
    details: ["Territory mapping", "Rep assignment", "Performance tracking"]
  },
  {
    title: "Secure Transactions",
    description: "Safe and secure payment processing for all orders",
    icon: Shield,
    details: ["Secure payments", "Credit management", "Transaction history"]
  }
]

const brands = [
  { name: "Bidco", logo: "/brand_images/bidco.png" },
  { name: "Unilever", logo: "/brand_images/unilever.png" },
  { name: "Coca-Cola", logo: "/brand_images/coke.png" },
  { name: "Brookside", logo: "/brand_images/brookside.png" },
  { name: "Cadbury", logo: "/brand_images/cadbury.png" },
  { name: "Del Monte", logo: "/brand_images/del-monte.png" },
  { name: "Ketepa", logo: "/brand_images/ketepa.png" },
  { name: "P&G", logo: "/brand_images/proctor.png" }
]

const testimonials = [
  {
    name: "David Mwangi",
    company: "Bidco Africa",
    role: "Sales Director",
    quote: "VendAI has transformed how we reach small retailers. We've seen a 45% increase in order volume.",
    rating: 5
  },
  {
    name: "Sarah Kamau",
    company: "East Africa Beverages",
    role: "Distribution Manager", 
    quote: "The platform makes it so easy to manage our retailer network. Orders are processed 3x faster now.",
    rating: 5
  }
]

export default function DistributorsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-mono text-foreground">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Hero Section */}
          <AnimateIn className="text-center mb-20">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              🏢 For Distributors & Suppliers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect Directly with <br />
              <span className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                10,000+ Retailers
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Expand your distribution network across Kenya. Connect with verified retailers, 
              streamline orders, and grow your business with AI-powered demand insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Building className="w-5 h-5" />
                Join as Distributor
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </AnimateIn>

          {/* Trusted Brands */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Trusted by leading brands across East Africa
              </p>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center opacity-60">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Benefits Grid */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Grow Your Distribution Network</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real results from distributors using VendAI's platform
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

          {/* Features for Distributors */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete Distribution Platform</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to manage and grow your distribution business
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

          {/* How it Works */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How VendAI Works for Distributors</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple integration that connects you directly with retailers
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Join Network",
                  description: "Register as a verified distributor on our platform",
                  icon: Building
                },
                {
                  step: "2", 
                  title: "Setup Catalog",
                  description: "Upload your products, prices, and availability",
                  icon: Package
                },
                {
                  step: "3",
                  title: "Connect Retailers",
                  description: "Get matched with retailers in your territory",
                  icon: Network
                },
                {
                  step: "4",
                  title: "Process Orders",
                  description: "Receive and fulfill orders automatically",
                  icon: Truck
                }
              ].map((step, index) => (
                <AnimateIn key={index} delay={index * 0.2}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* Testimonials */}
          <AnimateIn className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Distributors Say</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Success stories from our distribution partners
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="border-t pt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <p className="text-sm text-gray-400">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* CTA Section */}
          <AnimateIn className="text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Expand Your Network?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join leading distributors already using VendAI to connect with retailers across Kenya. 
                  Get started today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    <Building className="w-5 h-5" />
                    Become a Partner
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Sales
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  No setup fees • Commission-based model • Full support included
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
