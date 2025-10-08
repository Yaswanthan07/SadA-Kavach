"use client"

import { useI18n } from "@/hooks/use-i18n"
import { useOnlineStatus } from "@/hooks/use-online-status"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import VitalsCard from "@/components/vitals-card"
import PPEStatus from "@/components/ppe-status"
import EnvironmentCard from "@/components/environment-card"
import AlertsList from "@/components/alerts-list"
import SafetyScore from "@/components/safety-score"
import NavBottom from "@/components/nav-bottom"
import Topbar from "@/components/topbar"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { t } = useI18n()
  const online = useOnlineStatus()
  const { user, logout } = useAuth()

  return (
    <main id="main" className="min-h-[100svh] pb-[calc(env(safe-area-inset-bottom)+64px)]">
      <Topbar
        title={t("dashboard")}
        actions={
          <div className="flex items-center gap-2">
            <motion.span 
              className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {online ? (
                <Wifi className="size-3 text-emerald-500 animate-pulse" aria-hidden />
              ) : (
                <WifiOff className="size-3 text-destructive animate-pulse" aria-hidden />
              )}
              {online ? t("online") : t("offline")}
            </motion.span>
            <Button variant="outline" size="icon" asChild aria-label={t("alerts")} className="hover:shadow-glow">
              <Link href="/alerts">
                <Bell className="size-4" aria-hidden />
              </Link>
            </Button>
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout} 
                aria-label={t("logout")}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <LogOut className="size-4" aria-hidden />
              </Button>
            </motion.div>
          </div>
        }
      />
      <motion.section 
        className="p-4 sm:p-6 mx-auto w-full max-w-screen-xl grid gap-4 min-w-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VitalsCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PPEStatus />
          </motion.div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <EnvironmentCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SafetyScore />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <AlertsList />
        </motion.div>
      </motion.section>
      <NavBottom />
    </main>
  )
}