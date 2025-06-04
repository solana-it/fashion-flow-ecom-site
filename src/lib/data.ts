
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  salePrice?: number;
  category: 'men' | 'women' | 'accessories';
  subCategory?: string;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  stockCount?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Cotton T-Shirt",
    description: "Premium cotton t-shirt with a clean, minimalist design.",
    longDescription: "Our signature t-shirt features a clean, minimalist design crafted from premium organic cotton for ultimate comfort. The perfect staple piece for your everyday wardrobe with a modern fit and exceptional durability.",
    price: 49.99,
    category: 'men',
    subCategory: 'shirts',
    tags: ['organic', 'sustainable', 'essential'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: true,
    isNew: true,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 250
  },
  {
    id: "2",
    name: "Slim Fit Chino Pants",
    description: "Modern slim fit chino pants for a versatile wardrobe.",
    longDescription: "These slim fit chino pants offer a modern silhouette while maintaining comfort for all-day wear. Made from premium cotton twill with a touch of stretch for maximum mobility and durability.",
    price: 89.99,
    category: 'men',
    subCategory: 'pants',
    tags: ['slim fit', 'business casual', 'essential'],
    colors: ['Khaki', 'Navy', 'Olive', 'Black'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 96,
    inStock: true,
    stockCount: 180
  },
  {
    id: "3",
    name: "Cashmere Blend Sweater",
    description: "Luxurious cashmere blend sweater for timeless style.",
    longDescription: "This premium cashmere blend sweater offers exceptional warmth and softness with a classic silhouette. Designed for lasting quality with a clean, minimal aesthetic that transitions seamlessly from casual to formal occasions.",
    price: 149.99,
    salePrice: 119.99,
    category: 'men',
    subCategory: 'sweaters',
    tags: ['cashmere', 'luxury', 'winter'],
    colors: ['Camel', 'Charcoal', 'Burgundy'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1517677129300-07b130802f46?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586658052445-0a77dd4b27eb?q=80&w=1000&auto=format&fit=crop"
    ],
    isSale: true,
    rating: 4.9,
    reviews: 78,
    inStock: true,
    stockCount: 120
  },
  {
    id: "4",
    name: "Structured Wool Coat",
    description: "Elegant structured wool coat for sophisticated winter style.",
    longDescription: "Crafted from premium Italian wool, this structured coat offers excellent warmth without compromising on style. The clean lines and minimal detailing create a timeless silhouette that pairs well with both formal and casual attire.",
    price: 299.99,
    category: 'women',
    subCategory: 'outerwear',
    tags: ['wool', 'winter', 'luxury'],
    colors: ['Camel', 'Black', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1548624313-0396284dbaf5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: true,
    isNew: true,
    rating: 4.7,
    reviews: 52,
    inStock: true,
    stockCount: 75
  },
  {
    id: "5",
    name: "Silk Pleated Dress",
    description: "Elegant silk pleated dress for effortless sophistication.",
    longDescription: "This silk pleated dress embodies effortless elegance with its flowing silhouette and premium construction. The lightweight silk fabric creates a luxurious drape, while the pleated design adds subtle texture and movement.",
    price: 199.99,
    category: 'women',
    subCategory: 'dresses',
    tags: ['silk', 'formal', 'luxury'],
    colors: ['Black', 'Navy', 'Emerald'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: true,
    rating: 4.8,
    reviews: 65,
    inStock: true,
    stockCount: 90
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    description: "Premium leather crossbody bag with minimal detailing.",
    longDescription: "Crafted from full-grain Italian leather, this crossbody bag combines functionality with minimal aesthetics. The thoughtfully designed interior provides ample storage, while the adjustable strap ensures comfortable carrying throughout the day.",
    price: 179.99,
    salePrice: 149.99,
    category: 'accessories',
    subCategory: 'bags',
    tags: ['leather', 'handcrafted', 'essential'],
    colors: ['Black', 'Tan', 'Burgundy'],
    images: [
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590739225492-198cd163203c?q=80&w=1000&auto=format&fit=crop"
    ],
    isSale: true,
    rating: 4.9,
    reviews: 112,
    inStock: true,
    stockCount: 60
  },
  {
    id: "7",
    name: "Linen Button-Down Shirt",
    description: "Breathable linen button-down shirt for warm weather comfort.",
    longDescription: "Made from premium European linen, this button-down shirt offers exceptional breathability for warm weather. The relaxed fit and natural textured finish create a sophisticated yet casual look perfect for summer occasions.",
    price: 79.99,
    category: 'women',
    subCategory: 'shirts',
    tags: ['linen', 'summer', 'sustainable'],
    colors: ['White', 'Sand', 'Light Blue', 'Olive'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000&auto=format&fit=crop"
    ],
    isNew: true,
    rating: 4.7,
    reviews: 87,
    inStock: true,
    stockCount: 150
  },
  {
    id: "8",
    name: "Automatic Watch",
    description: "Sophisticated automatic watch with minimalist design.",
    longDescription: "This precision automatic timepiece features a meticulously crafted movement visible through the exhibition case back. The minimal dial design emphasizes understated elegance, while the premium materials ensure durability and lasting quality.",
    price: 349.99,
    category: 'accessories',
    subCategory: 'watches',
    tags: ['automatic', 'luxury', 'essential'],
    colors: ['Silver/Black', 'Gold/Brown', 'All Black'],
    images: [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: true,
    rating: 4.9,
    reviews: 56,
    inStock: true,
    stockCount: 40
  },
  {
    id: "9",
    name: "High-Waisted Wool Trousers",
    description: "Tailored high-waisted wool trousers for a refined look.",
    longDescription: "These high-waisted wool trousers offer impeccable Italian tailoring with a modern silhouette. The premium wool blend provides structure and comfort, while the thoughtful details like interior button tabs and horn buttons elevate the overall quality.",
    price: 129.99,
    salePrice: 99.99,
    category: 'women',
    subCategory: 'pants',
    tags: ['wool', 'tailored', 'business'],
    colors: ['Black', 'Navy', 'Charcoal'],
    sizes: ['0', '2', '4', '6', '8', '10', '12'],
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548343361-02248be15911?q=80&w=1000&auto=format&fit=crop"
    ],
    isSale: true,
    rating: 4.6,
    reviews: 79,
    inStock: true,
    stockCount: 100
  },
  {
    id: "10",
    name: "Merino Wool Scarf",
    description: "Luxurious merino wool scarf for warmth and style.",
    longDescription: "Crafted from the finest merino wool, this scarf provides exceptional warmth with a lightweight feel. The classic design ensures versatility, while the premium material offers superior softness against the skin.",
    price: 69.99,
    category: 'accessories',
    subCategory: 'scarves',
    tags: ['merino wool', 'winter', 'essential'],
    colors: ['Camel', 'Gray', 'Navy', 'Burgundy'],
    images: [
      "https://images.unsplash.com/photo-1603902248846-7a82856d6a9e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586867215525-db67f596a683?q=80&w=1000&auto=format&fit=crop"
    ],
    isNew: true,
    rating: 4.8,
    reviews: 45,
    inStock: true,
    stockCount: 120
  },
  {
    id: "11",
    name: "Knit Cashmere Beanie",
    description: "Ultra-soft cashmere beanie for luxurious warmth.",
    longDescription: "This premium cashmere beanie offers exceptional warmth and softness for cold weather. The ribbed design ensures a comfortable fit, while the pure cashmere construction provides unmatched insulation and a luxurious feel.",
    price: 49.99,
    category: 'accessories',
    subCategory: 'hats',
    tags: ['cashmere', 'winter', 'essential'],
    colors: ['Gray', 'Black', 'Camel', 'Navy'],
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510598155802-7e231b28de03?q=80&w=1000&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviews: 38,
    inStock: true,
    stockCount: 85
  },
  {
    id: "12",
    name: "Selvedge Denim Jeans",
    description: "Premium selvedge denim jeans with modern straight fit.",
    longDescription: "Crafted from premium Japanese selvedge denim, these jeans offer exceptional quality and durability. The modern straight fit provides a clean silhouette, while the traditional construction methods ensure authentic character and patina development over time.",
    price: 159.99,
    category: 'men',
    subCategory: 'denim',
    tags: ['selvedge', 'denim', 'essential'],
    colors: ['Indigo', 'Washed Black', 'Rinsed Blue'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593351799227-75ff2540382c?q=80&w=1000&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviews: 104,
    inStock: true,
    stockCount: 90
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.isNew);
};

export const getSaleProducts = (): Product[] => {
  return products.filter((product) => product.isSale);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
