
import { Link } from "react-router-dom";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tighter">FLOW</h3>
            <p className="text-neutral-600 text-sm max-w-xs">
              Minimalist clothing for the modern individual. Designed with purpose, crafted with care.
            </p>
            <div className="flex space-x-4 text-neutral-600">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors focus-ring"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors focus-ring"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors focus-ring"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors focus-ring"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Shop links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link to="/shop?category=men" className="hover:text-black transition-colors focus-ring">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women" className="hover:text-black transition-colors focus-ring">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-black transition-colors focus-ring">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=new" className="hover:text-black transition-colors focus-ring">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=bestsellers" className="hover:text-black transition-colors focus-ring">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link to="/about" className="hover:text-black transition-colors focus-ring">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-black transition-colors focus-ring">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-black transition-colors focus-ring">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-black transition-colors focus-ring">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-black transition-colors focus-ring">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Fashion Street, New York, NY 10001, USA</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <a href="tel:+12125551234" className="hover:text-black transition-colors focus-ring">
                  +1 (212) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <a href="mailto:support@flowfashion.com" className="hover:text-black transition-colors focus-ring">
                  support@flowfashion.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Flow Fashion. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png" alt="Visa" className="h-6 w-auto" />
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c533.png" alt="Mastercard" className="h-6 w-auto" />
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c535.png" alt="PayPal" className="h-6 w-auto" />
            <img src="https://assets.stickpng.com/images/60e7f964711cf700048d7fbf.png" alt="Apple Pay" className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
