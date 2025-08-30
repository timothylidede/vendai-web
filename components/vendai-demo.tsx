"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const inventoryData = [
  { item: "Maize Flour (2kg)", qty: 15, reorder: 20, status: "low" },
  { item: "Cooking Oil (1L)", qty: 8, reorder: 10, status: "critical" },
  { item: "Sugar (1kg)", qty: 25, reorder: 15, status: "good" },
  { item: "Rice (2kg)", qty: 12, reorder: 18, status: "low" },
  { item: "Tea Leaves (500g)", qty: 30, reorder: 12, status: "good" },
]

const aiMessages = [
  "Analyzing inventory levels...",
  "Cooking Oil is running low (8 units left)",
  "Recommend ordering 20 units from Bidco Africa",
  "Estimated delivery: 2-3 days",
]

export function VendaiDemo() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMessage < aiMessages.length - 1) {
        setCurrentMessage((prev) => prev + 1)
      } else {
        setIsTyping(false)
        setShowSuggestions(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [currentMessage])

  return (
    <div className="bg-card border rounded-xl shadow-2xl w-full max-w-4xl h-[500px] grid grid-cols-[1fr_320px] overflow-hidden">
      {/* Main Dashboard */}
      <div className="p-6 border-r">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Inventory Overview</h3>
          <Badge variant="outline" className="text-xs">
            Live Data
          </Badge>
        </div>

        <div className="space-y-3">
          {inventoryData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.item}</p>
                <p className="text-xs text-muted-foreground">Reorder at: {item.reorder}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold">{item.qty}</span>
                <Badge
                  variant={item.status === "critical" ? "destructive" : item.status === "low" ? "secondary" : "default"}
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Panel */}
      <div className="bg-background/50 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">vendai Assistant</span>
        </div>

        <div className="flex-1 space-y-3 mb-4">
          {aiMessages.slice(0, currentMessage + 1).map((message, index) => (
            <div key={index} className="bg-muted p-3 rounded-lg text-sm">
              {index === currentMessage && isTyping ? (
                <div className="flex items-center gap-1">
                  <span>{message}</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              ) : (
                message
              )}
            </div>
          ))}
        </div>

        {showSuggestions && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <Button size="sm" className="w-full justify-start text-xs">
              Create Purchase Order
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
              Contact Bidco Africa
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              Set Auto-Reorder
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { VendaiDemo as VendAIDemo }
