const port = 4000;
const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require("fs");
//const { type } = require("os");
//const { error } = require("console");

//Middleware
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));

// Ensure upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//Database  Connection With MongoDB
mongoose.connect('mongodb+srv://shridharkhurd6_db_user:'
    + encodeURIComponent('Shree6@6') 
    + '@cluster0.bij1vdx.mongodb.net/e-commerce',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

//API Creation

app.get ('/',(req,res)=>{
    res.send('Express App is Running');
});

//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
}) ;

const upload = multer({storage});

// Static route for images
app.use('/images',express.static('upload/images'));

//Creating Upload Endpoint for images
app.post('/upload', upload.single('product'), (req, res) => {
  try {
    console.log('📤 /upload called');
    console.log('File info:', req.file ? { filename: req.file.filename, size: req.file.size, mimetype: req.file.mimetype } : null);

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    return res.json({
      success: true,
      image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } catch (err) {
    console.error('❌ /upload error:', err);
    return res.status(500).json({ success: false, message: 'Upload error' });
  }
});

// Schema for Creating Products

const ProductSchema = new mongoose.Schema({
    id:{ type: Number,required: true },
    name:{ type: String,required: true },
    image:{ type: String,required: true },
    category:{ type: String,required: true },
    new_price:{ type: Number,required: true },
    old_price:{ type: Number,required: true },
    date:{ type: Date,default: Date.now },
    available:{ type: Boolean,default: true },
});
const Product = mongoose.model('Product', ProductSchema);

//Add Product
app.post('/addproduct', async (req, res) => {
  try {
    console.log('📥 /addproduct called');
    console.log('Request body:', req.body);
    // Generate next numeric id in a safe way (get product with highest id)
    const lastProduct = await Product.findOne({}).sort({ id: -1 }).limit(1);
    const id = lastProduct && typeof lastProduct.id === 'number' ? lastProduct.id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    console.log('Product Saved:', product.name, 'id:', product.id);
    res.json({ success: true, name: product.name });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ success: false, error: 'Failed to add product' });
  }
});

//creating API for deleting products

app.post('/removeproduct',async(req,res) => {
    try {
        await Product.findOneAndDelete({id:req.body.id});
        console.log('🗑️ Product Removed',req.body.id);
        res.json({
            success:true
            //name:req.body.name,
        });
        } catch (error) {
            res.status(500).json({ success: false, error:'Failed to remove product' });
        }
})

//creating API for getting all Products
app.get('/allproducts',async(req,res)=>{
    try {
        const products = await Product.find({});
        console.log('All Products Fetched');
        res.send(products);
    }
    catch {
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

//Schema creating for User model
const UserSchema  = new mongoose.Schema({
    name: String,
    email:{type: String, unique: true},
    password: String,
    cartData: Object,
    date:{type: Date, default: Date.now},
});
const Users = mongoose.model('Users', UserSchema);

//creating Endpoint for SignUp the user
app.post('/signup',async(req,res)=>{
     try {
        const check = await Users.findOne({email: req.body.email });
        if (check) {
        return res.status(400)
        .json({success:false,errors:'Existing user found with same email address'});
    }

    const cart = {};
    for (let i = 0; i < 300; i++)
        cart [i]=0;  

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save ();

    const data = { user: { id:user.id } };

    const token = jwt.sign ( data, JWT_SECRET );

    res.json({ success: true, token});
}catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ success: false, error: 'Signup failed' });
  }
});

//creating Endpoint for user login
app.post('/login',async(req,res) => {
    const user = await Users.findOne({email: req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user:{ id:user.id } };
            const token = jwt.sign(data, JWT_SECRET);
            res.json({success:true, token });  
        } else{
            res.json({ success: false, errors: 'Invalid Password '});
        }        
    } else{
        res.json({success: false, errors:'Invalid Email Id'});
    }
});


//creating middelware to fetch user
const fetchUser = async (req, res, next)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({errors: 'Please athenticate using a valid token'})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
       res.status(401).send({errors: 'Invalid token'}) 
    }
};

//Add to cart
app.post('/addtocart', fetchUser, async(req, res) => {
    console.log('🛒 Added', req.body.itemId);
    const userData = await Users.findOne({ _id:req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findByIdAndUpdate(req.user.id,{cartData: userData.cartData });
    res.send('Added');
});

// Remove from cart
app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log('Removed', req.body.itemId);
    const userData = await Users.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findByIdAndUpdate(req.user.id, { cartData:userData.cartData});
    res.send('Removed');
});

//Get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    const userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
});

//Newcollection data
app.get('/newcollections',async(req,res)=>{
    const products = await Product.find({});
    const newCollection = products.slice(1).slice(-8);
    console.log('NewCollection Fetched');
    res.json(newCollection);
});

//Popular in Women (case-insensitive)
app.get('/popularinwomen',async(req, res) => {
    const products = await Product.find({
        category: { $regex: /^women$/i },
    });
    const popular_in_women = products.slice(0,4);
    console.log('Popular in women fetched');
    res.json(popular_in_women);
})

//Add Newsletter Schema and Endpoint
// ======================
// 📩 Newsletter Schema
// ======================
const Newsletter = mongoose.model('Newsletter', {
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// ======================
// 📬 Newsletter Endpoint
// ======================
app.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/.+\@.+\..+/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: 'Email already subscribed' });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('❌ Subscription Error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later.' });
  }
});

// 🏆 Best Sellers API
app.get('/bestsellers', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ sold: -1 }).limit(20);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch best sellers' });
  }
});

// ======================
// 📦 Orders Schema and Endpoints
// ======================
const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  customer: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  items: { type: Number, default: 1 },
  address: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Order = mongoose.model('Order', OrderSchema);

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Get order by ID
app.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Create new order
app.post('/addorder', async (req, res) => {
  try {
    const { customer, email, status, total, items, address, products } = req.body;

    if (!customer || !email || !address || !total) {
      return res.json({ success: false, message: 'Missing required fields' });
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}`;

    const order = new Order({
      orderId,
      customer,
      email,
      status,
      total,
      items,
      address,
      products,
    });

    await order.save();
    res.json({ success: true, message: 'Order created successfully', orderId });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Update order status
app.post('/updateorder', async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, message: 'Missing orderId or status' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order updated successfully', order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Delete order
app.post('/deleteorder', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.json({ success: false, message: 'OrderId is required' });
    }

    const result = await Order.findOneAndDelete({ orderId });

    if (!result) {
      return res.json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});


// Server Start
app.listen(port, (error) => {
    if (!error){
        console.log(`🚀 Server Running On Port ${port}`);
    }
    else console.log ('❌ Error: ', error);
});