import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin,
  Phone,
  ArrowRight,
  Code
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Web Development", href: "#" },
    { name: "Mobile Apps", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "E-Commerce", href: "#" },
    { name: "Consulting", href: "#" }
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Our Process", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Blog", href: "#" }
  ],
  resources: [
    { name: "Get Started", href: "#" },
    { name: "Free Consultation", href: "#" },
    { name: "Project Estimate", href: "#" },
    { name: "Technology Guide", href: "#" },
    { name: "Best Practices", href: "#" }
  ],
  support: [
    { name: "Contact Us", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Project Support", href: "#" },
    { name: "Maintenance", href: "#" },
    { name: "Training", href: "#" }
  ]
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Email", icon: Mail, href: "#" }
];

export function CodeCredFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter Section */}
        <div className="py-8 sm:py-12 border-b border-border">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get the latest updates on new features, industry insights, and career opportunities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="Enter your email address"
                className="flex-1 h-10 sm:h-11"
              />
              <Button className="h-10 sm:h-11 w-full sm:w-auto">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-8 sm:py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <span className="text-lg sm:text-xl font-bold">coduxa</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 max-w-md leading-relaxed">
                Creating exceptional digital experiences that help businesses grow and connect 
                with their audiences. From concept to launch, we're your trusted development partner.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>San Francisco, CA 94105</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>hello@coduxa.dev</span>
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <span>© 2024 coduxa. All rights reserved.</span>
              <div className="flex items-center gap-4 sm:gap-6">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center group"
                    aria-label={social.name}
                  >
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}