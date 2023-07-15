import { Schema, Types, model} from "mongoose";
import { Route } from "../interfaces/route.interface";

const RouteSchema = new Schema<Route>({
    name: { type: String, required: true },
    pickup: {
        point: { type: Types.ObjectId, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }
    },
    dropOff: {
        point: { type: Types.ObjectId, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }
    },
    distance: { type: Number, required: true },
    isAssigned: { type: Boolean, default: false }
})

const RouteModel = model('routes', RouteSchema)
export default RouteModel