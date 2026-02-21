import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    unit: string;
    image: string;
    category: string;
    isTopProduct: boolean;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    isTopProduct: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
