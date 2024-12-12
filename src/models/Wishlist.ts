import mongoose, {Schema, Document} from "mongoose";

export interface Wishlist extends Document {
    user: mongoose.Types.ObjectId;
    products: mongoose.Types.ObjectId[];
    createdAt: Date;  
}

export const WishlistSchema: Schema<Wishlist> = new Schema ({
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
        default: Date.now,
    }
})

const WishlistModel = (mongoose.models.Wishlist as mongoose.Model<Wishlist>) || mongoose.model<Wishlist>("Wishlist", WishlistSchema);

export default WishlistModel;