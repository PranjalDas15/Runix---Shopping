    import mongoose, { Schema, Document } from "mongoose";


    export interface Order extends Document {
        user: mongoose.Types.ObjectId,
        cartProducts: mongoose.Types.ObjectId[],
        totalPrice: Number,
        paymentMethod: string,
        paymentStatus: string,
        orderStatus: string
        createdAt: Date,
        updatedAt: Date,
    };

    export const OrderSchema: Schema<Order> = new Schema ({
        user: {
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true
        },
        cartProducts: [{
            type: mongoose.Types.ObjectId,
            ref: "Cart",
            required: true
        }],
        totalPrice: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            required: true,
            default: "Pending",
            enum: ["Pending", "Cancelled","Success","Cash on Delivery"]
        },
        orderStatus: {
            type: String,
            required: true,
            default: "Pending",
            enum: ["Pending", "Cancelled", "Processing", "InTransit", "Delivered", "Error"]
        }
    },{ timestamps: true, });


    const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) ||
    mongoose.model<Order>("Order", OrderSchema);

    export default OrderModel;