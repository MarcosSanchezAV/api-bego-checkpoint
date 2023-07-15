import { Request, Response } from "express";
import { getCoordinates, getDistance } from "../services/googlemaps.service";

const testGetCoordinates = async ({ body }: Request, res: Response) => {
    const { placeId } = body
    try {
        const { lat, lng } = await getCoordinates(placeId)
        res.send(`Latitude: ${lat}, Longitude: ${lng}`)
    } catch(e) {
        res.status(500)
        res.send(e)
    }
}

const testGetDistance = async ({ body }: Request, res: Response) => {
    const { origin, destination } = body
    try {
        const distance = await getDistance(origin, destination)
        res.send(`Distance is: ${distance} km`)
    } catch(e) {
        res.status(500)
        res.send(e)
    }
}

export { testGetCoordinates, testGetDistance }