"use client"

import AlertsList from "@/components/alerts-list"
import NavBottom from "@/components/nav-bottom"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export default function AlertsPage() {
  return (
    <main className="min-h-[100svh] pb-20 p-4 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="size-6 text-destructive" />
          <h1 className="text-xl font-bold">All Alerts</h1>
        </div>
        <AlertsList full />
      </motion.div>
      <NavBottom />
    </main>
  )
}