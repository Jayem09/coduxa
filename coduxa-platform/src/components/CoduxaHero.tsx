import { Button } from "./ui/button";
import { ArrowRight, Code, Zap, Users } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CodeCredHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Building the Future</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Build Amazing
                <span className="block text-primary">Digital</span>
                <span className="block">Experiences</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                We create stunning websites and applications that help your business grow and engage your audience effectively.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              {/* <Button variant="outline" size="lg">
                View Portfolio
              </Button> */}
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2NjE0NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern coding workspace"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">JavaScript</div>
                    <div className="text-xs text-muted-foreground">Expert Level</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium">Team Lead</div>
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