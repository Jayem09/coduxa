import { useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import { Button } from "./ui/button";
import {
    Code,
    Menu,
    X,
    ChevronDown,
    User,
    Settings,
    LogOut,
    BookOpen,
    Trophy,
    Users,
    Building
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navigation = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" }
];

const servicesDropdownItems = [
    { name: "Web Development", href: "#web", icon: Code },
    { name: "Mobile Apps", href: "#mobile", icon: BookOpen },
    { name: "UI/UX Design", href: "#design", icon: User },
    { name: "E-Commerce", href: "#ecommerce", icon: Building }
];

const aboutDropdownItems = [
    { name: "Our Story", href: "#story", icon: Users },
    { name: "Team", href: "#team", icon: Building },
    { name: "Case Studies", href: "#cases", icon: Code },
    { name: "Blog", href: "#blog", icon: Settings }
];

export function CodeCredHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <nav className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Code className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">coduxa</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigation.map((item) => {
                            if (item.name === "Services") {
                                return (
                                    <DropdownMenu key={item.name}>
                                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            {item.name}
                                            <ChevronDown className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-56">
                                            {servicesDropdownItems.map((dropdownItem) => {
                                                const Icon = dropdownItem.icon;
                                                return (
                                                    <DropdownMenuItem key={dropdownItem.name} asChild>
                                                        <a href={dropdownItem.href} className="flex items-center gap-2">
                                                            <Icon className="h-4 w-4" />
                                                            {dropdownItem.name}
                                                        </a>
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                );
                            } else if (item.name === "About") {
                                return (
                                    <DropdownMenu key={item.name}>
                                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            {item.name}
                                            <ChevronDown className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-56">
                                            {aboutDropdownItems.map((dropdownItem) => {
                                                const Icon = dropdownItem.icon;
                                                return (
                                                    <DropdownMenuItem key={dropdownItem.name} asChild>
                                                        <a href={dropdownItem.href} className="flex items-center gap-2">
                                                            <Icon className="h-4 w-4" />
                                                            {dropdownItem.name}
                                                        </a>
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                );
                            } else {
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                );
                            }
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* CTA Buttons - Updated to use React Router Link */}
                        <div className="hidden sm:flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link to="/signup">Get Started</Link>
                            </Button>
                        </div>

                        {/* User Menu (when authenticated) */}
                        <div className="hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <User className="h-3 w-3 text-primary-foreground" />
                                        </div>
                                        <span className="hidden md:inline">John Doe</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trophy className="mr-2 h-4 w-4" />
                                        <span>My Certificates</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        <span>Portfolio</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border bg-card/50 backdrop-blur-sm">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4 pb-2 border-t border-border/50">
                                <div className="flex flex-col gap-2 px-3">
                                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            Login
                                        </Link>
                                    </Button>
                                    <Button size="sm" className="w-full" asChild>
                                        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}