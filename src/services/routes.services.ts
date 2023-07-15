import { RouteRequest } from "../interfaces/routeRequest.interface"
import RouteModel from "../models/route.model"
import { getCoordinates, getDistance } from "./googlemaps.service"
import { findPoint } from "./points.service"

const createRoute = async ({ name, from, to }: RouteRequest) => {
    const origin = await createCoordinates(from)
    const destination = await createCoordinates(to)
    const distance = await createDistance(from, to)

    const response = await RouteModel.create({ name, 
        pickup: {
            point: from,
            coordinates: origin
        }, 
        dropOff: {
            point: to,
            coordinates: destination
        }, 
        distance
    })
    return response
}

const findRoutes = async () => {
    const response = await RouteModel.find({})
    return response
}

const findRoute = async (id: string) => {
    const response = await RouteModel.findOne({_id: id})
    return response
}


// Metodos privados
const createCoordinates = async (id: string) => {
    const point = await findPoint(id)
    if (!point) return "POINT_NOT_FOUND"
    
    const placeId = point.location.placeId
    const coordinates = await getCoordinates(placeId)
    return coordinates
}

const createDistance = async (from: string, to: string) => {
    const fromPoint = await findPoint(from)
    const toPoint = await findPoint(to)
    if (!fromPoint || !toPoint) return "POINTS_NOT_FOUNDED"

    const origin = fromPoint.location.placeId
    const destination = toPoint.location.placeId
    const distance = await getDistance(origin, destination)
    return distance
}

export { createRoute, findRoute, findRoutes }