const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// lowdb setup (db.json)
const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

(async () => {
  await db.read();
  db.data = db.data || { products: [] };
  await db.write();
})();

// uploads folder
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// serve uploads statically
app.use("/uploads", express.static(uploadDir));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${nanoid(6)}${ext}`);
  },
});
const upload = multer({ storage });

// POST /upload -> image upload
app.post("/upload", upload.single("product"), async (req, res) => {
  try {
    if (!req.file) return res.json({ success: false, message: "No file" });
    const image_url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ success: true, image_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Upload error" });
  }
});

// POST /addproduct
app.post("/addproduct", async (req, res) => {
  try {
    await db.read();
    const product = req.body;
    product.id = product.id || nanoid(8);
    db.data.products.push(product);
    await db.write();
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// GET /allproducts
app.get("/allproducts", async (req, res) => {
  try {
    await db.read();
    res.json(db.data.products || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// POST /removeproduct
app.post("/removeproduct", async (req, res) => {
  try {
    const { id } = req.body;
    await db.read();
    const before = db.data.products.length;
    db.data.products = db.data.products.filter((p) => p.id !== id);
    await db.write();
    res.json({ success: db.data.products.length < before });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// POST /updateproduct
app.post("/updateproduct", async (req, res) => {
  try {
    const payload = req.body; // { id, name, new_price, old_price, category, image }
    await db.read();
    db.data.products = db.data.products.map((p) => (p.id === payload.id ? { ...p, ...payload } : p));
    await db.write();
    const product = db.data.products.find((p) => p.id === payload.id);
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
