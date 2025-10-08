import { NextResponse } from "next/server"
import { generateText } from "ai"

// Function to generate local commentary as a fallback
function localCommentary(score: number, trend: Array<{ t: string; score: number }>): string {
  const latest = trend[trend.length - 1]?.score ?? score
  const delta = score - latest
  const direction = delta >= 5 ? "improving" : delta <= -5 ? "worsening" : "steady"

  let risk = "moderate"
  if (score >= 85) risk = "low"
  else if (score <= 65) risk = "high"

  return `Safety risk is ${risk} and ${direction}; prioritize ventilation checks, enforce PPE compliance, and monitor elevated heart rates to prevent incidents.`
}

const AI_ENABLED = process.env.AI_ENABLED === "true"

export async function GET() {
  const score = 60 + Math.floor(Math.random() * 35)
  const trend = Array.from({ length: 10 }).map((_, i) => ({
    t: `T-${10 - i}`,
    score: 55 + Math.floor(Math.random() * 40),
  }))

  let commentary = ""

  if (AI_ENABLED) {
    try {
      const { text } = await generateText({
        model: "openai/gpt-5-mini",
        prompt:
          "Provide a one-sentence safety risk commentary for an underground coal mine, considering PPE compliance, worker vitals, and gas levels. Tone: concise, actionable.",
      })
      commentary = text
    } catch (err) {
      // If the AI Gateway rejects (e.g., 403), fall back to local commentary instead of failing the route
      commentary = localCommentary(score, trend)
    }
  } else {
    // When AI is disabled, always return deterministic commentary
    commentary = localCommentary(score, trend)
  }

  return NextResponse.json({
    score,
    commentary,
    trend,
  })
}
