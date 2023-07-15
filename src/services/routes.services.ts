import { Route } from "../interfaces/route.interface"
import RouteModel from "../models/route.model"

const createRoute = async ({ name, pickup, dropOff, distance }: Route) => {
    const response = await RouteModel.create({  name, pickup, dropOff, distance })
    return response
}

export { createRoute }