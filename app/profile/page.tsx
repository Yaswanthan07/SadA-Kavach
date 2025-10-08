"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useI18n } from "@/hooks/use-i18n"
import NavBottom from "@/components/nav-bottom"
import { motion } from "framer-motion"
import { User, BadgeCheck, Shield } from "lucide-react"
import ErrorBoundary from "@/components/error-boundary"

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <ProfilePageContent />
      <NavBottom />
    </ErrorBoundary>
  )
}

function ProfilePageContent() {
  const { user } = useAuth()
  const { t } = useI18n()
  
  // Check if user data exists
  if (!user) {
    return (
      <main className="min-h-[100svh] pb-20 p-4 grid gap-4 bg-gradient-to-br from-background to-muted">
        <Card className="glass shadow-xl">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User data not available. Please log in.</p>
          </CardContent>
        </Card>
      </main>
    )
  }
  
  console.log("User data:", user)
  
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
              <div className="p-2 rounded-full bg-primary/10">
                <User className="size-5 text-primary" />
              </div>
              {t("worker_profile")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <motion.div 
              className="flex flex-col items-center gap-2 p-4 bg-card/50 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="p-3 rounded-full bg-primary/10">
                <User className="size-8 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">{user?.workerId ?? "-"}</h2>
              <p className="text-sm text-muted-foreground">{user?.role ?? "-"}</p>
            </motion.div>
            
            <div className="grid gap-3">
              <motion.div 
                className="flex justify-between items-center p-3 rounded-lg bg-card/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <span className="text-muted-foreground flex items-center gap-2">
                  <User className="size-4" />
                  {t("worker_id")}
                </span>
                <span className="font-medium">{user?.workerId ?? "-"}</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center p-3 rounded-lg bg-card/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <span className="text-muted-foreground flex items-center gap-2">
                  <BadgeCheck className="size-4" />
                  {t("role")}
                </span>
                <span className="font-medium">{user?.role ?? "-"}</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center p-3 rounded-lg bg-card/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <span className="text-muted-foreground flex items-center gap-2">
                  <Shield className="size-4" />
                  {t("ppe_assigned")}
                </span>
                <span className="text-right">
                  Helmet, Mask, Gloves, Jacket, Boots
                </span>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}