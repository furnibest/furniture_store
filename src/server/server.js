const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Determine uploads directory based on environment
const isProduction = process.env.NODE_ENV === 'production';
const uploadsDir = isProduction 
  ? path.join('/tmp/uploads') // Use /tmp for Vercel (serverless)
  : path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Multer setup for image upload
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

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start server
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

// For Vercel serverless deployment
module.exports = app; 