"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Thermometer, Droplets, Wind } from "lucide-react"
import { fetcher } from "@/lib/api"
import { useI18n } from "@/hooks/use-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

type Vitals = {
  heartRate: number
  spo2: number
  temperature: number
  respiration: number
  history: Array<{ t: number; heartRate: number; spo2: number }>
}

export default function VitalsCard() {
  const { t } = useI18n()
  const { data } = useSWR<Vitals>("/api/vitals", fetcher, { refreshInterval: 4000 })
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 glass">
        <CardHeader>
          <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground flex items-center gap-2">
            <Activity className="size-4 text-primary animate-pulse" />
            {t("worker_vitals")}
          </CardTitle>
        </CardHeader>
        {!data ? (
          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4 min-w-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border/70 p-3 flex items-center gap-3 min-w-0 bg-card/50">
                <Skeleton className="size-9 rounded-md" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </CardContent>
        ) : (
          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4 min-w-0">
            <Stat icon={Activity} label={t("heart_rate")} value={`${data.heartRate} bpm`} color="text-red-500" />
            <Stat icon={Droplets} label={t("spo2")} value={`${data.spo2}%`} color="text-blue-500" />
            <Stat icon={Thermometer} label={t("temperature")} value={`${data.temperature}°C`} color="text-orange-500" />
            <Stat icon={Wind} label={t("respiration")} value={`${data.respiration} rpm`} color="text-green-500" />
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

function Stat({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <motion.div 
      className="rounded-lg border border-border/70 p-3 flex items-center gap-3 min-w-0 bg-card/50 hover:bg-card/80 transition-colors"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`size-9 rounded-md bg-primary/10 flex items-center justify-center ${color}`}>
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-base md:text-lg font-semibold tabular-nums truncate">{value}</div>
      </div>
    </motion.div>
  )
}