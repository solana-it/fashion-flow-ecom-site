
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Button from "./Button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  tags?: string[];
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  category,
  images,
  tags,
  isNew = false,
  isSale = false,
  salePrice,
  className,
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden",
        className
      )}
    >
      {/* Image Container */}
      <Link
        to={`/product/${id}`}
        className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500 ease-in-out",
          isHovered ? "opacity-0" : "opacity-100"
        )}>
          <img
            src={images[0]}
            alt={name}
            className={cn(
              "h-full w-full object-cover object-center image-blur-in",
              isImageLoaded ? "image-loaded" : "image-loading"
            )}
            onLoad={handleImageLoad}
          />
        </div>
        
        {images.length > 1 && (
          <div className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-in-out",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <img
              src={images[1]}
              alt={`${name} - alternate view`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black text-white text-xs px-2 py-1 font-medium animate-fade-in">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 font-medium animate-fade-in">
              SALE
            </span>
          )}
        </div>
        
        {/* Quick Action Buttons - only visible on hover */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-colors shadow-md"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-colors shadow-md"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-colors shadow-md"
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="mt-4 flex flex-col">
        <div className="text-xs text-neutral-500 uppercase tracking-wider">
          {category}
        </div>
        
        <Link to={`/product/${id}`} className="mt-1 text-base font-medium hover:underline">
          {name}
        </Link>
        
        <div className="mt-1 flex items-center">
          {isSale && salePrice ? (
            <>
              <span className="text-red-600 font-medium mr-2">{formatPrice(salePrice)}</span>
              <span className="text-neutral-500 line-through text-sm">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="font-medium">{formatPrice(price)}</span>
          )}
        </div>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Add to Cart Button - visible on mobile */}
        <div className="mt-4 md:hidden">
          <Button fullWidth icon={<ShoppingBag size={16} />}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
