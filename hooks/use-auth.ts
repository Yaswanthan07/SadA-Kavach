"use client"

import { useEffect, useState } from "react"

type User = { role: string; workerId: string }
const KEY = "minesafe_auth"

export function getClientAuth() {
  if (typeof window === "undefined") return { isAuthed: false }
  const raw = localStorage.getItem(KEY)
  return { isAuthed: !!raw }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) setUser(JSON.parse(raw))
  }, [])

  async function login(payload: { role: string; workerId: string; rfid?: string; biometric?: boolean }) {
    // In production, call /api/login for secure auth (JWT/cookies)
    const u: User = { role: payload.role, workerId: payload.workerId }
    localStorage.setItem(KEY, JSON.stringify(u))
    setUser(u)
  }
  function logout() {
    localStorage.removeItem(KEY)
    setUser(null)
    if (typeof window !== "undefined") window.location.href = "/login"
  }
  return { user, login, logout }
}
