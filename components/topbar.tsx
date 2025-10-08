"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function Topbar({
  title,
  actions,
  className,
}: {
  title?: string
  actions?: ReactNode
  className?: string
}) {
  return (
    <motion.header
      className={cn(
        "sticky top-0 z-40 border-b glass",
        className,
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/dashboard" aria-label="SadA Kavach Home" className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/placeholder-logo.svg" alt="SadA Kavach" width={24} height={24} className="opacity-90" />
            </motion.div>
            <span className="text-sm font-semibold hidden sm:inline gradient-text">SadA Kavach</span>
          </Link>
        </motion.div>
        {title && (
          <motion.h1 
            className="text-sm font-medium text-balance hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h1>
        )}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {actions}
        </motion.div>
      </div>
    </motion.header>
  )
}