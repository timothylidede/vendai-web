import fs from "fs"
import path from "path"
import { config } from "dotenv"
import Replicate from "replicate"

config({ path: path.join(process.cwd(), ".env.local") })
config({ path: path.join(process.cwd(), ".env") })

const replicateToken = process.env.REPLICATE_API_TOKEN
if (!replicateToken) {
  console.error("❌ Missing REPLICATE_API_TOKEN in environment")
  process.exit(1)
}

const modelIdentifier = process.env.REPLICATE_MODEL_ID || "google/nano-banana"

const replicate = new Replicate({ auth: replicateToken })

const aestheticSuffix = [
  "shot on a slate-grey, matte glass display with subtle fog and volumetric glow",
  "dramatic cyberpunk metropolis ambiance with electric magenta and azure rim lighting",
  "ultra high definition cinematic product render, 16:9 composition, crisp focus and balanced contrast",
  "no people, no signage, no logos, no text overlays, no price tags",
].join(". ")

const curatedPrompts = [
  {
    category: "general-trade",
    prompt:
      "Omnichannel trade bazaar with modular kiosks showcasing smart checkout pods and floating inventory drones",
  },
  {
    category: "food-and-beverage",
    prompt:
      "Gastronomic tasting atrium with levitating tasting spoons, crystallised beverages, and nano-infused plating towers",
  },
  {
    category: "electrical",
    prompt:
      "Matrix of translucent circuit crates, high-voltage conduits, and adaptive smart meters humming with neon charge",
  },
  {
    category: "construction",
    prompt:
      "Precision engineered construction arsenal featuring carbon-fibre beams, holo-blueprint tablets, and autonomous site drones",
  },
  {
    category: "fmcg",
    prompt:
      "Ultramodern FMCG carousel with kinetic shelving, compressed essentials, and AI replenishment indicators",
  },
  {
    category: "cosmetics",
    prompt:
      "Luminous cosmetic lab altar with prism serums, chromatic mist wands, and suspended microcrystal palettes",
  },
  {
    category: "furniture",
    prompt:
      "Architectural furniture studio featuring levitating modular sofas, kinetic timber sculptures, and glass fiber partitions",
  },
  {
    category: "electronics",
    prompt:
      "Panoramic electronics launchpad with translucent smartphones, holographic CPUs, and ion-lit audio arrays",
  },
  {
    category: "chemical",
    prompt:
      "Sterile chemical synthesis bay hosting nano-reactor vessels, vapor-traced canisters, and spectral fluid columns",
  },
  {
    category: "packaging",
    prompt:
      "Futurist packaging lab with morphing smart cartons, vacuum-clasp cylinders, and adaptive cushioning halos",
  },
  {
    category: "textile",
    prompt:
      "Interwoven textile atelier showcasing reactive fabrics, shimmering fiber spools, and AI-patterned looms",
  },
  {
    category: "agricultural",
    prompt:
      "Hydroponic harvest podium with levitated produce, nutrient nebulae, and autonomous pollination drones",
  },
  {
    category: "pharmaceutical",
    prompt:
      "Pharmaceutical sanctum with cryogenic vials, bioluminescent capsules, and sterile robotic dispensers",
  },
  {
    category: "stationery",
    prompt:
      "Precision stationery atelier displaying hovering drafting tools, luminous notebooks, and kinetic pen arrays",
  },
  {
    category: "automotive",
    prompt:
      "Automotive performance gallery with aerodynamic concept chassis, suspended powertrains, and energy halos",
  },
  {
    category: "plumbing",
    prompt:
      "Chromed plumbing atelier hosting adaptive pipe lattices, smart valves, and hydrostatic diagnostics orbs",
  },
  {
    category: "industrial-equipment",
    prompt:
      "Industrial mechatronics bay with articulated exoskeleton arms, precision torque modules, and magnetic tool cradles",
  },
  {
    category: "cleaning-supplies",
    prompt:
      "Sanitation command center featuring autonomous cleaning pods, ion mist diffusers, and anti-gravity detergent capsules",
  },
  {
    category: "alcohol",
    prompt:
      "Celestial distillery lounge with levitating decanters, refracted spirits, and vapor-lit tasting orbs",
  },
]

const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
const outputDir = path.join(process.cwd(), "image-gen", "outputs", `categories-${timestamp}`)
const publicDir = path.join(process.cwd(), "public", "brand_images", "categories")
fs.mkdirSync(outputDir, { recursive: true })
fs.mkdirSync(publicDir, { recursive: true })

const terminalStates = ["succeeded", "failed", "canceled"]

const baseNegative = [
  "text, watermark, logo, ui, qr code",
  "people, hands, animals, creatures",
  "distortion, noise, blur, grainy, low resolution",
  "blood, gore, meat preparation, butcher tools",
  "duplicate objects, floating text, heads, limbs",
].join(", ")

function resolveImageUrl(value) {
  if (!value) return undefined
  if (typeof value === "string") return value.startsWith("http") ? value : undefined
  if (Array.isArray(value)) {
    for (const entry of value) {
      const result = resolveImageUrl(entry)
      if (result) return result
    }
    return undefined
  }
  if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      const result = resolveImageUrl(value[key])
      if (result) return result
    }
  }
  return undefined
}

async function runPrediction(input) {
  const prediction = await replicate.predictions.create({
    model: modelIdentifier,
    input,
    stream: false,
  })

  const started = Date.now()
  const timeoutMs = 120_000

  let current = prediction
  while (!terminalStates.includes(current.status)) {
    if (Date.now() - started > timeoutMs) {
      throw new Error("Replicate prediction timed out")
    }
    await new Promise((resolve) => setTimeout(resolve, 2_000))
    current = await replicate.predictions.get(current.id)
  }

  if (current.status !== "succeeded") {
    throw new Error(current.error || `Prediction ${current.status}`)
  }

  const url = resolveImageUrl(current.output)
  if (!url) {
    throw new Error("Unable to extract image URL from Replicate output")
  }
  return url
}

async function downloadImage(url, filepath) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(filepath, buffer)
}

async function generateCategoryArt() {
  const results = []

  for (const spec of curatedPrompts) {
    const prompt = `${spec.prompt}. ${aestheticSuffix}.`
    const baseInput = {
      prompt,
      output_quality: "high",
      negative_prompt: `${baseNegative}, text overlay`,
    }

    const safeCategory = spec.category.replace(/[^a-z0-9-]+/gi, "-").toLowerCase()
    const imagePath = path.join(outputDir, `${safeCategory}.png`)
    const publicPath = path.join(publicDir, `${safeCategory}.png`)

    console.log(`\n🎨 Generating ${spec.category} visual...`)
    console.log(`   Prompt: ${prompt}`)

    try {
      let imageUrl = null
      let input = { ...baseInput }
      try {
        imageUrl = await runPrediction(input)
      } catch (error) {
        const message = error?.message || String(error)
        if (/invalid|schema|unexpected.*negative/i.test(message)) {
          console.warn("   ⚠️ Negative prompt not accepted, retrying without it...")
          input = { prompt, output_quality: "high" }
          imageUrl = await runPrediction(input)
        } else {
          throw error
        }
      }

      if (!imageUrl) throw new Error("Replicate did not return an image URL")
      await downloadImage(imageUrl, imagePath)
      fs.copyFileSync(imagePath, publicPath)

      console.log(`   ✅ Saved run copy to ${path.relative(process.cwd(), imagePath)}`)
      console.log(`   ✅ Updated public asset ${path.relative(process.cwd(), publicPath)}`)

      results.push({
        category: spec.category,
        prompt,
        negative_prompt: input.negative_prompt || baseInput.negative_prompt,
        image_url: imageUrl,
        files: {
          run: path.relative(process.cwd(), imagePath),
          public: path.relative(process.cwd(), publicPath),
        },
      })
    } catch (error) {
      console.error(`   ❌ Failed for ${spec.category}:`, error instanceof Error ? error.message : error)
      results.push({
        category: spec.category,
        prompt,
        negative_prompt: baseInput.negative_prompt,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const metadataPath = path.join(outputDir, "metadata.json")
  fs.writeFileSync(
    metadataPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), model: modelIdentifier, results }, null, 2)
  )
  console.log(`\n📝 Wrote metadata to ${path.relative(process.cwd(), metadataPath)}`)
}

generateCategoryArt().catch((error) => {
  console.error("Unexpected error while generating category art", error)
  process.exit(1)
})
