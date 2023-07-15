import { Order } from "../interfaces/order.interface"
import OrderModel from "../models/order.model"

const createOrder = async ({ type, description, route, truck }: Order) => {
    const response = await OrderModel.create({ type, description, route, truck })
    return response
}

const findOrders = async () => {
    const response = await OrderModel.find({})
    return response
}

const findOrder = async (id: string) => {
    const response = await OrderModel.findOne({ _id: id})
    return response
}

export { createOrder, findOrders, findOrder } 