import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Building2, ChevronDown, BookOpen, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={new URL("@/assets/logo.png", import.meta.url).href}
            alt="Sky Elite Real Estate"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </button>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Building2 className="h-4 w-4" />
              Properties
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/off-plan" className="cursor-pointer">
                  Off-Plan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/secondary" className="cursor-pointer">
                  Secondary
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/rental" className="cursor-pointer">
                  Rental
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <BookOpen className="h-4 w-4" />
              Resources
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/blog" className="cursor-pointer">
                  Blog
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/testimonials"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
        </div>

        {/* Call Button */}
        <Button className="gap-2 hidden md:flex">
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">+971 58 827 3634</span>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/40 w-full shadow-md">
          <div className="flex flex-col px-6 py-4 gap-3">
            <button
              onClick={() => {
                scrollToSection("home");
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
            >
              Home
            </button>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors w-full justify-between">
                <span>Properties</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuItem asChild>
                  <Link
                    to="/off-plan"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer"
                  >
                    Off-Plan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/secondary"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer"
                  >
                    Secondary
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/rental"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer"
                  >
                    Rental
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors w-full justify-between">
                <span>Resources</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuItem asChild>
                  <Link
                    to="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer"
                  >
                    Blog
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Button className="gap-2 mt-2 w-full">
              <Phone className="h-4 w-4" />
              +971 58 827 3634
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
