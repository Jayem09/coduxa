import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Code, 
  Trophy, 
  Users, 
  Briefcase, 
  BookOpen, 
  Shield
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices.",
    features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: Trophy,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android devices.",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "User-centered design that creates intuitive and engaging digital experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    color: "bg-green-500/10 text-green-500"
  },
  {
    icon: Briefcase,
    title: "E-Commerce Solutions",
    description: "Complete online stores with payment processing, inventory management, and analytics.",
    features: ["Shopify/WooCommerce", "Payment Integration", "Inventory Systems", "Analytics"],
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    icon: BookOpen,
    title: "Content Management",
    description: "Easy-to-use content management systems that let you update your site without technical knowledge.",
    features: ["WordPress", "Headless CMS", "Custom Admin", "SEO Optimization"],
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    icon: Shield,
    title: "Consulting & Strategy",
    description: "Technical consulting to help you make informed decisions about your digital strategy.",
    features: ["Technology Audit", "Architecture Planning", "Performance Optimization", "Security Review"],
    color: "bg-red-500/10 text-red-500"
  }
];

const technologies = [
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "Go", icon: "🔵" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Redis", icon: "🔴" },
  { name: "GraphQL", icon: "🔗" }
];

export function CodeCredServices() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="block text-primary">Succeed Online</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple websites to complex applications, we provide comprehensive digital solutions 
            that help your business thrive in the modern world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <CardHeader className="pb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${service.color} flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-lg sm:text-xl">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technologies Section */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Technologies We Use</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              We work with the latest and most reliable technologies in the industry
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="text-lg sm:text-xl">{tech.icon}</span>
                <span className="font-medium text-xs sm:text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}