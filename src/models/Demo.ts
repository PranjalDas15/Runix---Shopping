import mongoose, { Schema, Document } from "mongoose";


export interface Demo extends Document {
    products: string
};

export const DemoSchema: Schema<Demo> = new Schema ({
    products: {
        type: String
    }
},
{
    timestamps: true
});


const DemoModel = (mongoose.models.Demo as mongoose.Model<Demo>) || mongoose.model<Demo>("Demo",DemoSchema);
export default DemoModel;