import { Order } from "@/types/Order";
import mongoose, { Schema, Document } from "mongoose";

enum OrderStatus {
    Processing = "Processing",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}

enum PaymentMethod {
    CreditCard = "Credit Card",
    DebitCard = "Debit Card",
    UPI = "UPI",
    CashOnDelivery = "Cash on Delivery"
}

enum PaymentStatus {
    Pending = "Pending",
    Completed = "Completed",
    Failed = "Failed"
}

interface OrderDocument extends Document, Order {}

const OrderSchema: Schema<OrderDocument> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    order: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    addressInfo: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethod),
        required: true
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        required: true
    }
}, { timestamps: true });

const OrderModel = (mongoose.models.Order as mongoose.Model<OrderDocument>) ||
    mongoose.model<OrderDocument>("Order", OrderSchema);

export default OrderModel;