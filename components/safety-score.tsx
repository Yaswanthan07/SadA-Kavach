"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetcher } from "@/lib/api"
import { Progress } from "@/components/ui/progress"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { ShieldAlert, ShieldCheck } from "lucide-react"

type ScoreResp = { score: number; commentary: string; trend: Array<{ t: string; score: number }> }

export default function SafetyScore() {
  const { data } = useSWR<ScoreResp>("/api/ai/safety-score", fetcher, { refreshInterval: 8000 })
  const score = data?.score ?? 70
  
  // Determine color based on score
  let scoreColor = "text-foreground"
  let scoreBg = "bg-muted"
  let scoreIcon = ShieldAlert
  if (score >= 80) {
    scoreColor = "text-emerald-500"
    scoreBg = "bg-emerald-500/20"
    scoreIcon = ShieldCheck
  } else if (score >= 60) {
    scoreColor = "text-amber-500"
    scoreBg = "bg-amber-500/20"
  } else {
    scoreColor = "text-destructive"
    scoreBg = "bg-destructive/20"
  }
  
  const ScoreIcon = scoreIcon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Safety Score</span>
            <motion.div 
              className={`p-2 rounded-full ${scoreBg}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <ScoreIcon className={`size-5 ${scoreColor}`} />
            </motion.div>
          </CardTitle>
        </CardHeader>
        {!data ? (
          <CardContent className="grid gap-3 min-w-0">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-3 w-full rounded-full" />
            <div className="h-28">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
          </CardContent>
        ) : (
          <CardContent className="grid gap-3 min-w-0">
            <motion.div 
              className={`text-sm p-3 rounded-lg ${scoreBg} ${scoreColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {data.commentary}
            </motion.div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Score</span>
                <span className={`font-bold ${scoreColor}`}>{score}/100</span>
              </div>
              <Progress value={score} className="h-3" aria-label="Safety score" />
            </div>
            <div className="h-28 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend ?? []}>
                  <XAxis dataKey="t" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2} 
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: 'var(--color-primary)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

export function SafetyTrendMini() {
  const { data } = useSWR<ScoreResp>("/api/ai/safety-score", fetcher)
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data?.trend ?? []}>
          <XAxis dataKey="t" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ 
              background: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="var(--color-primary)" 
            strokeWidth={2} 
            dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }} 
            activeDot={{ r: 6, fill: 'var(--color-primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}