'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Brain, 
  FileText, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Award, 
  BarChart3, 
  Calendar, 
  Sparkles, 
  Zap, 
  Shield,
  Play,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Video,
  BookOpen,
  Filter,
  Download
} from 'lucide-react'

// Declaration for Three.js when loaded from a CDN
declare global {
    interface Window {
        THREE: any;
    }
}

// 3D Parallax Cursor Component
const ParallaxCursor = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let renderer: any;

        const initializeCanvas = () => {
          if (!mountRef.current || typeof window.THREE === 'undefined') return;
          const THREE = window.THREE;

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(window.devicePixelRatio);
          mountRef.current.appendChild(renderer.domElement);
          
          let plane: any;

          const textureLoader = new THREE.TextureLoader();
          textureLoader.load('ai.jpg', 
            (texture: any) => {
                const geometry = new THREE.PlaneGeometry(0.7, 0.7);
                const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.1 });
                plane = new THREE.Mesh(geometry, material);
                scene.add(plane);
            },
            undefined, 
            (err: any) => { 
                console.error('An error occurred loading the texture.', err);
            }
          );

          camera.position.z = 2;

          const mouse = new THREE.Vector2();
          const targetPosition = new THREE.Vector3();

          const onMouseMove = (event: MouseEvent) => {
              mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
              mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

              const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
              vector.unproject(camera);
              const dir = vector.sub(camera.position).normalize();
              const distance = -camera.position.z / dir.z;
              targetPosition.copy(camera.position).add(dir.multiplyScalar(distance));
          };
          window.addEventListener('mousemove', onMouseMove);

          const animate = () => {
              animationFrameId = requestAnimationFrame(animate);

              if (plane) {
                plane.position.x += (targetPosition.x - plane.position.x) * 0.05;
                plane.position.y += (targetPosition.y - plane.position.y) * 0.05;

                plane.rotation.x = -plane.position.y * 0.2;
                plane.rotation.y = plane.position.x * 0.2;
              }

              renderer.render(scene, camera);
          };
          animate();

          const onWindowResize = () => {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
          }
          window.addEventListener('resize', onWindowResize);
          
          return () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('resize', onWindowResize);
          };
        }

        const cleanup = initializeCanvas();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (cleanup) cleanup();
            if (mountRef.current && renderer?.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }} />;
};


const ComprehensiveCareerCoach = () => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <ParallaxCursor />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                AI-Powered Career Intelligence
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Your AI Career
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Partner</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Transform your career with hyper-personalized resumes, predictive coaching, and AI-powered interview preparation. 
                Stand out in today's competitive job market.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-md transition-all duration-300 flex items-center gap-2 justify-center">
                <Play className="w-5 h-5" />
                Start Your Journey
              </button>
              <button className="border-2 border-blue-300 text-blue-100 hover:bg-blue-800/20 px-8 py-4 text-lg rounded-md transition-all duration-300 flex items-center gap-2 justify-center">
                Watch Demo
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Animation */}
      <div className="w-full h-96 flex items-center justify-center my-12">
        <div className="w-80 h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
          <Brain className="w-32 h-32 text-white animate-pulse" />
        </div>
      </div>

      {/* Resume & Cover Letter Generation */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hyper-Personalized Resume & Cover Letters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI analyzes job descriptions and crafts compelling narratives that showcase your unique value proposition
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-full hover:shadow-lg transition-shadow duration-300 bg-white p-6 rounded-lg border">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Narrative Storytelling</h3>
                <p className="text-gray-600">Transform your experience into compelling stories that resonate with hiring managers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="h-full hover:shadow-lg transition-shadow duration-300 bg-white p-6 rounded-lg border">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quantifiable Achievements</h3>
                <p className="text-gray-600">AI coaching to identify and articulate measurable impact in your previous roles</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-full hover:shadow-lg transition-shadow duration-300 bg-white p-6 rounded-lg border">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Industry Customization</h3>
                <p className="text-gray-600">Tailored content that speaks the language of your target industry and role</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="h-full hover:shadow-lg transition-shadow duration-300 bg-white p-6 rounded-lg border">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bias Detection</h3>
                <p className="text-gray-600">Advanced algorithms ensure your applications are free from unconscious bias</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">See the AI in Action</h3>
              <p className="text-gray-600 mb-6">
                Watch how our AI transforms a basic job description into a personalized, 
                compelling resume that gets noticed by recruiters.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm text-gray-600">Processing...</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Job description analyzed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Keywords optimized</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Generating personalized content...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proactive Career Coaching */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proactive Career Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get ahead of the curve with predictive insights and end-to-end application management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Predictive Career Pathing</h3>
                  <p className="text-gray-600">AI analyzes market trends to suggest optimal career moves and skill development priorities</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">End-to-End Application Management</h3>
                  <p className="text-gray-600">Track applications, follow-ups, and interview schedules in one intelligent dashboard</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Skill Mapping & Learning Plans</h3>
                  <p className="text-gray-600">Personalized learning roadmaps based on your career goals and market demands</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                  <Video className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI/VR Interview Simulation</h3>
                  <p className="text-gray-600">Practice with realistic interview scenarios and get instant feedback on your performance</p>
                </div>
              </motion.div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Career Intelligence Dashboard</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Career Progress</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Applications Sent</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-gray-600">Interviews Scheduled</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Next Actions</h4>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Follow up with TechCorp</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Complete Python certification</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Practice system design questions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Career Command Center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your progress, manage applications, and accelerate your skill development
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b">
            <div className="grid grid-cols-4 bg-gray-50">
              <button
                onClick={() => setActiveTab('overview')}
                className={`p-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'overview' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`p-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'applications' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Applications
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`p-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'skills' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Skills
              </button>
              <button
                onClick={() => setActiveTab('interviews')}
                className={`p-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'interviews' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Video className="w-4 h-4" />
                Interviews
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Applied to Senior Developer at TechCorp</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed React Advanced Course</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">Optimize LinkedIn Profile</h4>
                          <p className="text-sm text-gray-600 mt-1">Add 3 key skills to increase visibility</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">high</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Application Tracker</h3>
                  <div className="flex gap-2">
                    <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          T
                        </div>
                        <div>
                          <h4 className="font-semibold">Senior Developer</h4>
                          <p className="text-gray-600">TechCorp</p>
                          <p className="text-sm text-gray-500">Applied on 2024-01-15</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          Interview Scheduled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Skill Development Roadmap</h3>
                  <p className="text-gray-600">Track your progress and focus on high-impact skills</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-semibold">React</h4>
                        <p className="text-sm text-gray-600">Current: 85% | Target: 90%</p>
                      </div>
                      <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Learn
                      </button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interviews' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Interview Practice</h3>
                  <p className="text-gray-600">Improve your skills with AI-powered simulations</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Practice Sessions</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div>
                          <h4 className="font-medium">Behavioral Interview</h4>
                          <p className="text-sm text-gray-600">Yesterday</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">85%</div>
                          <div className="text-sm text-gray-500">Score</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Upcoming Interviews</h4>
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                        <h4 className="font-medium">TechCorp - Senior Developer</h4>
                        <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                        <div className="mt-2 flex gap-2">
                          <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Reschedule
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            Practice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have accelerated their careers with AI-powered insights and personalized coaching.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-md transition-colors flex items-center gap-2 justify-center">
              <Zap className="w-5 h-5" />
              Start Free Trial
            </button>
            <button className="border-2 border-blue-300 text-blue-100 hover:bg-blue-800/20 px-8 py-4 text-lg rounded-md transition-colors flex items-center gap-2 justify-center">
              <Calendar className="w-5 h-5" />
              Book Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">14-Day Free Trial</h3>
              <p className="text-blue-200">Full access to all features</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Privacy Protected</h3>
              <p className="text-blue-200">Your data is secure and private</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
              <p className="text-blue-200">Career coaches available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">CareerAI</span>
              </div>
              <p className="text-gray-400">
                Empowering careers with artificial intelligence and personalized coaching.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interview Prep</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Coaching</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skill Assessment</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ComprehensiveCareerCoach