import mongoose, { Document, Schema } from 'mongoose';
import { Product } from 'src/domain/entities/products/product.entity';

interface ProductModel extends Product, Document { }

const schema = new Schema<ProductModel>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantityInStock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

export const productSchema = mongoose.model<ProductModel>('Product', schema);
