import fs from "fs"
import path from "path"
import { config as loadEnv } from "dotenv"
import Replicate from "replicate"

loadEnv({ path: path.join(process.cwd(), ".env.local") })
loadEnv({ path: path.join(process.cwd(), ".env") })

const replicateToken = process.env.REPLICATE_API_TOKEN
if (!replicateToken) {
  console.error("❌ Missing REPLICATE_API_TOKEN in environment")
  process.exit(1)
}

const modelIdentifier = process.env.REPLICATE_MODEL_ID || "bytedance/seedream-4"

const replicate = new Replicate({ auth: replicateToken })

interface CategoryPrompt {
  category: string
  filename: string
  prompt: string
}

// Kenyan-context prompts with slate color as primary
const curatedPrompts: CategoryPrompt[] = [
  {
    category: "General Trade",
    filename: "general-trade",
    prompt:
      "A vibrant Kenyan wholesale shop with slate grey metal shelves stocked with diverse goods, colorful packaging visible, warm afternoon sunlight streaming through windows, professional product photography, realistic depth of field, 8k quality",
  },
  {
    category: "Food & Beverage",
    filename: "food-beverage",
    prompt:
      "Modern Kenyan supermarket aisle with slate colored display units showcasing fresh produce, mandazi, chapati flour, tropical fruits, and beverages, bright commercial lighting, clean composition, photorealistic, ultra HD",
  },
  {
    category: "Electrical",
    filename: "electrical",
    prompt:
      "Nairobi electrical supply store interior with slate grey industrial cabinets filled with cables, switches, bulbs, and power tools, organized professional display, cinematic lighting, sharp focus, high resolution",
  },
  {
    category: "Construction",
    filename: "construction",
    prompt:
      "Kenyan hardware store with slate painted concrete walls displaying construction materials - cement bags, iron sheets, timber, tools - dust particles in sunlight, authentic commercial photography, 4k detail",
  },
  {
    category: "FMCG",
    filename: "fmcg",
    prompt:
      "Busy Kenyan kiosk counter with slate grey surface displaying fast-moving goods - soaps, biscuits, cooking oil, airtime scratch cards - colorful product labels, natural daylight, documentary style, crystal clear",
  },
  {
    category: "Cosmetics",
    filename: "cosmetics",
    prompt:
      "Elegant Kenyan beauty shop with slate colored marble countertop showcasing cosmetics, skincare products, hair extensions, and perfumes, soft diffused lighting, luxury retail aesthetic, macro detail, premium quality",
  },
  {
    category: "Furniture",
    filename: "furniture",
    prompt:
      "Kenyan furniture showroom featuring slate grey upholstered sofas and chairs with traditional kikoy cushions, polished concrete floor, natural wood accents, architectural photography, wide angle, 8k resolution",
  },
  {
    category: "Electronics",
    filename: "electronics",
    prompt:
      "Modern Nairobi electronics store with slate colored display stands showing smartphones, laptops, and M-PESA devices, LED accent lighting, reflective surfaces, commercial photography, ultra sharp",
  },
  {
    category: "Chemical",
    filename: "chemical",
    prompt:
      "Industrial chemical supplier in Kenya with slate grey safety cabinets containing cleaning agents, agricultural chemicals, and safety equipment, professional warehouse lighting, safety-focused composition, high definition",
  },
  {
    category: "Packaging",
    filename: "packaging",
    prompt:
      "Kenyan packaging supplier warehouse with slate colored metal racks stacked with cardboard boxes, plastic containers, and wrapping materials, industrial environment, organized rows, commercial photography, 4k",
  },
  {
    category: "Textile",
    filename: "textile",
    prompt:
      "Bustling Kenyan fabric market stall with slate grey backdrop showcasing colorful kitenge, kanga fabrics, and textile rolls, vibrant patterns, dynamic composition, authentic street photography style, high resolution",
  },
  {
    category: "Agricultural",
    filename: "agricultural",
    prompt:
      "Kenyan agro-vet shop with slate painted walls displaying seeds, fertilizers, farm tools, and fresh vegetables - sukuma wiki, tomatoes - natural lighting, earthy tones with pops of color, documentary style, sharp detail",
  },
  {
    category: "Pharmaceutical",
    filename: "pharmaceutical",
    prompt:
      "Clean Kenyan pharmacy interior with slate grey shelving units organized with medicine bottles, first aid supplies, and health products, sterile white lighting, professional medical environment, ultra HD quality",
  },
  {
    category: "Stationery",
    filename: "stationery",
    prompt:
      "Kenyan bookshop with slate colored wooden desk displaying colorful exercise books, pens, geometry sets, and school supplies, warm overhead lighting, organized display, nostalgic atmosphere, 8k detail",
  },
  {
    category: "Automotive",
    filename: "automotive",
    prompt:
      "Nairobi auto parts shop with slate grey workbench featuring car batteries, tires, engine parts, and tools, industrial garage setting, dramatic workshop lighting, mechanical details, photorealistic, high quality",
  },
  {
    category: "Plumbing",
    filename: "plumbing",
    prompt:
      "Kenyan plumbing supplies store with slate colored concrete display showing PVC pipes, taps, fittings, and tools, practical warehouse environment, natural light through skylights, commercial photography, crystal clear",
  },
  {
    category: "Industrial Equipment",
    filename: "industrial-equipment",
    prompt:
      "Industrial supplier in Nairobi with slate grey steel platforms displaying generators, welding machines, and heavy machinery, factory environment, metal textures, professional lighting, 4k resolution",
  },
  {
    category: "Cleaning Supplies",
    filename: "cleaning-supplies",
    prompt:
      "Kenyan cleaning supplies shop with slate painted shelves stocked with colorful detergents, brooms, mops, and disinfectants, bright commercial lighting, organized display, vibrant product colors, ultra HD",
  },
  {
    category: "Alcohol",
    filename: "alcohol",
    prompt:
      "Upscale Kenyan liquor store with slate grey stone counter displaying Tusker beer, wines, and spirits, warm ambient lighting, glass reflections, sophisticated retail environment, premium photography, 8k quality",
  },
]

type GenerationRecord = Record<string, string>

const projectRoot = process.cwd()
const imageGenRoot = path.join(projectRoot, "image-gen")
const outputsRoot = path.join(imageGenRoot, "outputs")
const publicImageRoot = path.join(projectRoot, "public", "image-gen")

const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
const outputDir = path.join(outputsRoot, timestamp)

fs.mkdirSync(outputDir, { recursive: true })
fs.mkdirSync(publicImageRoot, { recursive: true })

const metadata: GenerationRecord[] = []

type ReplicateStatus = "starting" | "processing" | "succeeded" | "failed" | "canceled"

interface ReplicatePrediction {
  id: string
  status: ReplicateStatus
  output?: unknown
  error?: string | null
}

const terminalStates: ReplicateStatus[] = ["succeeded", "failed", "canceled"]

async function resolveImageUrl(value: unknown): Promise<string | undefined> {
  if (!value) return undefined

  if (typeof value === "string") {
    return value.startsWith("http") ? value : undefined
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const result = await resolveImageUrl(entry)
      if (result) return result
    }
    return undefined
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>

    if (typeof record.url === "string" && record.url.startsWith("http")) {
      return record.url
    }

    if (typeof record.url === "function") {
      try {
        const result = await record.url()
        if (typeof result === "string" && result.startsWith("http")) {
          return result
        }
      } catch {
        // ignore failures calling url() helper
      }
    }

    for (const key of ["image", "href", "uri", "url"] as const) {
      const candidate = record[key]
      if (typeof candidate === "string" && candidate.startsWith("http")) {
        return candidate
      }
    }

    for (const key of Object.keys(record)) {
      const result = await resolveImageUrl(record[key])
      if (result) return result
    }
  }

  return undefined
}

async function downloadImage(url: string, filepath: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(filepath, buffer)
}

async function runPrediction(input: Record<string, unknown>): Promise<string> {
  const prediction = (await (replicate as any).predictions.create({
    model: modelIdentifier,
    input,
    stream: false,
  })) as ReplicatePrediction

  const started = Date.now()
  const timeoutMs = 180_000

  let current = prediction
  while (!terminalStates.includes(current.status)) {
    if (Date.now() - started > timeoutMs) {
      throw new Error("Replicate prediction timed out")
    }
    await new Promise((resolve) => setTimeout(resolve, 1_500))
    current = (await (replicate as any).predictions.get(current.id)) as ReplicatePrediction
  }

  if (current.status !== "succeeded") {
    throw new Error(current.error || `Prediction ${current.status}`)
  }

  const url = await resolveImageUrl(current.output)
  if (!url) {
    throw new Error("Replicate did not return an image URL")
  }
  return url
}

async function generateCategoryArt() {
  const publicLatestDir = path.join(publicImageRoot, "latest")
  const latestDir = path.join(outputsRoot, "latest")

  fs.mkdirSync(outputDir, { recursive: true })
  fs.rmSync(publicLatestDir, { recursive: true, force: true })
  fs.rmSync(latestDir, { recursive: true, force: true })
  fs.mkdirSync(publicLatestDir, { recursive: true })

  for (const spec of curatedPrompts) {
    const input: Record<string, unknown> = {
      prompt: spec.prompt,
      aspect_ratio: "4:3",
      output_format: "jpg",
    }

    const imageName = `${spec.filename}.jpg`
    const runPath = path.join(outputDir, imageName)
    const publicPath = path.join(publicLatestDir, imageName)

    console.log(`\n🎨 Generating ${spec.category} visual...`)
    console.log(`   Prompt: ${spec.prompt}`)

    try {
      const imageUrl = await runPrediction(input)
      await downloadImage(imageUrl, runPath)
      fs.copyFileSync(runPath, publicPath)

      console.log(`   ✅ Saved to ${path.relative(projectRoot, runPath)}`)
      console.log(`   ✅ Updated public asset ${path.relative(projectRoot, publicPath)}`)

      metadata.push({
        category: spec.category,
        prompt: spec.prompt,
        file: path.relative(projectRoot, runPath),
        public_file: path.relative(projectRoot, publicPath),
        image_url: imageUrl,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(`   ❌ Failed for ${spec.category}: ${message}`)
      if (process.env.DEBUG_REPLICATE_OUTPUT === "1") {
        console.error("   ↳ Debug input", JSON.stringify({ input }, null, 2))
      }
      metadata.push({
        category: spec.category,
        prompt: spec.prompt,
        error: message,
      })
    }
  }

  const metadataPath = path.join(outputDir, "metadata.json")
  fs.writeFileSync(
    metadataPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        model: modelIdentifier,
        results: metadata,
      },
      null,
      2,
    ),
  )
  console.log(`\n📝 Wrote metadata to ${path.relative(projectRoot, metadataPath)}`)

  const symlinkType: fs.symlink.Type = process.platform === "win32" ? "junction" : "dir"
  try {
    fs.symlinkSync(outputDir, latestDir, symlinkType)
  } catch (error) {
    console.warn("⚠️ Unable to create latest symlink, copying files instead.")
    fs.mkdirSync(latestDir, { recursive: true })
    for (const entry of fs.readdirSync(outputDir)) {
      const source = path.join(outputDir, entry)
      const target = path.join(latestDir, entry)
      fs.copyFileSync(source, target)
    }
  }

  console.log(
    `🔗 Updated ${path.relative(projectRoot, latestDir)} and ${path.relative(projectRoot, publicLatestDir)} with latest assets`,
  )
}

generateCategoryArt().catch((error) => {
  console.error("Unexpected error while generating category art", error)
  process.exit(1)
})