
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  Star,
  RefreshCw,
  Truck,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/hooks/useCart";
import { getProductById, getProductsByCategory, Product } from "@/lib/data";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const product = getProductById(id || "");
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Reset selections when product changes
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors?.[0]);
      setSelectedSize(product.sizes?.[0]);
      setQuantity(1);
      
      // Get related products from the same category
      const related = getProductsByCategory(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-neutral-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handlePrevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setSelectedImage((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < (product.stockCount || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product.category !== 'accessories' && !selectedSize) {
      return; // Don't add to cart if size is required but not selected
    }
    
    addItem(product, quantity, selectedSize, selectedColor);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-neutral-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-500">/</li>
              <li>
                <Link to="/shop" className="text-neutral-500 hover:text-black transition-colors">
                  Shop
                </Link>
              </li>
              <li className="text-neutral-500">/</li>
              <li>
                <Link 
                  to={`/shop?category=${product.category}`} 
                  className="text-neutral-500 hover:text-black transition-colors capitalize"
                >
                  {product.category}
                </Link>
              </li>
              <li className="text-neutral-500">/</li>
              <li className="text-black font-medium truncate">{product.name}</li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                className="relative overflow-hidden bg-neutral-100 aspect-[4/5] cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleZoom}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <div 
                  className={`w-full h-full transition-transform duration-300 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : undefined
                  }
                >
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black shadow-md hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black shadow-md hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 border-2 flex-shrink-0 ${
                      selectedImage === index
                        ? "border-black"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - thumbnail ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              {/* Tags */}
              <div className="flex space-x-2 mb-3">
                {product.isNew && (
                  <span className="inline-block bg-black text-white text-xs font-medium px-2 py-1">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="inline-block bg-red-600 text-white text-xs font-medium px-2 py-1">
                    SALE
                  </span>
                )}
              </div>
              
              {/* Title and Price */}
              <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                {product.isSale && product.salePrice ? (
                  <>
                    <span className="text-xl font-medium text-red-600">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-neutral-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-medium">
                    {formatPrice(product.price)}
                  </span>
                )}
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
                          className={i < Math.floor(product.rating || 0) ? "text-amber-500" : "text-neutral-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">
                      {product.rating.toFixed(1)} ({product.reviews} reviews)
                    </span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <p className="text-neutral-600 mb-8">
                {product.longDescription || product.description}
              </p>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-medium mb-3">
                    Color: <span className="font-normal">{selectedColor}</span>
                  </h2>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-md text-sm transition-colors ${
                          selectedColor === color
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-medium">
                      Size: <span className="font-normal">{selectedSize}</span>
                    </h2>
                    <button className="text-sm underline text-neutral-600 hover:text-black transition-colors">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 flex items-center justify-center rounded-md text-sm transition-colors ${
                            isSelected
                              ? "bg-black text-white"
                              : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex border border-neutral-300 rounded-md max-w-[140px]">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-12 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-grow h-12 flex items-center justify-center text-black font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-12 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                    disabled={quantity >= (product.stockCount || 10)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="flex-grow grid grid-cols-2 gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                    icon={<ShoppingBag size={18} />}
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    icon={<Heart size={18} />}
                  >
                    Wishlist
                  </Button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <Truck size={18} className="text-neutral-700 mr-3" />
                  <span className="text-sm">Free shipping over $100</span>
                </div>
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <RefreshCw size={18} className="text-neutral-700 mr-3" />
                  <span className="text-sm">Free 30-day returns</span>
                </div>
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <ShieldCheck size={18} className="text-neutral-700 mr-3" />
                  <span className="text-sm">2 year warranty</span>
                </div>
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <Check size={18} className="text-neutral-700 mr-3" />
                  <span className="text-sm">
                    {product.inStock ? "In stock, ready to ship" : "Currently out of stock"}
                  </span>
                </div>
              </div>
              
              {/* Share */}
              <div className="flex items-center space-x-3 text-neutral-600 py-4 border-t border-neutral-200">
                <span className="text-sm font-medium">Share:</span>
                <button className="hover:text-black transition-colors" aria-label="Share on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </button>
                <button className="hover:text-black transition-colors" aria-label="Share on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </button>
                <button className="hover:text-black transition-colors" aria-label="Share on Pinterest">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pinterest">
                    <path d="M9 2C4.582 2 2 5.79 2 9.5c0 2.37 1.372 4.825 2.957 6.304C6.521 17.29 8.644 19 12 19c1.796 0 2.65-1.196 2.757-1.372 0 0 .32-.881.164-1.803C15.01 14.114 16 15 17.5 15c3.12 0 4.5-3.387 4.5-5.27C22 7.313 19.582 4 15 4c-3.665 0-7.165 2.333-7.165 6.33 0 1.64.497 3.278 1.813 3.84.412.163.25-.08.582-1.08.031-.083.024-.165-.022-.247-.487-.75-.793-1.983-.793-3.005C9.415 6.615 11.358 5 14.807 5c2.715 0 4.693 1.674 4.693 3.992C19.5 12.456 18.043 14 16.5 14c-1.813 0-1.718-1.683-1.115-2.89.499-1.008.467-2.087-.034-2.525-.664-.582-1.653-.082-2.013.43-.296.42-.572 1.085-.658 1.723-.073.536.044 1.051.345 1.445-1.368 5.574-1.935 6.694-1.398 9.306.115.564.159.95.36 1.168.023.025.064.05.108.05.036 0 .072-.017.09-.049 1.434-2.365.997-3.205 2.994-8.63.487 1.007 1.256 1.512 2.248 1.495.966-.017 1.845-.43 2.612-1.23.917-.957 1.461-2.306 1.461-3.613-.023-2.127-1.614-4.15-4.9-4.15-3.194 0-6.2 2.267-6.2 6.17 0 .747.168 1.612.5 2.155"></path>
                  </svg>
                </button>
                <button className="hover:text-black transition-colors" aria-label="Share via Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-2xl font-semibold">You May Also Like</h2>
                <Link to={`/shop?category=${product.category}`} className="hidden md:flex items-center group text-black hover:text-neutral-700">
                  <span className="mr-2 font-medium">View More</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    images={product.images}
                    isNew={product.isNew}
                    isSale={product.isSale}
                    salePrice={product.salePrice}
                  />
                ))}
              </div>
              
              <div className="mt-10 flex justify-center md:hidden">
                <Link to={`/shop?category=${product.category}`}>
                  <Button variant="outline" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                    View More
                  </Button>
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
