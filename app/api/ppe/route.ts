import { NextResponse } from "next/server"

const names = ["helmet", "mask", "gloves", "jacket", "boots"] as const

export async function GET() {
  const items = names.map((n) => ({ name: n, ok: Math.random() > 0.15 }))
  const complete = items.every((i) => i.ok)
  return NextResponse.json({ complete, items })
}
