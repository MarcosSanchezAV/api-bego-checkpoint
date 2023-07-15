import { Order } from "../interfaces/order.interface"
import OrderModel from "../models/order.model"

const createOrder = async ({ type, description, route, truck }: Order) => {
    const response = await OrderModel.create({ type, description, route, truck })
    return response
}

export { createOrder } 