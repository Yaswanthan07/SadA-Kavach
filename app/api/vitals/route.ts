import { NextResponse } from "next/server"

export async function GET() {
  // random-ish vitals for demo
  const heartRate = 70 + Math.floor(Math.random() * 30)
  const spo2 = 94 + Math.floor(Math.random() * 6)
  const temperature = 36 + Math.round(Math.random() * 10) / 10
  const respiration = 12 + Math.floor(Math.random() * 8)
  const now = Date.now()
  const trend = Array.from({ length: 12 }).map((_, i) => ({
    t: now - (12 - i) * 1000 * 30,
    heartRate: heartRate + Math.floor(Math.random() * 6) - 3,
    spo2: spo2 + Math.floor(Math.random() * 3) - 1,
  }))
  return NextResponse.json({
    heartRate,
    spo2,
    temperature,
    respiration,
    history: trend,
  })
}
