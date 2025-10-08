"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ShieldAlert } from "lucide-react"
import { fetcher } from "@/lib/api"
import { useI18n } from "@/hooks/use-i18n"
import { motion } from "framer-motion"

type PPE = {
  complete: boolean
  items: Array<{ name: string; ok: boolean }>
}

export default function PPEStatus() {
  const { t } = useI18n()
  const { data } = useSWR<PPE>("/api/ppe", fetcher, { refreshInterval: 5000 })
  const ok = data?.complete
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 glass">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground flex items-center gap-2">
            <motion.div
              animate={{ rotate: ok ? 0 : -10 }}
              transition={{ duration: 0.3 }}
            >
              {ok ? (
                <ShieldCheck className="size-4 text-emerald-500" />
              ) : (
                <ShieldAlert className="size-4 text-amber-500" />
              )}
            </motion.div>
            {t("ppe_compliance")}
          </CardTitle>
          <motion.div
            animate={{ scale: ok ? 1 : 1.1 }}
            transition={{ 
              duration: 0.5,
              repeat: ok ? 0 : Infinity,
              repeatType: "reverse"
            }}
          >
            {ok ? (
              <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 bg-emerald-600/90 text-white shadow-glow">
                <ShieldCheck className="size-3" /> {t("complete")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 bg-amber-500 text-black shadow-glow">
                <ShieldAlert className="size-3 animate-pulse" /> {t("missing")}
              </span>
            )}
          </motion.div>
        </CardHeader>
        <CardContent className="grid gap-2 min-w-0">
          {(data?.items ?? []).map((i, index) => (
            <motion.div 
              key={i.name} 
              className="flex items-center justify-between text-sm min-w-0 p-2 rounded-md hover:bg-muted/50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-muted-foreground truncate">{t(i.name)}</span>
              <motion.span 
                className={i.ok ? "text-emerald-500" : "text-destructive"}
                animate={{ scale: i.ok ? 1 : 1.2 }}
                transition={{ 
                  duration: 0.3,
                  repeat: i.ok ? 0 : Infinity,
                  repeatType: "reverse"
                }}
              >
                {i.ok ? t("ok") : t("not_ok")}
              </motion.span>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}