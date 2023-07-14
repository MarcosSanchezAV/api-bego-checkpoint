import { Schema, model } from "mongoose";
import { Truck } from "../interfaces/truck.interface";

const TruckSchema: Schema = new Schema<Truck>({
    model: { type: String },
    make: { type: String },
    year: { type: Number },
    color: { type: String },
    transportWeight: { type: Number },
    created_at: { type: Number }
})

const TruckModel = model('trucks', TruckSchema)
export default TruckModel