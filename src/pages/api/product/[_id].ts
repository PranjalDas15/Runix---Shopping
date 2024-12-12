import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            await dbConnect();
            const { _id } = req.query;

            if (!_id) {
                return res.status(400).json({ message: "Product id is required" });
            }

            if (!ObjectId.isValid(_id as string)) {
                return res.status(400).json({ message: "Invalid Product id" });
            }

            const product = await ProductModel.findById(new ObjectId(_id as string));

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json({ message: "Success", product });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error", error });
        }
    }
};

export default handler;
