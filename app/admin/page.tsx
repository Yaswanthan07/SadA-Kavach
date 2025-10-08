"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NavBottom from "@/components/nav-bottom"
import { motion } from "framer-motion"
import { Settings, Users, Shield, QrCode, AlertTriangle, BarChart3 } from "lucide-react"
import ErrorBoundary from "@/components/error-boundary"
import { useI18n } from "@/hooks/use-i18n"

export default function AdminPage() {
  return (
    <ErrorBoundary>
      <AdminPageContent />
      <NavBottom />
    </ErrorBoundary>
  )
}

function AdminPageContent() {
  const { t } = useI18n()
  
  const adminActions = [
    { icon: Users, label: "Manage Workers", description: "Add, edit, or remove worker profiles" },
    { icon: Shield, label: "PPE Inventory", description: "Track and manage personal protective equipment" },
    { icon: QrCode, label: "RFID Mappings", description: "Configure RFID tag assignments" },
    { icon: AlertTriangle, label: "Alert Thresholds", description: "Set safety alert parameters" },
    { icon: BarChart3, label: "System Reports", description: "View system performance and safety reports" },
  ]
  
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
              <Settings className="size-5 text-primary" />
              Admin & Management
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {adminActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Button 
                      variant="secondary" 
                      className="w-full h-auto flex flex-col items-center justify-center gap-2 p-4"
                    >
                      <Icon className="size-6" />
                      <span className="font-medium">{action.label}</span>
                      <span className="text-xs text-muted-foreground text-center">{action.description}</span>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
            <motion.p 
              className="text-sm text-muted-foreground text-center p-3 rounded-lg bg-card/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Backends for IoT and DB are placeholders. Integrate AWS IoT/Azure IoT/MQTT and a database when ready.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
      <NavBottom />
    </main>
  )
}