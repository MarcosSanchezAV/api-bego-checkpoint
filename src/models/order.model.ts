import { Schema, Types, model } from "mongoose";
import { Order, Status, Type } from "../interfaces/order.interface";

const OrderSchema = new Schema<Order>({
    type: { type: String, enum: Object.values(Type), required: true },
    description: { type: String, required: true },
    route: { type: Types.ObjectId, required: true},
    truck: { type: Types.ObjectId, required: true},
    status: { type: String, enum: Object.values(Status), default: Status.PENDING }
})

const OrderModel = model('orders', OrderSchema)
export default OrderModel