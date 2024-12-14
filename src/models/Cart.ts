import mongoose, { Schema, Document } from "mongoose";


export interface Cart extends Document {
    user: mongoose.Types.ObjectId,
    products: mongoose.Types.ObjectId[]
    createdAt: Date,
};

export const CartSchema: Schema<Cart> = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const CartModel = (mongoose.models.Cart as mongoose.Model<Cart>) || mongoose.model<Cart>("Cart",CartSchema);
export default CartModel;