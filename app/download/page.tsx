"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimateIn } from "@/components/ui/animate"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Download, Loader2, AlertCircle, Monitor, Smartphone, HardDrive, Cpu } from "lucide-react"

interface DownloadFile {
  name: string
  url: string
  size: number
  platform: "windows" | "macos" | "linux"
  type: string
  downloads?: number
}

interface ReleaseData {
  version: string
  name: string
  description: string
  publishedAt: string
  downloads: {
    total: number
    windows: DownloadFile[]
    macos: DownloadFile[]
    linux: DownloadFile[]
  }
}

interface SystemRequirement {
  os: string
  requirements: string[]
}

const systemRequirements: SystemRequirement[] = [
  {
    os: "Windows",
    requirements: ["Windows 10 or later (64-bit)", "4GB RAM", "500MB storage space"]
  },
  {
    os: "macOS", 
    requirements: ["macOS 10.15 (Catalina) or later", "4GB RAM", "500MB storage space"]
  },
  {
    os: "Linux",
    requirements: ["Ubuntu 18.04+ or equivalent", "4GB RAM", "500MB storage space"]
  }
]

// Fallback data when API is unavailable
const fallbackReleaseData: ReleaseData = {
  version: "v1.0.0",
  name: "VendAI POS v1.0.0", 
  description: "The latest version of VendAI POS with improved performance, new features, and bug fixes.",
  publishedAt: "2025-09-18T12:00:00Z",
  downloads: {
    total: 1234,
    windows: [
      {
        name: "VendAI-POS-v1.0.0-Windows-Setup.exe",
        url: "https://github.com/timothylidede/vendai-pos/releases/download/v1.0.0/VendAI-POS-v1.0.0-Windows-Setup.exe",
        size: 87654321, // ~87.7 MB
        platform: "windows",
        type: "installer",
        downloads: 567
      }
    ],
    macos: [
      {
        name: "VendAI-POS-v1.0.0-macOS-Intel.dmg",
        url: "https://github.com/timothylidede/vendai-pos/releases/download/v1.0.0/VendAI-POS-v1.0.0-macOS-Intel.dmg",
        size: 92345678, // ~92.3 MB
        platform: "macos", 
        type: "installer",
        downloads: 234
      },
      {
        name: "VendAI-POS-v1.0.0-macOS-Apple-Silicon.dmg",
        url: "https://github.com/timothylidede/vendai-pos/releases/download/v1.0.0/VendAI-POS-v1.0.0-macOS-Apple-Silicon.dmg",
        size: 89012345, // ~89.0 MB
        platform: "macos", 
        type: "installer",
        downloads: 189
      }
    ],
    linux: [
      {
        name: "VendAI-POS-v1.0.0-Linux.AppImage",
        url: "https://github.com/timothylidede/vendai-pos/releases/download/v1.0.0/VendAI-POS-v1.0.0-Linux.AppImage",
        size: 78901234, // ~78.9 MB
        platform: "linux",
        type: "package", 
        downloads: 123
      }
    ]
  }
}

function detectOS(): "windows" | "macos" | "linux" | "unknown" {
  if (typeof window === "undefined") return "unknown"
  
  const userAgent = window.navigator.userAgent.toLowerCase()
  const platform = window.navigator.platform.toLowerCase()
  
  if (/mac/.test(platform) || /mac/.test(userAgent)) return "macos"
  if (/win/.test(platform) || /win/.test(userAgent)) return "windows" 
  if (/linux/.test(platform) || /linux/.test(userAgent)) return "linux"
  return "unknown"
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getOSDisplayName(platform: string): string {
  switch (platform) {
    case "windows": return "Windows"
    case "macos": return "macOS"
    case "linux": return "Linux"
    default: return platform
  }
}

function getOSIcon(platform: string) {
  switch (platform) {
    case "windows":
      return <img src="/microsoft.png" alt="Windows" className="w-5 h-5" />
    case "macos":
      return <img src="/apple.png" alt="macOS" className="w-5 h-5" />
    case "linux":
      return <Monitor className="w-5 h-5" />
    default:
      return <Download className="w-5 h-5" />
  }
}

export default function DownloadPage() {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userOS, setUserOS] = useState<"windows" | "macos" | "linux" | "unknown">("unknown")
  const [showAllDownloads, setShowAllDownloads] = useState(false)

  useEffect(() => {
    setUserOS(detectOS())
    
    const fetchReleaseData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://vendai-nzd6u7wvp-vendais-projects.vercel.app/api/releases/latest")
        
        if (!response.ok) {
          throw new Error("Failed to fetch release data")
        }
        
        const data = await response.json()
        setReleaseData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching release data:", err)
        // Use fallback data when API is unavailable
        setReleaseData(fallbackReleaseData)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchReleaseData()
  }, [])

  const getPrimaryDownload = () => {
    if (!releaseData || userOS === "unknown") return null
    return releaseData.downloads[userOS]?.[0] || null
  }

  const getSecondaryDownloads = (): Array<{ platform: string; file: DownloadFile }> => {
    if (!releaseData) return []
    
    const platforms = ["windows", "macos", "linux"] as const
    const otherPlatforms = platforms.filter(p => p !== userOS)
    
    return otherPlatforms.map(platform => ({
      platform,
      file: releaseData.downloads[platform]?.[0] || null
    })).filter(item => item.file !== null) as Array<{ platform: string; file: DownloadFile }>
  }

  const getAllDownloads = (): Array<{ platform: string; files: DownloadFile[] }> => {
    if (!releaseData) return []
    
    const allDownloads: Array<{ platform: string; files: DownloadFile[] }> = []
    const platforms = ["windows", "macos", "linux"] as const
    
    platforms.forEach(platform => {
      const files = releaseData.downloads[platform]
      if (files && files.length > 0) {
        allDownloads.push({ platform, files })
      }
    })
    
    return allDownloads
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] font-sans text-foreground">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimateIn className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Download VendAI POS
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The AI-powered point of sale system designed for modern retail. 
              Free to download and use.
            </p>
          </AnimateIn>

          {loading && (
            <AnimateIn className="text-center py-16">
              <div className="flex items-center justify-center gap-3 text-lg">
                <Loader2 className="w-6 h-6 animate-spin" />
                Loading download information...
              </div>
            </AnimateIn>
          )}

          {error && (
            <AnimateIn className="text-center py-16">
              <Card className="max-w-md mx-auto border-destructive/20">
                <CardContent className="flex items-center justify-center gap-3 text-destructive pt-6">
                  <AlertCircle className="w-6 h-6" />
                  <p>{error}</p>
                </CardContent>
              </Card>
            </AnimateIn>
          )}

          {releaseData && !loading && !error && (
            <>
              {/* Primary Download Section */}
              <AnimateIn className="mb-16">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-sm">
                        {releaseData.version}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {new Date(releaseData.publishedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{releaseData.name}</CardTitle>
                    <CardDescription className="text-base">
                      {releaseData.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {userOS !== "unknown" && getPrimaryDownload() && (
                      <div className="text-center">
                        <Button 
                          size="lg" 
                          className="text-lg px-8 py-6 mb-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                          onClick={() => window.open(getPrimaryDownload()!.url, '_blank')}
                        >
                          {getOSIcon(userOS)}
                          Download for {getOSDisplayName(userOS)}
                          <span className="text-sm opacity-70 ml-2">
                            ({formatFileSize(getPrimaryDownload()!.size)})
                          </span>
                        </Button>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Detected: {getOSDisplayName(userOS)} • {getPrimaryDownload()!.downloads || 0} downloads
                        </p>
                      </div>
                    )}

                    {userOS === "unknown" && (
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Unable to detect your operating system. Choose your platform below:
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimateIn>

              {/* Secondary Downloads */}
              {(userOS === "unknown" || getSecondaryDownloads().length > 0) && (
                <AnimateIn className="mb-16">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Other Platforms</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Download for different operating systems
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {(userOS === "unknown" 
                      ? getAllDownloads().map(item => ({ 
                          platform: item.platform, 
                          file: item.files[0] || null 
                        })).filter(item => item.file !== null) as Array<{ platform: string; file: DownloadFile }>
                      : getSecondaryDownloads()
                    ).map((item, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-center mb-4">
                            {getOSIcon(item.platform)}
                          </div>
                          <h3 className="font-semibold text-lg mb-2">
                            {getOSDisplayName(item.platform)}
                          </h3>
                          {item.file && (
                            <>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {formatFileSize(item.file.size)} • {item.file.downloads || 0} downloads
                              </p>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => window.open(item.file!.url, '_blank')}
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </Button>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AnimateIn>
              )}

              {/* View All Downloads Toggle */}
              <AnimateIn className="text-center mb-16">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAllDownloads(!showAllDownloads)}
                  className="text-base"
                >
                  {showAllDownloads ? "Hide" : "View all downloads"}
                </Button>
                
                {showAllDownloads && (
                  <div className="mt-8 max-w-4xl mx-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle>All Available Downloads</CardTitle>
                        <CardDescription>
                          Complete list of all available files for {releaseData.version}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {getAllDownloads().map((platform, platformIndex) => (
                          <div key={platformIndex} className="mb-6 last:mb-0">
                            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              {getOSIcon(platform.platform)}
                              {getOSDisplayName(platform.platform)}
                            </h4>
                            <div className="space-y-2">
                              {platform.files.map((file, fileIndex) => (
                                <div 
                                  key={fileIndex}
                                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{file.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {formatFileSize(file.size)} • {file.type} • {file.downloads || 0} downloads
                                    </p>
                                  </div>
                                  <Button 
                                    size="sm"
                                    onClick={() => window.open(file.url, '_blank')}
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </AnimateIn>

              {/* System Requirements */}
              <AnimateIn className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">System Requirements</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Minimum requirements to run VendAI POS
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {systemRequirements.map((req, index) => (
                    <Card key={index}>
                      <CardHeader className="text-center pb-4">
                        <div className="flex items-center justify-center mb-2">
                          {req.os === "Windows" && <img src="/microsoft.png" alt="Windows" className="w-8 h-8" />}
                          {req.os === "macOS" && <img src="/apple.png" alt="macOS" className="w-8 h-8" />}
                          {req.os === "Linux" && <Monitor className="w-8 h-8" />}
                        </div>
                        <CardTitle className="text-xl">{req.os}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {req.requirements.map((requirement, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimateIn>

              {/* Installation Instructions */}
              <AnimateIn className="mb-16">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Installation Instructions</CardTitle>
                    <CardDescription>
                      Quick setup guide for VendAI POS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">1. Download</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Download the installer for your operating system
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <HardDrive className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">2. Install</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Run the installer and follow the setup wizard
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">3. Launch</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Open VendAI POS and start setting up your store
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Need help?</strong> Visit our documentation or contact support for assistance with installation and setup.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateIn>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
