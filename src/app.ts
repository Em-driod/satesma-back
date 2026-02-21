import express from 'express';
import cors from 'cors';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',           // Local development
    'http://localhost:5173',           // Vite default port
    /^https:\/\/.*\.onrender\.com$/,   // Allow all Render domains
    /^https:\/\/.*\.vercel\.app$/,     // Allow all Vercel domains
    'https://satesma-front.onrender.com', // Your frontend on Render
    'https://satesma-front.vercel.app',   // Your frontend on Vercel
    'https://your-frontend-domain.com'   // Your custom domain (if any)
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

import productRoutes from './routes/productRoutes';
import adminRoutes from './routes/adminRoutes';

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;
