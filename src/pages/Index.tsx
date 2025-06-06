
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import FeaturedProduct from "@/components/ui/FeaturedProduct";
import Button from "@/components/ui/button";
import { getFeaturedProducts, getNewArrivals, getSaleProducts } from "@/lib/data";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals().slice(0, 4);
  const saleProducts = getSaleProducts().slice(0, 4);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow page-transition pt-16">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop')",
              filter: "brightness(0.9)"
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div 
              className={`max-w-xl transition-all duration-1000 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <span className="inline-block mb-4 py-1 px-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-full">
                New Collection 2024
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Refined Essentials for the Modern Individual
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-md">
                Timeless pieces crafted with precision and care. Discover our collection of minimal, functional clothing designed to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Shop Collection
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <ArrowDown className="text-white h-8 w-8" />
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Shop by Category</h2>
              <p className="text-neutral-600 max-w-2xl">
                Explore our curated collections of timeless fashion essentials designed with simplicity and functionality in mind.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Men's Category */}
              <div className="relative group overflow-hidden rounded-lg h-[400px]">
                <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/40 transition-colors duration-300" />
                <img 
                  src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop"
                  alt="Men's Collection" 
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col z-20 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Men</h3>
                  <Link to="/shop?category=men">
                    <Button 
                      variant="outline" 
                      className="mt-4 border-white text-white hover:bg-white hover:text-black"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Women's Category */}
              <div className="relative group overflow-hidden rounded-lg h-[400px]">
                <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/40 transition-colors duration-300" />
                <img 
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop"
                  alt="Women's Collection" 
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col z-20 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Women</h3>
                  <Link to="/shop?category=women">
                    <Button 
                      variant="outline" 
                      className="mt-4 border-white text-white hover:bg-white hover:text-black"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Accessories Category */}
              <div className="relative group overflow-hidden rounded-lg h-[400px]">
                <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/40 transition-colors duration-300" />
                <img 
                  src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=1000&auto=format&fit=crop"
                  alt="Accessories Collection" 
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col z-20 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Accessories</h3>
                  <Link to="/shop?category=accessories">
                    <Button 
                      variant="outline" 
                      className="mt-4 border-white text-white hover:bg-white hover:text-black"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Product Section */}
        <section className="py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <FeaturedProduct 
              id={featuredProducts[0]?.id || "1"}
              name={featuredProducts[0]?.name || "Minimalist Cotton T-Shirt"}
              description={featuredProducts[0]?.description || "Premium cotton t-shirt with a clean, minimalist design."}
              image={featuredProducts[0]?.images[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"}
              price={featuredProducts[0]?.price || 49.99}
              buttonText="Shop This Style"
            />
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">New Arrivals</h2>
                <p className="text-neutral-600 max-w-2xl">
                  The latest additions to our collection, designed with our signature minimalist aesthetic.
                </p>
              </div>
              
              <Link to="/shop?collection=new" className="hidden md:flex items-center group text-black hover:text-neutral-700">
                <span className="mr-2 font-medium">View All</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {newArrivals.map((product) => (
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
                  tags={product.tags}
                />
              ))}
            </div>
            
            <div className="mt-10 flex justify-center md:hidden">
              <Link to="/shop?collection=new">
                <Button variant="outline" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                  View All New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Sale Products Section */}
        <section className="py-24 bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="bg-white/10 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                  Limited Time
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">Season Sale</h2>
                <p className="text-neutral-400 max-w-2xl">
                  Explore our curated selection of premium pieces at special prices.
                </p>
              </div>
              
              <Link to="/shop?collection=sale" className="hidden md:flex items-center group text-white hover:text-neutral-300">
                <span className="mr-2 font-medium">View All</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {saleProducts.map((product) => (
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
                  tags={product.tags}
                  className="bg-neutral-900 p-4 rounded-lg"
                />
              ))}
            </div>
            
            <div className="mt-10 flex justify-center md:hidden">
              <Link to="/shop?collection=sale">
                <Button variant="outline" size="lg" icon={<ArrowRight size={16} />} iconPosition="right" className="border-white text-white hover:bg-white/10">
                  View All Sale Items
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-24 bg-neutral-100">
          <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Join Our Newsletter</h2>
            <p className="text-neutral-600 mb-8">
              Subscribe to receive updates on new arrivals, special offers and exclusive content.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <Button type="submit" variant="primary" size="lg" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            
            <p className="text-xs text-neutral-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
