import { RouteRequest } from "../interfaces/routeRequest.interface"
import PointModel from "../models/point.model"
import RouteModel from "../models/route.model"
import { getCoordinates, getDistance } from "./googlemaps.service"
import { findPoint } from "./points.service"


/**
 * 
 * @param from id del punto de partida
 * @param to id del punto de llegada
 * @returns la ruta creada con el nombre, punto de partida y punto de llegada
 */
const createRoute = async ({ name, from, to }: RouteRequest) => {
    const isExist = await validateRoute(from, to)
    if (isExist) return "CANNOT_CREATE_SAME_ROUTE_TWICE"

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
    const routes = await Promise.all(response.map(route => destructurateRoute(route)))
    return routes
}

const findRoute = async (id: string) => {
    const response = await RouteModel.findOne({_id: id})
    const route = await destructurateRoute(response)
    return route
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

const destructurateRoute = async (route: any) => {
    const pickupPoint = await PointModel.findOne({ _id: route.pickup.point})
    const dropOffPoint = await PointModel.findOne({ _id: route.dropOff.point})

    const routeObject = {
        name: route.name,
        pickUp: pickupPoint,
        dropOffPoint: dropOffPoint,
        distance: route.distance,
        isAssigned: route.isAssigned
    }

    return routeObject
}

const validateRoute = async (from: string, to: string) => {
    const route = await RouteModel.findOne({
        'pickup.point': from,
        'dropOff.point': to
    })
    return route
}

export { createRoute, findRoute, findRoutes }