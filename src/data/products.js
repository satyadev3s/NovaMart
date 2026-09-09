const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const extraCategories = ["Electronics", "Clothing", "Shoes", "Accessories", "Home", "Beauty"];
const extraImages = {
  Electronics: "photo-1516321318423-f06f85e504b3", Clothing: "photo-1483985988355-763728e1935b", Shoes: "photo-1542291026-7eec264c27ff", Accessories: "photo-1523779917675-b6ed3a42a561", Home: "photo-1618221195710-dd6b41faaea6", Beauty: "photo-1596462502278-27bfdc403348",
};
const extraTitles = ["Wireless Desk Charger", "Ribbed Everyday Sweater", "City Canvas Trainers", "Slim Card Holder", "Glass Water Carafe", "Calming Face Mist", "Smart Desk Light", "Relaxed Fit Overshirt", "Trail Sport Socks", "Metal Key Organizer", "Cotton Bath Towel", "Nourishing Lip Balm", "Wireless Mouse Pad", "Soft Lounge Pants", "Classic Court Sneakers", "Travel Jewelry Case", "Natural Wood Hanger", "Gentle Cleansing Gel", "Mini Alarm Clock", "Striped Pocket Shirt", "Performance Running Cap", "Chain Link Bracelet", "Ceramic Plant Pot", "Daily Mineral Sunscreen", "USB-C Charging Cable", "Lightweight Denim Jacket", "Suede Weekend Loafers", "Foldable Travel Umbrella", "Linen Table Runner", "Refreshing Eye Cream", "Compact Power Bank", "Waffle Knit Cardigan", "Slip-On Comfort Shoes", "Minimal Pendant Necklace", "Scented Soy Candle", "Overnight Repair Mask"];
const extraProducts = extraTitles.map((title, index) => {
  const category = extraCategories[index % extraCategories.length];
  const price = 18 + (index % 6) * 11 + Math.floor(index / 6) * 3;
  const originalPrice = price + 12;
  return { id: index + 19, title, category, price, originalPrice, discount: Math.round((1 - price / originalPrice) * 100), rating: Number((4.4 + (index % 5) * 0.1).toFixed(1)), reviews: 48 + index * 9, image: image(extraImages[category]), images: [image(extraImages[category])], description: `A dependable ${category.toLowerCase()} essential designed for everyday use.`, stock: 10 + (index % 21), featured: index % 9 === 0, bestseller: index % 8 === 0 };
});

export const products = [
  { id: 1, title: "AirPods Max Pro", category: "Electronics", price: 249, originalPrice: 299, discount: 17, rating: 4.8, reviews: 286, image: image("photo-1505740420928-5e560c06d30e"), images: [image("photo-1505740420928-5e560c06d30e"), image("photo-1484704849700-f032a568e944")], description: "Immersive wireless headphones with rich sound and all-day comfort.", stock: 14, featured: true, bestseller: true },
  { id: 2, title: "Chrono Steel Watch", category: "Accessories", price: 129, originalPrice: 159, discount: 19, rating: 4.6, reviews: 118, image: image("photo-1524805444758-089113d48a6d"), images: [image("photo-1524805444758-089113d48a6d")], description: "A refined stainless-steel timepiece for everyday wear.", stock: 9, featured: true },
  { id: 3, title: "Cloud Runner Sneakers", category: "Shoes", price: 99, originalPrice: 130, discount: 24, rating: 4.7, reviews: 344, image: image("photo-1542291026-7eec264c27ff"), images: [image("photo-1542291026-7eec264c27ff")], description: "Lightweight, cushioned sneakers made for city miles.", stock: 22, bestseller: true },
  { id: 4, title: "Linen Everyday Shirt", category: "Clothing", price: 48, originalPrice: 65, discount: 26, rating: 4.5, reviews: 74, image: image("photo-1602810318383-e386cc2a3ccf"), images: [image("photo-1602810318383-e386cc2a3ccf")], description: "Breathable linen blend with a relaxed modern fit.", stock: 30, featured: true },
  { id: 5, title: "Ceramic Table Lamp", category: "Home", price: 76, originalPrice: 95, discount: 20, rating: 4.9, reviews: 91, image: image("photo-1507473885765-e6ed057f782c"), images: [image("photo-1507473885765-e6ed057f782c")], description: "Warm ambient light in a sculptural ceramic base.", stock: 7, bestseller: true },
  { id: 6, title: "Vitamin C Glow Serum", category: "Beauty", price: 32, originalPrice: 40, discount: 20, rating: 4.6, reviews: 210, image: image("photo-1620916566398-39f1143ab7be"), images: [image("photo-1620916566398-39f1143ab7be")], description: "A lightweight daily serum for brighter-looking skin.", stock: 18, featured: true },
  { id: 7, title: "Compact Camera X1", category: "Electronics", price: 439, originalPrice: 499, discount: 12, rating: 4.7, reviews: 59, image: image("photo-1516035069371-29a1b244cc32"), images: [image("photo-1516035069371-29a1b244cc32")], description: "Capture crisp travel memories with a compact premium camera.", stock: 5 },
  { id: 8, title: "Minimal Leather Tote", category: "Accessories", price: 110, originalPrice: 145, discount: 24, rating: 4.8, reviews: 132, image: image("photo-1548036328-c9fa89d128fa"), images: [image("photo-1548036328-c9fa89d128fa")], description: "Spacious genuine leather tote with a clean silhouette.", stock: 12, bestseller: true },
  { id: 9, title: "Trail Hiking Boots", category: "Shoes", price: 145, originalPrice: 180, discount: 19, rating: 4.5, reviews: 88, image: image("photo-1542291026-7eec264c27ff"), images: [image("photo-1542291026-7eec264c27ff")], description: "Durable boots with reliable grip for outdoor adventures.", stock: 16 },
  { id: 10, title: "Organic Cotton Hoodie", category: "Clothing", price: 62, originalPrice: 78, discount: 21, rating: 4.7, reviews: 165, image: image("photo-1556821840-3a63f95609a7"), images: [image("photo-1556821840-3a63f95609a7")], description: "Soft organic cotton comfort, finished with subtle details.", stock: 20 },
  { id: 11, title: "Stoneware Dinner Set", category: "Home", price: 84, originalPrice: 105, discount: 20, rating: 4.8, reviews: 103, image: image("photo-1494438639946-1ebd1d20bf85"), images: [image("photo-1494438639946-1ebd1d20bf85")], description: "Hand-finished stoneware for relaxed everyday dining.", stock: 11 },
  { id: 12, title: "Rose Quartz Face Roller", category: "Beauty", price: 24, originalPrice: 30, discount: 20, rating: 4.4, reviews: 67, image: image("photo-1619451334792-150fd785ee74"), images: [image("photo-1619451334792-150fd785ee74")], description: "A calming skincare ritual made simple.", stock: 25 },
  { id: 13, title: "Portable Bluetooth Speaker", category: "Electronics", price: 58, originalPrice: 72, discount: 19, rating: 4.6, reviews: 146, image: image("photo-1608043152269-423dbba4e7e1"), images: [image("photo-1608043152269-423dbba4e7e1")], description: "Clear, room-filling sound in a compact travel-ready speaker.", stock: 19, featured: true },
  { id: 14, title: "Canvas Weekend Backpack", category: "Accessories", price: 54, originalPrice: 68, discount: 21, rating: 4.7, reviews: 92, image: image("photo-1553062407-98eeb64c6a62"), images: [image("photo-1553062407-98eeb64c6a62")], description: "A sturdy everyday backpack with room for essentials.", stock: 15 },
  { id: 15, title: "Classic Cotton T-Shirt", category: "Clothing", price: 22, originalPrice: 28, discount: 21, rating: 4.5, reviews: 203, image: image("photo-1521572163474-6864f9cf17ab"), images: [image("photo-1521572163474-6864f9cf17ab")], description: "A soft, dependable cotton tee for effortless everyday wear.", stock: 40, bestseller: true },
  { id: 16, title: "Everyday Walking Sandals", category: "Shoes", price: 39, originalPrice: 50, discount: 22, rating: 4.6, reviews: 128, image: image("photo-1603487742131-4160ec999306"), images: [image("photo-1603487742131-4160ec999306")], description: "Comfortable lightweight sandals for warm-weather days.", stock: 24 },
  { id: 17, title: "Bamboo Storage Basket", category: "Home", price: 29, originalPrice: 38, discount: 24, rating: 4.8, reviews: 77, image: image("photo-1616486338812-3dadae4b4ace"), images: [image("photo-1616486338812-3dadae4b4ace")], description: "A woven storage basket that brings order to any room.", stock: 17 },
  { id: 18, title: "Hydrating Body Lotion", category: "Beauty", price: 18, originalPrice: 24, discount: 25, rating: 4.5, reviews: 188, image: image("photo-1556228578-8c89e6adf883"), images: [image("photo-1556228578-8c89e6adf883")], description: "Daily lightweight moisture with a clean, fresh finish.", stock: 28 },
  ...extraProducts,
].map((product) => ({
  ...product,
  // Use accessible INR price points throughout the storefront.
  price: product.price * 10,
  originalPrice: product.originalPrice * 10,
}));

export const categories = ["All", "Electronics", "Clothing", "Shoes", "Accessories", "Home", "Beauty"];
