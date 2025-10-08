"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Bell, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function NavBottom() {
  const pathname = usePathname()
  const items = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/alerts", label: "Alerts", icon: Bell },
    { href: "/reports", label: "Reports", icon: BarChart3 },
    { href: "/admin", label: "Admin", icon: Settings },
  ]
  
  return (
    <motion.nav
      aria-label="Bottom"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t glass"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <ul className="grid grid-cols-5 pt-1 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        {items.map((it) => {
          const active = pathname === it.href
          const Icon = it.icon
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "relative flex flex-col items-center justify-center px-3 py-2 text-xs transition-colors touch-manipulation",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-px h-0.5 w-7 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                ) : null}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: active ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Icon className="size-5" aria-hidden />
                </motion.div>
                <span className="mt-1">{it.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}