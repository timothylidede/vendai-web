"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

export function AnimateIn({ children, className = "", delay = 0, duration = 0.6, direction = "up" }: AnimateInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getTransformClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out"

    if (!isVisible) {
      switch (direction) {
        case "up":
          return `${baseClasses} opacity-0 translate-y-8`
        case "down":
          return `${baseClasses} opacity-0 -translate-y-8`
        case "left":
          return `${baseClasses} opacity-0 translate-x-8`
        case "right":
          return `${baseClasses} opacity-0 -translate-x-8`
        case "fade":
          return `${baseClasses} opacity-0`
        default:
          return `${baseClasses} opacity-0 translate-y-8`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`
  }

  return (
    <div
      ref={ref}
      className={cn(getTransformClasses(), className)}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: isVisible ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  )
}

// Additional animation utilities
export function FadeIn({ children, className = "", delay = 0 }: Omit<AnimateInProps, "direction">) {
  return (
    <AnimateIn direction="fade" className={className} delay={delay}>
      {children}
    </AnimateIn>
  )
}

export function SlideInUp({ children, className = "", delay = 0 }: Omit<AnimateInProps, "direction">) {
  return (
    <AnimateIn direction="up" className={className} delay={delay}>
      {children}
    </AnimateIn>
  )
}

export function SlideInLeft({ children, className = "", delay = 0 }: Omit<AnimateInProps, "direction">) {
  return (
    <AnimateIn direction="left" className={className} delay={delay}>
      {children}
    </AnimateIn>
  )
}

// Stagger animation for lists
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <AnimateIn key={index} delay={index * staggerDelay}>
              {child}
            </AnimateIn>
          ))
        : children}
    </div>
  )
}
