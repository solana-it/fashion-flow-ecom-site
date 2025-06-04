
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

interface FeaturedProductProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  buttonText?: string;
  buttonLink?: string;
  isReversed?: boolean;
  className?: string;
}

const FeaturedProduct = ({
  id,
  name,
  description,
  image,
  price,
  buttonText = "Shop Now",
  buttonLink,
  isReversed = false,
  className,
}: FeaturedProductProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  const link = buttonLink || `/product/${id}`;
  
  return (
    <div 
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center",
        isReversed ? "md:flex-row-reverse" : "",
        className
      )}
    >
      {/* Image Section */}
      <div className={cn("overflow-hidden", isReversed ? "md:order-2" : "md:order-1")}>
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-auto object-cover aspect-[4/5] md:aspect-[3/4] image-blur-in",
              isImageLoaded ? "image-loaded hover-scale" : "image-loading"
            )}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      
      {/* Content Section */}
      <div 
        className={cn(
          "flex flex-col space-y-6", 
          isReversed ? "md:order-1 md:pr-8" : "md:order-2 md:pl-8"
        )}
      >
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{name}</h2>
          <p className="text-neutral-600">{description}</p>
          <div className="text-xl font-medium">{formatPrice(price)}</div>
        </div>
        
        <Link to={link}>
          <Button 
            variant="primary" 
            size="lg" 
            className="group" 
            icon={<ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />}
            iconPosition="right"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;
