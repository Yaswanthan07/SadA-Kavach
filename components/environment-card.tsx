"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Thermometer, Droplets, Wind, Gauge } from "lucide-react"
import { fetcher } from "@/lib/api"
import { useI18n } from "@/hooks/use-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

type Env = {
  co2: number
  ch4: number
  o2: number
  humidity: number
  temperature: number
}

export default function EnvironmentCard() {
  const { t } = useI18n()
  const { data } = useSWR<Env>("/api/environment", fetcher, { refreshInterval: 6000 })
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 glass">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="size-5 text-primary" aria-hidden />
            {t("environment")}
          </CardTitle>
        </CardHeader>
        {!data ? (
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-3 bg-card/50">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </CardContent>
        ) : (
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <EnvStat icon={Gauge} label="CO₂" value={`${data.co2} ppm`} />
            <EnvStat icon={Gauge} label="CH₄" value={`${data.ch4} ppm`} />
            <EnvStat icon={Gauge} label="O₂" value={`${data.o2} %`} />
            <EnvStat icon={Droplets} label={t("humidity")} value={`${data.humidity} %`} />
            <EnvStat icon={Thermometer} label={t("temperature")} value={`${data.temperature} °C`} />
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

function EnvStat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  // Determine color based on value
  let color = "text-foreground"
  if (label === "CO₂" && parseFloat(value) > 1000) color = "text-destructive"
  if (label === "CH₄" && parseFloat(value) > 50) color = "text-destructive"
  if (label === "O₂" && parseFloat(value) < 19.5) color = "text-destructive"
  
  return (
    <motion.div 
      className="rounded-lg border p-3 bg-card/50 hover:bg-card/80 transition-colors"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="size-4 text-muted-foreground" aria-hidden />
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
      <div className={`font-medium ${color}`}>{value}</div>
    </motion.div>
  )
}