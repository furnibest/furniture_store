const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Inisialisasi Prisma Client
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Debug middleware - log semua request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Tentukan direktori uploads berdasarkan environment
const isProduction = process.env.NODE_ENV === 'production';
const uploadsDir = isProduction 
  ? path.join('/tmp/uploads') // Gunakan /tmp untuk Vercel (serverless)
  : path.join(__dirname, 'src/server/uploads');

// Pastikan direktori uploads ada
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    serverPath: __dirname,
    clientBuildPath: undefined, // Hapus clientBuildPath karena tidak digunakan
    nodeVersion: process.version
  });
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST new product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let featured = req.body.featured;
    featured = featured === '1' || featured === 1 || featured === true || featured === 'true';
    
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        featured
      }
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let featured = req.body.featured;
    featured = featured === '1' || featured === 1 || featured === true || featured === 'true';
    
    const data = {
      name,
      description,
      price: parseFloat(price),
      category,
      featured
    };
    
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data
    });
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server untuk pengembangan lokal
if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Untuk deployment serverless di Vercel
module.exports = app; 