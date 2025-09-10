'use client'

import React, { useState } from 'react'
import { 
  User, FileText, Sparkles, Download, Eye, Settings, 
  Briefcase, GraduationCap, ArrowRight 
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Remove this import if AIAnimation doesn't exist
// import AIAnimation from '@/components/ui/animations/AIAnimation'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{ id: string; company: string; position: string; duration: string; description: string }>
  education: Array<{ id: string; school: string; degree: string; year: string }>
  skills: string[]
}

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '', location: '', summary: '' },
    experience: [],
    education: [],
    skills: []
  })
  const [currentStep, setCurrentStep] = useState('personal')
  const [isAIGenerating, setIsAIGenerating] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)

  const handleAIGenerate = async (type: 'summary' | 'skills' | 'description') => {
    setIsAIGenerating(true)
    setTimeout(() => {
      if (type === 'summary') {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: "Experienced professional with a proven track record of delivering exceptional results..."
          }
        }))
      }
      setIsAIGenerating(false)
    }, 2000)
  }

  // -------------------- Builder View --------------------
  if (showBuilder) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setShowBuilder(false)}>← Back to Home</Button>
            <div className="flex items-center gap-3">
              {/* Fixed Badge - removed variant or use "secondary" */}
              <Badge variant="secondary">
                <Sparkles className="h-3 w-3 mr-1"/>AI Powered
              </Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2"/>Preview
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="h-4 w-4 mr-2"/>Export PDF
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <Tabs value={currentStep} onValueChange={setCurrentStep}>
                <TabsList className="grid grid-cols-4 w-full mb-6">
                  <TabsTrigger value="personal"><User className="h-4 w-4 mr-2"/>Personal</TabsTrigger>
                  <TabsTrigger value="experience"><Briefcase className="h-4 w-4 mr-2"/>Experience</TabsTrigger>
                  <TabsTrigger value="education"><GraduationCap className="h-4 w-4 mr-2"/>Education</TabsTrigger>
                  <TabsTrigger value="skills"><Settings className="h-4 w-4 mr-2"/>Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" value={resumeData.personalInfo.name} onChange={e => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, name: e.target.value}}))}/>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" value={resumeData.personalInfo.email} onChange={e => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, email: e.target.value}}))}/>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Button variant="outline" size="sm" onClick={() => handleAIGenerate('summary')} disabled={isAIGenerating}>
                        <Sparkles className="h-3 w-3 mr-1"/>{isAIGenerating ? 'Generating...' : 'AI Generate'}
                      </Button>
                    </div>
                    <textarea 
                      id="summary" 
                      className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                      placeholder="Write a brief summary of your professional experience..."
                      value={resumeData.personalInfo.summary} 
                      onChange={e => setResumeData(prev => ({...prev, personalInfo: {...prev.personalInfo, summary: e.target.value}}))}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setCurrentStep('experience')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Next: Experience <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                    <p className="text-muted-foreground mb-4">Add your work experience</p>
                    <Button variant="outline">Add Experience</Button>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                    <p className="text-muted-foreground mb-4">Add your education</p>
                    <Button variant="outline">Add Education</Button>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                    <p className="text-muted-foreground mb-4">Add your skills</p>
                    <Button variant="outline">Add Skills</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Live Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center"><Eye className="h-5 w-5 mr-2"/>Live Preview</h3>
              <div className="bg-muted rounded-lg p-4 min-h-[400px] border-2 border-dashed">
                {resumeData.personalInfo.name ? (
                  <div className="space-y-4">
                    <div className="text-center border-b pb-4">
                      <h2 className="text-xl font-bold">{resumeData.personalInfo.name}</h2>
                      <p className="text-sm text-muted-foreground">{resumeData.personalInfo.email}</p>
                    </div>
                    {resumeData.personalInfo.summary && (
                      <div>
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <p className="text-sm">{resumeData.personalInfo.summary}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground h-full flex flex-col justify-center">
                    <FileText className="h-12 w-12 mx-auto mb-4"/>
                    <p className="text-sm">Start filling out your information</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // -------------------- Public Page View --------------------
  return (
    <>
      {/* Navigation */}
      <nav className="border-b bg-background/95 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ResumeAI</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setShowBuilder(true)}>
              Start Building
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Build Your Perfect Resume with AI</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder.
        </p>
        <Button size="lg" onClick={() => setShowBuilder(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Sparkles className="h-5 w-5 mr-2"/>
          Get Started Free
        </Button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
            <p className="text-muted-foreground">Let AI write compelling summaries and descriptions for your resume.</p>
          </Card>
          <Card className="p-6 text-center">
            <Eye className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
            <p className="text-muted-foreground">See your resume update in real-time as you make changes.</p>
          </Card>
          <Card className="p-6 text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Export Ready</h3>
            <p className="text-muted-foreground">Download your resume as a professional PDF when you're done.</p>
          </Card>
        </div>
      </div>
    </>
  )
}