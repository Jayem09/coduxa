import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add this import
import { Button } from "./ui/button";
import {
    Code,
    Menu,
    X,
    ChevronDown,
    User,
    Settings,
    BookOpen,
    Users,
    Building
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { supabase } from "./lib/supabaseClient";

const navigation: { name: string; href: string }[] = [];

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
    const [, setDisplayName] = useState<string>("");
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase.auth.getUser();
            const u = data.user;
            if (u) {
                const name = (u.user_metadata?.firstName || u.user_metadata?.first_name || "").toString();
                const combined = name || u.email || "";
                setDisplayName(combined);
                setIsAuthed(true);
                setIsAdmin(u.app_metadata?.role === 'admin');
            } else {
                setDisplayName("");
                setIsAuthed(false);
                setIsAdmin(false);
            }
        };
        load();
        const { data: sub } = supabase.auth.onAuthStateChange(() => load());
        return () => {
            sub.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // Force update authentication state immediately
        setIsAuthed(false);
        setIsAdmin(false);
        setDisplayName("");
        // Force a page reload to clear any cached state
        window.location.href = '/';
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold">coduxa</span>
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
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Desktop actions */}
                        <div className="hidden sm:flex items-center gap-2">
                            {isAuthed ? (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to={isAdmin ? "/dashboard/credits" : "/dashboard/credits"}>Dashboard</Link>
                                    </Button>
                                    <Button size="sm" variant="secondary" onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <Link to="/signup">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
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
                                    className="block px-3 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4 pb-2 border-t border-border/50">
                                <div className="flex flex-col gap-2 px-3">
                                    {isAuthed ? (
                                        <>
                                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm" asChild>
                                                <Link to={isAdmin ? "/dashboard/admin" : "/dashboard/credits"} onClick={() => setIsMobileMenuOpen(false)}>
                                                    Dashboard
                                                </Link>
                                            </Button>
                                            <Button size="sm" className="w-full text-sm" variant="secondary" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm" asChild>
                                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                                    Login
                                                </Link>
                                            </Button>
                                            <Button size="sm" className="w-full text-sm" asChild>
                                                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                                    Get Started
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}