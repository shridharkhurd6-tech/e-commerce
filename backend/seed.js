import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('📡 Connecting to MongoDB...');
console.log('URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs

// Connect to MongoDB with longer timeouts
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Product Schema
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model('Product', ProductSchema);

// Sample Products Data
const sampleProducts = [
  {
    id: 1,
    name: 'Stylish Women\'s T-Shirt',
    image: 'http://localhost:4000/images/product_1.jpg',
    category: 'women',
    new_price: 45.99,
    old_price: 59.99,
    available: true,
  },
  {
    id: 2,
    name: 'Classic Men\'s Polo Shirt',
    image: 'http://localhost:4000/images/product_2.jpg',
    category: 'men',
    new_price: 52.99,
    old_price: 69.99,
    available: true,
  },
  {
    id: 3,
    name: 'Casual Women\'s Jeans',
    image: 'http://localhost:4000/images/product_3.jpg',
    category: 'women',
    new_price: 65.99,
    old_price: 85.99,
    available: true,
  },
  {
    id: 4,
    name: 'Premium Men\'s Jacket',
    image: 'http://localhost:4000/images/product_4.jpg',
    category: 'men',
    new_price: 125.99,
    old_price: 165.99,
    available: true,
  },
  {
    id: 5,
    name: 'Kids Colorful T-Shirt',
    image: 'http://localhost:4000/images/product_5.jpg',
    category: 'kid',
    new_price: 28.99,
    old_price: 39.99,
    available: true,
  },
  {
    id: 6,
    name: 'Elegant Women\'s Dress',
    image: 'http://localhost:4000/images/product_6.jpg',
    category: 'women',
    new_price: 89.99,
    old_price: 119.99,
    available: true,
  },
  {
    id: 7,
    name: 'Comfortable Men\'s Shorts',
    image: 'http://localhost:4000/images/product_7.jpg',
    category: 'men',
    new_price: 38.99,
    old_price: 49.99,
    available: true,
  },
  {
    id: 8,
    name: 'Girl\'s Party Dress',
    image: 'http://localhost:4000/images/product_8.jpg',
    category: 'kid',
    new_price: 42.99,
    old_price: 59.99,
    available: true,
  },
  {
    id: 9,
    name: 'Women\'s Winter Coat',
    image: 'http://localhost:4000/images/product_9.jpg',
    category: 'women',
    new_price: 145.99,
    old_price: 189.99,
    available: true,
  },
  {
    id: 10,
    name: 'Men\'s Casual Shirt',
    image: 'http://localhost:4000/images/product_10.jpg',
    category: 'men',
    new_price: 48.99,
    old_price: 64.99,
    available: true,
  },
];

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${sampleProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}
