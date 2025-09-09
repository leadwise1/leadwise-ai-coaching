'use client'

import React, { useState } from 'react'
import {
  User,
  FileText,
  Sparkles,
  Download,
  Eye,
  Settings,
  PlusCircle,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Check,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import AIAnimation from '@/components/ui/animations/AIAnimation'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    year: string
  }>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleAIGenerate = async (type: 'summary' | 'skills' | 'description') => {
    setIsAIGenerating(true)
    setTimeout(() => {
      if (type === 'summary') {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: "Experienced professional with a proven track record of delivering exceptional results in dynamic environments. Skilled in problem-solving, team collaboration, and strategic thinking with expertise in modern technologies and methodologies."
          }
        }))
      }
      setIsAIGenerating(false)
    }, 2000)
  }

  if (showBuilder) {
    return (
      <div className="min-h-screen bg-background">
        {/* Builder Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost"
                  onClick={() => setShowBuilder(false)}
                  className="mr-2"
                >
                  ← Back to Home
                </Button>
                <div className="p-2 bg-primary rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">AI Resume Builder</h1>
                  <p className="text-sm text-muted-foreground">Create professional resumes with AI assistance</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Builder Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="resume-card p-6">
                <Tabs value={currentStep} onValueChange={setCurrentStep}>
                  <TabsList className="grid grid-cols-4 w-full mb-6">
                    <TabsTrigger value="personal">
                      <User className="h-4 w-4 mr-2" />
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="experience">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="skills">
                      <Settings className="h-4 w-4 mr-2" />
                      Skills
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, name: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          placeholder="+1 (555) 123-4567"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          placeholder="New York, NY"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, location: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleAIGenerate('summary')}
                          disabled={isAIGenerating}
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          {isAIGenerating ? 'Generating...' : 'AI Generate'}
                        </Button>
                      </div>
                      <textarea 
                        id="summary"
                        className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:ring-2 focus:ring-primary"
                        placeholder="Write a brief professional summary..."
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, summary: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => setCurrentStep('experience')}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Next: Experience <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Other tabs content... */}
                  <TabsContent value="experience" className="space-y-4">
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Add your work experience</p>
                      <Button variant="outline">Add Experience</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Add your education</p>
                      <Button variant="outline">Add Education</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Add your skills</p>
                      <Button variant="outline">Add Skills</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Sidebar - Preview */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Live Preview
                </h3>
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
                      <FileText className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-sm">Start filling out your information</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ResumeAI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#templates" className="text-sm font-medium hover:text-primary transition-colors">Templates</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Reviews</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button
                onClick={() => setShowBuilder(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Building
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button 
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* AI Animation Section */}
      <div className="flex justify-center px-4 mt-8 mb-4">
        <AIAnimation />
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Resume Builder
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Build Your Perfect Resume in{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Minutes, Not Hours
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes with AI assistance. Choose from modern templates, 
              get intelligent content suggestions, and land your dream job faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                onClick={() => setShowBuilder(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Eye className="mr-2 h-5 w-5" />
                View Examples
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>50,000+ resumes created</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                <span>4.9/5 user rating</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>ATS-optimized templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- New Section: Highlight Section --- */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover More Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore tools and insights to maximize your resume's impact and stand out to employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Card 1 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get smart suggestions to improve your content and optimize for ATS systems.
              </p>
            </Card>

            {/* Example Card 2 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Templates</h3>
              <p className="text-sm text-muted-foreground">
                Choose from modern templates tailored for professional industries.
              </p>
            </Card>

            {/* Example Card 3 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Preview</h3>
              <p className="text-sm text-muted-foreground">
                Instantly see how updates and edits change your resume's appearance.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* --- End Highlight Section --- */}

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build the Perfect Resume
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered tools and professional templates help you create resumes that get noticed by employers and pass ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Content Generation</h3>
              <p className="text-muted-foreground mb-4">
                Get intelligent suggestions for professional summaries, job descriptions, and skill recommendations tailored to your industry.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Check className="h-4 w-4 mr-2" />
                Smart content suggestions
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS-Optimized Templates</h3>
              <p className="text-muted-foreground mb-4">
                Professional templates designed to pass Applicant Tracking Systems while maintaining visual appeal.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Check className="h-4 w-4 mr-2" />
                100% ATS compatible
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Preview</h3>
              <p className="text-muted-foreground mb-4">
                See your resume update instantly as you type. No more guessing how your final resume will look.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Check className="h-4 w-4 mr-2" />
                Live preview mode
              </div>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-orange-100 rounded-lg w-fit mb-4">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Export Formats</h3>
              <p className="text-muted-foreground mb-4">
                Download your resume as PDF, Word document, or share a public link instantly.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Check className="h-4 w-4 mr-2" />
                PDF & Word export
              </div>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-red-100 rounded-lg w-fit mb-4">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Customization</h3>
              <p className="text-muted-foreground mb-4">
                Customize colors, fonts, and layouts to match your personal style and industry standards.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Check className="h-4 w-4 mr-2" />
                Full customization
              </div>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-teal-100 rounded-lg w-fit mb-4">
                <Globe className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cloud Storage</h3>
              <p className="text-muted-foreground mb-4">
                Access your resumes from anywhere. Auto-save ensures you never lose your progress.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Check className="h-4 w-4 mr-2" />
                Secure cloud sync
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose from Professional Templates
            </h2>
            <p className="text-xl text-muted-foreground">
              All templates are designed by professionals and optimized for ATS systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Template previews */}
            {[1, 2, 3, 4].map((template) => (
              <Card key={template} className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Modern Template {template}</h3>
                <p className="text-sm text-muted-foreground mb-3">Clean and professional design</p>
                <Badge variant="secondary" className="text-xs">
                  ATS-Optimized
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowBuilder(true)}
              className="px-8 py-4 text-lg"
            >
              Start Building Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-primary rounded-lg">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">ResumeAI</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ResumeAI. All rights reserved. Built with AI to help you succeed.
          </div>
        </div>
      </footer>
    </div>
  )
}