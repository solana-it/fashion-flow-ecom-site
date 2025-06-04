import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";
import { Product } from "@/lib/data";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  
  const addItem = (product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === product.id && 
          item.size === size && 
          item.color === color
      );
      
      // If item exists, update quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast.success("Cart updated", {
          description: `${product.name} quantity updated in your cart.`,
        });
        
        return updatedItems;
      }
      
      // Otherwise add new item
      toast.success("Added to cart", {
        description: `${product.name} added to your cart.`,
      });
      
      return [
        ...prevItems,
        {
          id: `${product.id}-${size || "default"}-${color || "default"}`,
          product,
          quantity,
          size,
          color,
        },
      ];
    });
  };
  
  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id);
      
      if (item) {
        toast.success("Item removed", {
          description: `${item.product.name} removed from your cart.`,
        });
      }
      
      return prevItems.filter((item) => item.id !== id);
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared", {
      description: "All items have been removed from your cart.",
    });
  };
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => 
      total + 
      (item.product.salePrice || item.product.price) * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
