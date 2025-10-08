"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NavBottom from "@/components/nav-bottom"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { BarChart3, FileText, TrendingUp, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const ReportsChart = dynamic(() => import("@/components/safety-score").then((m) => m.SafetyTrendMini), { ssr: false })

export default function ReportsPage() {
  return (
    <main className="min-h-[100svh] pb-20 p-4 grid gap-4 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              Reports & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ReportsChart />
            </motion.div>
            
            <motion.div 
              className="mt-6 grid gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="size-4" />
                Key Insights
              </h3>
              <div className="grid gap-2 text-sm">
                <motion.p 
                  className="p-3 rounded-lg bg-card/50 flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <span className="text-primary">•</span> Daily compliance trends show 85% adherence
                </motion.p>
                <motion.p 
                  className="p-3 rounded-lg bg-card/50 flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <span className="text-primary">•</span> Predictive fatigue insights indicate peak risk at 3-4 PM
                </motion.p>
                <motion.p 
                  className="p-3 rounded-lg bg-card/50 flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <span className="text-primary">•</span> Equipment maintenance recommendations generated
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button className="w-full gap-2" variant="secondary">
                <Download className="size-4" />
                Download Full Report (PDF)
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Backends for IoT and DB are placeholders. Integrate AWS IoT/Azure IoT/MQTT and a database when ready.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <NavBottom />
    </main>
  )
}