import { Schema, Types, model, Model } from "mongoose";
import { Point } from "../interfaces/point.interface";

const PointSchema: Schema = new Schema<Point>(
    {
        location: {
            name: { type: String, required: true },
            placeId: { type: String, required: true }
          }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const PointModel = model('points', PointSchema)
export default PointModel