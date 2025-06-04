
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Check 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { products, Product } from "@/lib/data";

type FilterState = {
  category: string[];
  price: [number, number];
  color: string[];
  size: string[];
};

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
  });
  
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    price: [0, 500],
    color: [],
    size: [],
  });
  
  // Extract all unique values for filters
  const allCategories = [...new Set(products.map(p => p.category))];
  const allColors = [...new Set(products.flatMap(p => p.colors || []))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes || []))];
  
  // Handle URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const collectionParam = params.get("collection");
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: [categoryParam]
      }));
    }
    
    // Handle special collections
    if (collectionParam === "new") {
      setFilteredProducts(products.filter(p => p.isNew));
    } else if (collectionParam === "sale") {
      setFilteredProducts(products.filter(p => p.isSale));
    } else if (collectionParam === "bestsellers") {
      // For demo purposes, assume products with highest reviews are bestsellers
      setFilteredProducts([...products].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 8));
    }
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter(p => filters.category.includes(p.category));
    }
    
    // Apply price filter
    result = result.filter(
      p => (p.salePrice || p.price) >= filters.price[0] && 
           (p.salePrice || p.price) <= filters.price[1]
    );
    
    // Apply color filter
    if (filters.color.length > 0) {
      result = result.filter(p => 
        p.colors && p.colors.some(color => filters.color.includes(color))
      );
    }
    
    // Apply size filter
    if (filters.size.length > 0) {
      result = result.filter(p => 
        p.sizes && p.sizes.some(size => filters.size.includes(size))
      );
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const toggleFilterSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  
  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = [...prev[type] as string[]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current,
      };
    });
  };
  
  const handlePriceChange = (index: number, value: number) => {
    setFilters(prev => {
      const newPrice = [...prev.price] as [number, number];
      newPrice[index] = value;
      return {
        ...prev,
        price: newPrice,
      };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      category: [],
      price: [0, 500],
      color: [],
      size: [],
    });
    
    // Clear URL parameters
    navigate("/shop");
  };
  
  const toggleMobileFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold">Shop</h1>
            
            <Button 
              variant="outline" 
              size="sm" 
              icon={<SlidersHorizontal size={16} />} 
              onClick={toggleMobileFilters}
              className="md:hidden"
            >
              Filters
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <aside className="w-full md:w-64 lg:w-72 hidden md:block flex-shrink-0">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-neutral-500 hover:text-black transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6 border-b border-neutral-200 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("category")}
                  >
                    <h3 className="font-medium">Category</h3>
                    {expandedSections.category ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  
                  {expandedSections.category && (
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={filters.category.includes(category)}
                            onChange={() => toggleFilter("category", category)}
                          />
                          <div className="w-5 h-5 border border-neutral-300 rounded flex items-center justify-center transition-colors">
                            {filters.category.includes(category) && (
                              <Check size={14} className="text-black" />
                            )}
                          </div>
                          <span className="text-sm capitalize">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Price Filter */}
                <div className="mb-6 border-b border-neutral-200 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("price")}
                  >
                    <h3 className="font-medium">Price Range</h3>
                    {expandedSections.price ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  
                  {expandedSections.price && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">${filters.price[0]}</span>
                        <span className="text-sm font-medium">${filters.price[1]}</span>
                      </div>
                      
                      <div className="flex gap-4">
                        <input
                          type="range"
                          min={0}
                          max={500}
                          step={10}
                          value={filters.price[0]}
                          onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min={0}
                          max={500}
                          step={10}
                          value={filters.price[1]}
                          onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Colors Filter */}
                <div className="mb-6 border-b border-neutral-200 pb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("color")}
                  >
                    <h3 className="font-medium">Colors</h3>
                    {expandedSections.color ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  
                  {expandedSections.color && (
                    <div className="flex flex-wrap gap-3">
                      {allColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => toggleFilter("color", color)}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            filters.color.includes(color)
                              ? "bg-black text-white"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Size Filter */}
                <div className="mb-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleFilterSection("size")}
                  >
                    <h3 className="font-medium">Size</h3>
                    {expandedSections.size ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  
                  {expandedSections.size && (
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleFilter("size", size)}
                          className={`w-10 h-10 text-sm flex items-center justify-center rounded-md transition-colors ${
                            filters.size.includes(size)
                              ? "bg-black text-white"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-grow">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-neutral-50 py-16 px-4 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-neutral-600 text-center mb-6">
                    Try adjusting your filters or browse our entire collection.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {filteredProducts.map((product) => (
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
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Filters */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isFilterOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-lg font-medium">Filters</h2>
          <button 
            onClick={toggleMobileFilters}
            className="w-8 h-8 flex items-center justify-center text-neutral-500"
            aria-label="Close filters"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto h-[calc(100vh-70px)]">
          {/* Mobile Filter Content (similar to desktop filters) */}
          <div className="mb-6">
            <button 
              onClick={clearFilters}
              className="w-full py-2 px-4 border border-neutral-300 rounded-md text-center text-sm mb-6"
            >
              Clear all filters
            </button>
            
            {/* Category Filter */}
            <div className="mb-6 border-b border-neutral-200 pb-6">
              <div 
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleFilterSection("category")}
              >
                <h3 className="font-medium">Category</h3>
                {expandedSections.category ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              
              {expandedSections.category && (
                <div className="space-y-3">
                  {allCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        className="hidden"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleFilter("category", category)}
                      />
                      <div className="w-5 h-5 border border-neutral-300 rounded flex items-center justify-center">
                        {filters.category.includes(category) && (
                          <Check size={14} className="text-black" />
                        )}
                      </div>
                      <span className="text-sm capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Rest of mobile filters (price, color, size) - similar to desktop */}
            {/* ... Add other filter sections here ... */}
          </div>
          
          <div className="sticky bottom-0 pt-4 bg-white">
            <Button 
              variant="primary" 
              fullWidth 
              size="lg"
              onClick={toggleMobileFilters}
            >
              Show {filteredProducts.length} Results
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
