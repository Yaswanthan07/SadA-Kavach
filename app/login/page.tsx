"use client"

import type React from "react"
import Topbar from "@/components/topbar"
import { ThemeToggle } from "@/components/theme-toggle"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Shield, ScanLine, Fingerprint, QrCode, Languages, Lock, User, BadgeCheck } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useI18n } from "@/hooks/use-i18n"

const roles = ["Worker", "Supervisor", "Safety Officer", "Admin"] as const
type Role = (typeof roles)[number]

export default function LoginPage() {
  const router = useRouter()
  const { t, lang, setLang, languages } = useI18n()
  const { login } = useAuth()
  const [role, setRole] = useState<Role>("Worker")
  const [workerId, setWorkerId] = useState("")
  const [rfid, setRfid] = useState("")
  const [biometric, setBiometric] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await login({ role, workerId, rfid, biometric })
      router.replace("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[100svh] flex flex-col bg-gradient-to-br from-background to-muted">
      <Topbar title={t("app_name")} actions={<ThemeToggle />} className="border-b" />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="size-8 text-primary" aria-hidden />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">{t("login_title")}</h1>
                <p className="text-sm text-muted-foreground">SadA Kavach</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Languages className="size-4 text-muted-foreground" aria-hidden />
                <Select value={lang} onValueChange={setLang}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Card className="glass shadow-xl">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Lock className="size-4" />
                {t("secure_sign_in")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <BadgeCheck className="size-4" />
                    {t("role")}
                  </label>
                  <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("select_role")} />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {t(r)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="size-4" />
                    {t("worker_id")}
                  </label>
                  <Input
                    inputMode="numeric"
                    placeholder={t("enter_worker_id")}
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    aria-label={t("worker_id")}
                    leftIcon={<User className="size-4 text-muted-foreground" />}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ScanLine className="size-4" />
                    {t("rfid_or_qr")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      placeholder={t("rfid_placeholder")}
                      value={rfid}
                      onChange={(e) => setRfid(e.target.value)}
                      aria-label={t("rfid")}
                      leftIcon={<ScanLine className="size-4 text-muted-foreground" />}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="gap-2"
                      onClick={() => alert(t("qr_simulated"))}
                    >
                      <QrCode className="size-4" aria-hidden /> {t("scan_qr")}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={biometric}
                      onChange={(e) => setBiometric(e.target.checked)}
                      aria-label={t("biometric_login")}
                      className="sr-only"
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${biometric ? 'bg-primary' : 'bg-muted'}`}>
                      <div className={`absolute top-0.5 left-0.5 bg-background border rounded-full h-5 w-5 transition-transform ${biometric ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="inline-flex items-center gap-2">
                      <Fingerprint className="size-4" aria-hidden /> {t("biometric_login")}
                    </span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      {t("signing_in")}
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      {t("sign_in")}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t("login_disclaimer")}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}