
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const handlePromoCodeApply = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo promo code: "FLOW20" for 20% off
    if (promoCode.toUpperCase() === "FLOW20" && !isPromoApplied) {
      const discount = subtotal * 0.2;
      setPromoDiscount(discount);
      setIsPromoApplied(true);
    }
  };
  
  const handleRemovePromo = () => {
    setIsPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode("");
  };
  
  const estimatedTax = subtotal * 0.08; // 8% tax rate for demo
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = subtotal + estimatedTax + shippingCost - promoDiscount;
  
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
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center bg-neutral-50 rounded-lg">
              <div className="mb-6 w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center">
                <ShoppingBag size={32} className="text-neutral-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-neutral-600 mb-8 text-center max-w-lg">
                Looks like you haven't added any items to your cart yet. 
                Continue shopping to find the perfect items for your wardrobe.
              </p>
              <Link to="/shop">
                <Button variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg">
                  {/* Header */}
                  <div className="hidden md:grid grid-cols-12 py-4 border-b border-neutral-200 text-sm font-medium text-neutral-500">
                    <div className="col-span-6 px-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right px-6">Total</div>
                  </div>
                  
                  {/* Items */}
                  {items.map((item) => {
                    const product = item.product;
                    const itemPrice = product.salePrice || product.price;
                    const itemTotal = itemPrice * item.quantity;
                    
                    return (
                      <div 
                        key={item.id} 
                        className="grid grid-cols-1 md:grid-cols-12 py-6 border-b border-neutral-200 items-center animate-fade-in"
                      >
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center px-0 md:px-6 mb-4 md:mb-0">
                          <div className="w-20 h-20 bg-neutral-100 flex-shrink-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <Link to={`/product/${product.id}`} className="font-medium hover:underline">
                              {product.name}
                            </Link>
                            
                            <div className="text-sm text-neutral-500 mt-1">
                              {item.color && <span className="mr-2">Color: {item.color}</span>}
                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 text-sm flex items-center mt-2 hover:text-red-700 transition-colors md:hidden"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:col-span-2 flex md:block items-center justify-between md:text-center mb-4 md:mb-0">
                          <div className="text-sm font-medium md:hidden">Price:</div>
                          <div>
                            {product.isSale && product.salePrice ? (
                              <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-1">
                                <span className="text-red-600 font-medium">
                                  {formatPrice(product.salePrice)}
                                </span>
                                <span className="text-neutral-500 line-through text-sm">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                            ) : (
                              <span>{formatPrice(itemPrice)}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:col-span-2 flex items-center md:justify-center mb-4 md:mb-0">
                          <div className="text-sm font-medium mr-3 md:hidden">Quantity:</div>
                          <div className="flex border border-neutral-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:col-span-2 flex md:block items-center justify-between md:text-right md:px-6">
                          <div className="text-sm font-medium md:hidden">Total:</div>
                          <div className="font-medium">
                            {formatPrice(itemTotal)}
                          </div>
                        </div>
                        
                        {/* Remove - Desktop */}
                        <div className="hidden md:flex md:col-span-12 md:justify-end md:px-6 md:pt-2">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-500 text-sm flex items-center hover:text-neutral-700 transition-colors"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between mt-6">
                  <Link to="/shop">
                    <Button variant="outline" size="sm">
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Estimated Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Estimated Tax</span>
                      <span className="font-medium">{formatPrice(estimatedTax)}</span>
                    </div>
                    
                    {isPromoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          Promo Discount
                          <button 
                            onClick={handleRemovePromo}
                            className="ml-1 text-neutral-500 hover:text-neutral-700"
                            aria-label="Remove promo code"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </span>
                        <span className="font-medium">-{formatPrice(promoDiscount)}</span>
                      </div>
                    )}
                    
                    <div className="pt-3 mt-3 border-t border-neutral-200 flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  
                  {/* Promo Code Input */}
                  {!isPromoApplied && (
                    <form onSubmit={handlePromoCodeApply} className="mb-6">
                      <label htmlFor="promo" className="block text-sm font-medium mb-2">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="promo"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-grow px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        <Button type="submit" variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                      <div className="text-xs text-neutral-500 mt-2">
                        Try "FLOW20" for 20% off your order
                      </div>
                    </form>
                  )}
                  
                  <Link to="/checkout">
                    <Button variant="primary" size="lg" fullWidth className="mb-3">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="flex justify-center">
                    <div className="flex gap-2 items-center">
                      <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png" alt="Visa" className="h-4" />
                      <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c533.png" alt="Mastercard" className="h-4" />
                      <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c535.png" alt="PayPal" className="h-4" />
                      <img src="https://assets.stickpng.com/images/60e7f964711cf700048d7fbf.png" alt="Apple Pay" className="h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
