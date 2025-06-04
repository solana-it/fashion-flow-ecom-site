
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";

const Checkout = () => {
  const { items, subtotal } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    phone: "",
    sameShipping: true,
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    
    // Simulate API call
    setTimeout(() => {
      setActiveStep(3);
      setIsPlacingOrder(false);
    }, 1500);
  };
  
  const estimatedTax = subtotal * 0.08; // 8% tax rate for demo
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = subtotal + estimatedTax + shippingCost;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
            <p className="text-neutral-600 mb-6">
              You need to add some items to your cart before checking out.
            </p>
            <Link to="/shop">
              <Button variant="primary">Shop Now</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
          {/* Checkout Header */}
          <div className="mb-10">
            <Link to="/cart" className="flex items-center text-neutral-600 hover:text-black transition-colors mb-6">
              <ChevronLeft size={18} className="mr-1" />
              <span>Back to cart</span>
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">Checkout</h1>
            
            {/* Progress Steps */}
            <div className="flex justify-between items-center max-w-lg">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activeStep >= 1 ? "bg-black text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  1
                </div>
                <span className="text-xs mt-1">Information</span>
              </div>
              
              <div className="h-0.5 flex-grow mx-2 bg-neutral-200">
                <div className={`h-full bg-black transition-all ${
                  activeStep >= 2 ? "w-full" : "w-0"
                }`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activeStep >= 2 ? "bg-black text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  2
                </div>
                <span className="text-xs mt-1">Payment</span>
              </div>
              
              <div className="h-0.5 flex-grow mx-2 bg-neutral-200">
                <div className={`h-full bg-black transition-all ${
                  activeStep >= 3 ? "w-full" : "w-0"
                }`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activeStep >= 3 ? "bg-black text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  3
                </div>
                <span className="text-xs mt-1">Confirmation</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Form Area */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Information */}
              {activeStep === 1 && (
                <form onSubmit={handleNextStep} className="animate-fade-in">
                  <div className="bg-white rounded-lg px-6 py-8">
                    <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-6 mt-10">Shipping Address</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="apartment" className="block text-sm font-medium mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="sameShipping"
                          checked={formData.sameShipping}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="w-5 h-5 border border-neutral-300 rounded mr-3 flex items-center justify-center">
                          {formData.sameShipping && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm">
                          Billing address same as shipping address
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button type="submit" variant="primary" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}
              
              {/* Step 2: Payment Information */}
              {activeStep === 2 && (
                <form onSubmit={handlePlaceOrder} className="animate-fade-in">
                  <div className="bg-white rounded-lg px-6 py-8">
                    <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                    
                    <div className="mb-8">
                      <div className="flex flex-col gap-4">
                        <label className="flex items-center cursor-pointer p-4 border border-neutral-300 rounded-lg">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={formData.paymentMethod === "credit"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="w-5 h-5 border border-neutral-300 rounded-full mr-3 flex items-center justify-center">
                            {formData.paymentMethod === "credit" && (
                              <div className="w-3 h-3 bg-black rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Credit / Debit Card</span>
                          </div>
                          <div className="flex gap-2">
                            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png" alt="Visa" className="h-6" />
                            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c533.png" alt="Mastercard" className="h-6" />
                            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c535.png" alt="PayPal" className="h-6" />
                            <img src="https://assets.stickpng.com/images/60e7f964711cf700048d7fbf.png" alt="Apple Pay" className="h-6" />
                          </div>
                        </label>
                        
                        <label className="flex items-center cursor-pointer p-4 border border-neutral-300 rounded-lg">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === "paypal"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="w-5 h-5 border border-neutral-300 rounded-full mr-3 flex items-center justify-center">
                            {formData.paymentMethod === "paypal" && (
                              <div className="w-3 h-3 bg-black rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">PayPal</span>
                          </div>
                          <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c535.png" alt="PayPal" className="h-6" />
                        </label>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === "credit" && (
                      <div className="animate-fade-in">
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="**** **** **** ****"
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                              Expiry Date (MM/YY)
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              required
                              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                              Security Code (CVV)
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="***"
                              required
                              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="p-4 bg-neutral-50 rounded-lg mb-4">
                          <p className="text-sm text-neutral-600">
                            Your payment information is secure and encrypted. We never store your full credit card details.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {formData.paymentMethod === "paypal" && (
                      <div className="p-4 bg-neutral-50 rounded-lg mb-4 animate-fade-in">
                        <p className="text-sm text-neutral-600">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" size="lg" onClick={handlePrevStep}>
                      Back to Information
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      loading={isPlacingOrder}
                      disabled={isPlacingOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </form>
              )}
              
              {/* Step 3: Confirmation */}
              {activeStep === 3 && (
                <div className="bg-white rounded-lg px-6 py-12 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-3">Order Confirmed!</h2>
                  <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
                    Thank you for your purchase! Your order has been confirmed and will be shipped soon.
                    You will receive an email confirmation with your order details and tracking information.
                  </p>
                  
                  <div className="py-6 border-t border-b border-neutral-200 mb-8">
                    <div className="grid grid-cols-2 gap-6 text-left max-w-md mx-auto">
                      <div>
                        <h3 className="font-medium mb-1">Order Reference</h3>
                        <p className="text-neutral-600">#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Estimated Delivery</h3>
                        <p className="text-neutral-600">
                          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Shipping Address</h3>
                        <p className="text-neutral-600">
                          {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Payment Method</h3>
                        <p className="text-neutral-600">
                          {formData.paymentMethod === "credit" ? "Credit/Debit Card" : "PayPal"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
                    <Button variant="primary" size="lg" asChild>
                      <Link to="/">Continue Shopping</Link>
                    </Button>
                    <Button variant="outline" size="lg">
                      View Order Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="mb-6">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b border-neutral-200">
                      <div className="relative w-16 h-20 bg-neutral-100">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full text-xs flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-sm mb-1 truncate">{item.product.name}</h3>
                        <div className="text-xs text-neutral-500">
                          {item.size && <span className="mr-2">Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                      <div className="ml-4 text-sm font-medium">
                        {formatPrice(
                          (item.product.salePrice || item.product.price) * item.quantity
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {items.length > 3 && (
                    <div className="py-3 text-sm text-neutral-600 text-center">
                      +{items.length - 3} more item(s)
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Estimated Tax</span>
                    <span className="font-medium">{formatPrice(estimatedTax)}</span>
                  </div>
                  
                  <div className="pt-3 mt-3 border-t border-neutral-200 flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
