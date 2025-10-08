import { NextResponse } from "next/server"

const messages = [
  { level: "critical", message: "PPE violation: Helmet missing detected" },
  { level: "warning", message: "Elevated CO₂ levels near Shaft 3" },
  { level: "critical", message: "Abnormal heart rate detected for Worker 102" },
  { level: "warning", message: "Low SpO₂ reading for Worker 47" },
  { level: "normal", message: "All vitals within safe range" },
] as const

export async function GET() {
  const now = Date.now()
  const list = Array.from({ length: 5 }).map((_, i) => {
    const pick = messages[Math.floor(Math.random() * messages.length)]
    return {
      id: String(now - i * 1000 * 60),
      level: pick.level,
      message: pick.message,
      ts: now - i * 1000 * 45,
    }
  })
  return NextResponse.json(list)
}
