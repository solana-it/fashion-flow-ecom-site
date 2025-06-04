
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

type AuthMode = "signin" | "signup" | "forgot";

const SignIn = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (authMode === "forgot") {
        setResetEmailSent(true);
      }
    }, 1500);
  };
  
  const handleSwitchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setResetEmailSent(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 page-transition">
        <div className="max-w-md mx-auto px-6 py-12">
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-center mb-8">
            {authMode === "signin" && "Sign In"}
            {authMode === "signup" && "Create Account"}
            {authMode === "forgot" && "Reset Password"}
          </h1>
          
          {/* Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-200">
            {authMode === "signin" && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSwitchMode("forgot")}
                      className="text-sm text-neutral-600 hover:text-black transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
                
                <div className="text-center text-sm">
                  <span className="text-neutral-600">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("signup")}
                    className="text-black font-medium hover:underline"
                  >
                    Create one
                  </button>
                </div>
              </form>
            )}
            
            {authMode === "signup" && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Password must be at least 8 characters long.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Create Account
                </Button>
                
                <div className="text-center text-sm">
                  <span className="text-neutral-600">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("signin")}
                    className="text-black font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}
            
            {authMode === "forgot" && !resetEmailSent && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <p className="text-neutral-600 text-sm mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Send Reset Link
                </Button>
                
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("signin")}
                    className="text-black font-medium hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
            
            {authMode === "forgot" && resetEmailSent && (
              <div className="text-center py-4 animate-fade-in">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-green-600">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-medium mb-2">Check Your Email</h3>
                <p className="text-neutral-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox.
                </p>
                
                <Button 
                  variant="outline" 
                  onClick={() => handleSwitchMode("signin")}
                >
                  Back to Sign In
                </Button>
              </div>
            )}
            
            <div className="relative flex items-center justify-center mt-8">
              <div className="border-t border-neutral-200 absolute w-full"></div>
              <span className="px-4 text-xs text-neutral-500 bg-white relative">
                OR CONTINUE WITH
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 496.255 608.728">
                  <path d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zm-17.542 129.496c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 34.395 109.735 34.395z" fill="#999" />
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>
          </div>
          
          <p className="text-center text-sm text-neutral-500 mt-8">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-black hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-black hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
