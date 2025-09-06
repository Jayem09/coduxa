import { Button } from "./ui/button";
import { ArrowRight, Code, Zap, Users } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CodeCredHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full border border-primary/20">
                <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">Programming Certification</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master Programming
                <span className="block text-primary">Skills</span>
                <span className="block">Get Certified</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Take comprehensive programming certification exams, earn certificates, and showcase your expertise to employers worldwide.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="group w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              {/* <Button variant="outline" size="lg">
                View Portfolio
              </Button> */}
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">150+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">99%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2NjE0NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern coding workspace"
                className="rounded-2xl shadow-2xl w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 bg-card border border-border rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-medium">JavaScript</div>
                    <div className="text-xs text-muted-foreground">Expert Level</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-card border border-border rounded-xl p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-medium">Team Lead</div>
                    <div className="text-xs text-muted-foreground">5+ Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}