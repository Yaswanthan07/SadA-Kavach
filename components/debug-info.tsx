"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugInfo({ data }: { data: any }) {
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    try {
      // This will help us catch any serialization errors
      JSON.stringify(data)
    } catch (err) {
      setError(`Serialization error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [data])
  
  if (error) {
    return (
      <Card className="glass shadow-xl mt-4">
        <CardHeader>
          <CardTitle className="text-destructive">Debug Error</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-destructive/10 p-3 rounded overflow-x-auto">
            {error}
          </pre>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="glass shadow-xl mt-4">
      <CardHeader>
        <CardTitle>Debug Info</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}