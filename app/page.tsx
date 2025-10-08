"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion"
import { Shield, Users, Activity, Cloud, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

// Landing page with Get Started button
export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="size-12 text-primary" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold gradient-text mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          SadA Kavach
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Advanced safety monitoring system for mining operations. Protecting workers with real-time insights and alerts.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FeatureCard icon={Users} title="Worker Safety" />
          <FeatureCard icon={Activity} title="Vital Monitoring" />
          <FeatureCard icon={Cloud} title="Environment" />
          <FeatureCard icon={Bell} title="Real-time Alerts" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                Redirecting...
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <motion.div 
      className="flex flex-col items-center p-4 rounded-lg bg-card/50 border border-border/50"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-2 rounded-full bg-primary/10 mb-2">
        <Icon className="size-6 text-primary" />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </motion.div>
  )
}