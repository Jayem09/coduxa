import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Building,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Rocket,
  Target
} from "lucide-react";

const whoIsItFor = [
  {
    icon: Rocket,
    title: "Self-taught Developers",
    description: "Prove your expertise without a traditional CS degree and stand out in the job market.",
    benefits: ["Validate self-learned skills", "Portfolio enhancement", "Interview confidence", "Career advancement"],
    emoji: "🚀",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: GraduationCap,
    title: "Bootcamp Graduates",
    description: "Stand out with additional certifications that complement your intensive training experience.",
    benefits: ["Enhanced credentials", "Skill differentiation", "Job market advantage", "Continued learning path"],
    emoji: "💡",
    color: "bg-green-500/10 text-green-500"
  },
  {
    icon: Users,
    title: "CS and IT Students",
    description: "Complement your academic knowledge with practical, industry-recognized programming skills.",
    benefits: ["Practical skill validation", "Resume building", "Internship advantages", "Job preparation"],
    emoji: "📚",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    icon: Briefcase,
    title: "Professional Developers",
    description: "Validate your expertise in new technologies and advance your career with recognized certifications.",
    benefits: ["Technology expertise proof", "Salary negotiation tool", "Career progression", "Professional credibility"],
    emoji: "💻",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    icon: Target,
    title: "Career Changers",
    description: "Demonstrate your programming competency when transitioning from other fields into tech.",
    benefits: ["Career transition support", "Skill verification", "Employer confidence", "Industry recognition"],
    emoji: "🔄",
    color: "bg-red-500/10 text-red-500"
  },
  {
    icon: Building,
    title: "Freelance Developers",
    description: "Build client trust and justify your rates with verified programming certifications.",
    benefits: ["Client credibility", "Rate justification", "Project acquisition", "Professional positioning"],
    emoji: "💼",
    color: "bg-indigo-500/10 text-indigo-500"
  }
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in less than a minute with your email and set up your developer profile.",
    icon: MessageSquare,
    emoji: "✨"
  },
  {
    number: "02",
    title: "Choose Your Path",
    description: "Select from multiple programming languages and specializations that match your goals.",
    icon: Target,
    emoji: "🎯"
  },
  {
    number: "03",
    title: "Take the Exam",
    description: "Complete comprehensive assessments at your own pace with real-world coding challenges.",
    icon: Rocket,
    emoji: "📝"
  },
  {
    number: "04",
    title: "Get Certified",
    description: "Receive your verified certification instantly and share it with employers or clients.",
    icon: CheckCircle,
    emoji: "🏆"
  }
];

export function CodeCredStats() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Who's It For Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4">
              Who We Serve
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Built for Every
              <span className="block text-primary">Developer</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're just starting out or you're a seasoned pro, coduxa helps validate 
              your programming expertise and advance your career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whoIsItFor.map((target, index) => {
              const Icon = target.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="text-xl sm:text-2xl">{target.emoji}</div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${target.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{target.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{target.description}</p>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      {target.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How to Get Started Section */}
        <div>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Four Simple
              <span className="block text-primary">Steps</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Getting certified is easier than you think. Our streamlined process 
              gets you from signup to certification in no time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 sm:p-8 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Emoji and Icon */}
                    <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 mt-3 sm:mt-4">
                      <div className="text-2xl sm:text-3xl">{step.emoji}</div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 bg-card rounded-2xl p-6 sm:p-8 border border-border text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Showcase Your Skills?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              Start your certification journey today and prove your programming expertise to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/signup">
                  Start Certification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}