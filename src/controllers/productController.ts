import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, unit, category, isTopProduct, image } = req.body;
        
        const newProduct = new Product({
            name,
            description,
            price,
            unit,
            category,
            isTopProduct,
            image: image || ''
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, unit, category, isTopProduct, image } = req.body;
        let updateData: any = { name, description, price, unit, category, isTopProduct };

        if (image) {
            updateData.image = image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
