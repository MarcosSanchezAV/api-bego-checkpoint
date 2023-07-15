import { Request, Response } from "express";
import { getCoordinates } from "../services/googlemaps.service";

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

export { testGetCoordinates }