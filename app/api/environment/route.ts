import { NextResponse } from "next/server"

export async function GET() {
  const co2 = 450 + Math.floor(Math.random() * 200)
  const ch4 = 5 + Math.floor(Math.random() * 15)
  const o2 = 20 + Math.floor(Math.random() * 2)
  const humidity = 50 + Math.floor(Math.random() * 30)
  const temperature = 26 + Math.floor(Math.random() * 6)
  return NextResponse.json({ co2, ch4, o2, humidity, temperature })
}
