'use client'

import React, { useState, useEffect, useRef } from 'react'
import { User, FileText, Sparkles, Download, Eye, Settings, 
  Briefcase, GraduationCap, ArrowRight 
} from 'lucide-react'
import AIAnimation from "@/components/ui/animations/AIAnimation";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Basic interfaces
interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  summary: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  experience: any[]
  education: any[]
  skills: string[]
}

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { 
      name: '', 
      email: '', 
      phone: '', 
      location: '', 
      summary: '' 
    },
    experience: [],
    education: [],
    skills: []
  })
  const [currentStep, setCurrentStep] = useState('personal')
  const [isAIGenerating, setIsAIGenerating] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)

  const handleAIGenerate = () => {
    setIsAIGenerating(true)
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: "Experienced professional with a proven track record of delivering exceptional results and innovative problem-solving skills."
        }
      }))
      setIsAIGenerating(false)
    }, 2000)
  }

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  // Upgraded 3D Parallax AI Robot Animation Component
  const ParallaxAIAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Map mouseX and mouseY to rotation angles for 3D effect
    const rotateX = useTransform(mouseY, [-150, 150], [30, -30])
    const rotateY = useTransform(mouseX, [-150, 150], [-30, 30])
    const scale = useTransform(mouseX, [-150, 150], [1.05, 0.95])

    const handleMouseMove = (event: React.MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2

      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    return (
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          perspective: 900,
          width: '100%',
          height: 420,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
          marginBottom: '3rem',
          cursor: 'grab',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="rounded-lg shadow-lg bg-card"
      >
        <AIAnimation width="320px" height="320px" />
      </motion.div>
    )
  }

  // Builder View
  if (showBuilder) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button 
              onClick={() => setShowBuilder(false)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              ← Back to Home
            </button>
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20 flex items-center gap-1">
                <Sparkles className="h-4 w-4"/>
                AI Powered
              </span>
              <button className="border border-border px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2">
                <Eye className="h-4 w-4"/>
                Preview
              </button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4"/>
                Export PDF
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-border mb-6">
                {[
                  { id: 'personal', label: 'Personal', icon: User },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Settings }
                ].map(({ id, label, icon: Icon }) => (
                  <button 
                    key={id}
                    onClick={() => setCurrentStep(id)}
                    className={`px-4 py-2 border-b-2 flex items-center gap-2 transition-colors ${
                      currentStep === id 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4"/>
                    {label}
                  </button>
                ))}
              </div>

              {/* Personal Info Tab */}
              {currentStep === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input 
                        type="text"
                        placeholder="John Doe"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input 
                        type="email"
                        placeholder="john@example.com"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-foreground">
                        Professional Summary
                      </label>
                      <button 
                        onClick={handleAIGenerate}
                        disabled={isAIGenerating}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1 transition-colors"
                      >
                        <Sparkles className="h-3 w-3"/>
                        {isAIGenerating ? 'Generating...' : 'AI Generate'}
                      </button>
                    </div>
                    <textarea 
                      placeholder="Write a brief summary of your professional experience..."
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={() => setCurrentStep('experience')}
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      Next: Experience 
                      <ArrowRight className="h-4 w-4"/>
                    </button>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder */}
              {currentStep !== 'personal' && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    {currentStep === 'experience' && <Briefcase className="h-16 w-16 mx-auto"/>}
                    {currentStep === 'education' && <GraduationCap className="h-16 w-16 mx-auto"/>}
                    {currentStep === 'skills' && <Settings className="h-16 w-16 mx-auto"/>}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Add your {currentStep}
                  </p>
                  <button className="border border-border px-4 py-2 rounded-md hover:bg-accent transition-colors">
                    Add {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-card-foreground">
                <Eye className="h-5 w-5 mr-2"/>
                Live Preview
              </h3>
              <div className="bg-muted rounded-lg p-4 min-h-96 border-2 border-dashed border-border">
                {resumeData.personalInfo.name ? (
                  <div className="space-y-4">
                    <div className="text-center border-b border-border pb-4">
                      <h2 className="text-xl font-bold text-card-foreground">{resumeData.personalInfo.name}</h2>
                      <p className="text-sm text-muted-foreground">{resumeData.personalInfo.email}</p>
                    </div>
                    {resumeData.personalInfo.summary && (
                      <div>
                        <h3 className="font-semibold mb-2 text-card-foreground">Summary</h3>
                        <p className="text-sm text-muted-foreground">{resumeData.personalInfo.summary}</p>
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
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ResumeAI</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowBuilder(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Building
            </button>
          </div>
        </div>
      </nav>

      {/* Upgraded 3D Parallax AI Robot Animation */}
      <ParallaxAIAnimation />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Build Your Perfect Resume with AI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder.
        </p>
        <button 
          onClick={() => setShowBuilder(true)}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-md text-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
        >
          <Sparkles className="h-5 w-5"/>
          Get Started Free
        </button>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-lg shadow-sm border border-border text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">AI-Powered Content</h3>
            <p className="text-muted-foreground">Let AI write compelling summaries and descriptions for your resume.</p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-sm border border-border text-center">
            <Eye className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Live Preview</h3>
            <p className="text-muted-foreground">See your resume update in real-time as you make changes.</p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-sm border border-border text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Export Ready</h3>
            <p className="text-muted-foreground">Download your resume as a professional PDF when you're done.</p>
          </div>
        </div>
      </div>
    </div>
  )
}