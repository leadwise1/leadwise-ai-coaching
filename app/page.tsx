"use client"

import * as React from "react"
import { Badge } from "@/app/api/grok/components/ui/badge"
import { Button } from "@/app/api/grok/components/ui/button"
import { Card } from "@/app/api/grok/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/api/grok/components/ui/tabs"
import { Progress } from "@/app/api/grok/components/ui/progress"
export default function PlaygroundPage() {
  const [progressValue, setProgressValue] = React.useState(50)

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">LeadWise AI Playground</h1>

      {/* Badge */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Badge</h2>
        <Badge>New</Badge>
      </div>

      {/* Button */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Button</h2>
        <Button onClick={() => setProgressValue(prev => Math.min(prev + 10, 100))}>
          Increase Progress
        </Button>
      </div>

      {/* Card */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Card</h2>
        <Card className="p-4 border rounded-md shadow-sm">
          <h3 className="font-bold">Card Title</h3>
          <p className="text-sm text-muted-foreground">
            This is a sample card using your UI components.
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tabs</h2>
        <Tabs defaultValue="tab1" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
      </div>

      {/* Progress */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Progress</h2>
        <Progress value={progressValue} />
        <p className="text-sm mt-2">Current Progress: {progressValue}%</p>
      </div>
    </div>
  )
}