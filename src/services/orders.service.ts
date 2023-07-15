import { Order, Status } from "../interfaces/order.interface"
import OrderModel from "../models/order.model"
import TruckModel from "../models/truck.model"
import { capitalizeFirstLetter } from "../utils/capitalize.handler"
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
    const response = await OrderModel.findOne({ _id: id })
    const order = await destructurateOrder(response)
    return order
}


const updateOrderStatus = async (id: string, newStatus: string) => {
    const status = capitalizeFirstLetter(newStatus)
    if (!Object.values(Status).includes(status as Status)) return "INVALID_STATUS"

    const order = await findOrder(id)
    if (!order) return "ORDER_NOT_FOUND"

    if (status !== Status.PENDING && !order.route.isAssigned) {
        // actualizar isAssigned a true de la ruta mediante el service updateRoute
    } else if (status === Status.PENDING && order.route.isAssigned) {
        // actualizar isAssigned a false de la ruta mediante el service udpateRoute
    }

    const response = await OrderModel.findOneAndUpdate({ _id: id }, { status }, { new: true })
    return response
}

const updateOrder = async (id: string, { type, description, route, truck }: Order) => {
    const order = await OrderModel.findOne({ _id: id })
    if (!order) return "ORDER_NOT_FOUND"

    if (order.status !== Status.PENDING) return "CANNOT_MODIFY_THIS_ORDER_BECAUSE_IT_WAS_CONFIRMED"

    const response = await OrderModel.findOneAndUpdate({ _id: id }, { type, description, route, truck }, { new: true })
    return response
}

// Método privado
const destructurateOrder = async (order: any) => {
    const routeObject = await findRoute(order.route)
    const truckObject = await TruckModel.findOne({ _id: order.truck })

    const orderObject = {
        id: order._id,
        type: order.type,
        description: order.description,
        route: routeObject,
        truck: truckObject,
        status: order.status
    }

    return orderObject
}

export { createOrder, findOrders, findOrder, updateOrderStatus, updateOrder } 