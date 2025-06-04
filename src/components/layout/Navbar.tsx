
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Heart, 
  User 
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Listen for scroll events to change navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Men", path: "/shop?category=men" },
    { name: "Women", path: "/shop?category=women" },
    { name: "Accessories", path: "/shop?category=accessories" },
  ];
  
  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tighter focus-ring"
          aria-label="Fashion Flow Home"
        >
          FLOW
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium hover:text-black transition-colors relative focus-ring",
                location.pathname === link.path ? "text-black" : "text-neutral-500"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>
        
        {/* Icon Navigation */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 text-neutral-700 hover:text-black transition-colors focus-ring rounded-full"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to="/wishlist" 
            className="p-2 text-neutral-700 hover:text-black transition-colors focus-ring rounded-full"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>
          
          <Link 
            to="/cart" 
            className="p-2 text-neutral-700 hover:text-black transition-colors focus-ring rounded-full relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center animate-scale-in">
              3
            </span>
          </Link>
          
          <Link 
            to="/signin" 
            className="p-2 text-neutral-700 hover:text-black transition-colors focus-ring rounded-full hidden sm:flex"
            aria-label="Account"
          >
            <User size={20} />
          </Link>
          
          {/* Mobile menu button */}
          {isMobile && (
            <button
              className="p-2 text-neutral-700 hover:text-black transition-colors focus-ring rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-white z-40 pt-20 px-6 transition-all duration-300 ease-in-out",
            isMenuOpen 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-full pointer-events-none"
          )}
        >
          <nav className="flex flex-col space-y-6 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "py-2 border-b border-neutral-100 font-medium hover:text-neutral-900 transition-colors",
                  location.pathname === link.path ? "text-black" : "text-neutral-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/signin"
              className="py-2 border-b border-neutral-100 font-medium hover:text-neutral-900 transition-colors"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
