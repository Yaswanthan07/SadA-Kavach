"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { fetcher } from "@/lib/api"
import { useI18n } from "@/hooks/use-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

type AlertItem = {
  id: string
  level: "critical" | "warning" | "info" | "normal"
  message: string
  ts: number
}

export default function AlertsList({ full = false }: { full?: boolean }) {
  const { t } = useI18n()
  const { data } = useSWR<AlertItem[]>("/api/alerts", fetcher, { refreshInterval: 5000 })
  const items = (data ?? []).slice(0, full ? 50 : 5)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 glass">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            {t("alerts")}
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {items.length} {t("active")}
          </span>
        </CardHeader>
        {!data ? (
          <CardContent className="grid gap-2 min-w-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-3 pl-4 gap-3 bg-card/50">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-3 w-16 hidden sm:inline" />
              </div>
            ))}
          </CardContent>
        ) : (
          <CardContent className="grid gap-2 min-w-0">
            {items.length === 0 && (
              <motion.div 
                className="text-sm text-muted-foreground inline-flex items-center gap-2 p-3 rounded-md bg-emerald-500/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className="size-4 text-emerald-500" aria-hidden /> {t("no_active_alerts")}
              </motion.div>
            )}
            {items.map((a, index) => (
              <motion.div
                key={a.id}
                className="flex items-center justify-between rounded-md border p-3 pl-4 gap-3 min-w-0 bg-card/50 hover:bg-card/80 transition-colors"
                style={{
                  borderLeftWidth: 4,
                  borderLeftColor:
                    a.level === "critical"
                      ? "oklch(0.6 0.2 25)"
                      : a.level === "warning"
                        ? "oklch(0.78 0.16 80)"
                        : a.level === "info"
                          ? "oklch(0.55 0.12 40)"
                          : "transparent",
                }}
                aria-label={`${a.level} alert`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <AlertIcon level={a.level} />
                  <span className="text-sm line-clamp-2">{a.message}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">
                  {new Date(a.ts).toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

function AlertIcon({ level }: { level: AlertItem["level"] }) {
  switch (level) {
    case "critical":
      return <AlertTriangle className="size-4 text-destructive animate-pulse" aria-hidden />
    case "warning":
      return <AlertTriangle className="size-4 text-amber-500" aria-hidden />
    case "info":
      return <Info className="size-4 text-blue-500" aria-hidden />
    default:
      return <AlertTriangle className="size-4 text-muted-foreground" aria-hidden />
  }
}

function levelColor(level: AlertItem["level"]) {
  if (level === "critical") return "size-4 text-destructive"
  if (level === "warning") return "size-4 text-amber-500"
  if (level === "info") return "size-4 text-blue-500"
  return "size-4 text-muted-foreground"
}