import { Order } from "../interfaces/order.interface"
import OrderModel from "../models/order.model"
import RouteModel from "../models/route.model"
import TruckModel from "../models/truck.model"
import { findRoute } from "./routes.services"

const createOrder = async ({ type, description, route, truck }: Order) => {
    const response = await OrderModel.create({ type, description, route, truck })
    return response
}

const findOrders = async () => {
    const response = await OrderModel.find({})
    const orders = await Promise.all(response.map(order => destructurateOrder(order)))
    return orders
}

const findOrder = async (id: string) => {
    const response = await OrderModel.findOne({ _id: id})
    const order = await destructurateOrder(response)
    return order
}

const destructurateOrder = async (order: any) => {
    const routeObject = await findRoute(order.route)
    const truckObject = await TruckModel.findOne({_id: order.truck})

    const orderObject = {
        type: order.type,
        description: order.description,
        route: routeObject,
        truck: truckObject
    }

    return orderObject
}

export { createOrder, findOrders, findOrder } 