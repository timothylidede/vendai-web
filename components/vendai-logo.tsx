"use client"

import { useTheme } from "next-themes"
import Image from "next/image"

interface VendaiLogoProps {
  className?: string
  size?: number
}

export function VendaiLogo({ className = "", size = 60 }: VendaiLogoProps) {
  const { theme } = useTheme()

  return (
    <Image
      src={theme === "dark" ? "/vendai-logo-dark.png" : "/vendai-logo-light.png"}
      alt="vendai"
      width={size}
      height={size}
      className={className}
      priority
    />
  )
}

export default VendaiLogo
