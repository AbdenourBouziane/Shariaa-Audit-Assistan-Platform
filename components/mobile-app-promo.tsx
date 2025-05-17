import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, BookOpen, Download, Check, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MobileAppPromo() {
  const [activeFeature, setActiveFeature] = useState(0)
  
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Interactive Learning",
      description: "Access our complete course library with personalized learning paths tailored to your level of expertise."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Assistant",
      description: "Get instant answers to your Shariah finance questions from our specialized AI tutor available 24/7."
    },
    {
      icon: <Check className="h-8 w-8 text-primary" />,
      title: "Practice Assessments",
      description: "Test your knowledge with practice contracts and get detailed feedback on compliance factors."
    }
  ]

  return (
    <div className="py-20 relative overflow-hidden" id="mobile-app">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            NEW MOBILE EXPERIENCE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Learn Shariah Finance <span className="gradient-text">On the Go</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered mobile app delivers personalized tutorials and courses for mastering Islamic finance principles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Mobile device mockup */}
          <div className="lg:col-span-5 lg:order-2">
            <div className="relative mx-auto max-w-[300px]">
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-gray-800 dark:border-gray-700 rounded-[3rem] overflow-hidden shadow-xl">
                <div className="aspect-[9/19] bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  {/* Actual app screenshot */}
                  <div className="relative h-full w-full">
                    <Image 
                      src="/images/home_screen.png"
                      alt="Shariah Finance App Interface"
                      fill
                      className="object-cover"
                      priority
                    />

    
                  </div>
                </div>
              </div>
              
              
              
              {/* Decorations */}
              <div className="absolute -bottom-6 -left-12 -right-12 h-12 bg-gray-800 dark:bg-gray-700 rounded-b-3xl z-0"></div>
            </div>
          </div>
          
          {/* App features */}
          <div className="lg:col-span-7 lg:order-1">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold">Experience AI-Guided Learning</h3>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                      activeFeature === index 
                        ? "bg-primary/10 border border-primary/20" 
                        : "border border-transparent hover:bg-primary/5"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Download App
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* App stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "100+", label: "Tutorial Modules" },
            { value: "24/7", label: "AI Support" },
            { value: "4.8", label: "App Store Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white/5 border border-primary/10 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-3xl font-bold mb-1 gradient-text">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}