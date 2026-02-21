import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import productRoutes from './routes/productRoutes';
import adminRoutes from './routes/adminRoutes';

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;
