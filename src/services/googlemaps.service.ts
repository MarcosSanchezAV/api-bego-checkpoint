import "dotenv/config"
import axios from "axios"

const apiKey = process.env.API_KEY

const getCoordinates = async (placeId: string) => {
    const googleUrl = process.env.API_GOOGLE_MAPS_URL_COORDINATES

    const url = `${googleUrl}?place_id=${placeId}&key=${apiKey}`
    const response = await axios.get(url)
    const { data } = response

    if (data.status === 'OK') {
        const location = data.results[0].geometry.location
        const { lat, lng } = location
        return { lat, lng }
    } else {
        throw new Error('LOCATION_NOT_FOUNDED')
    }
}

const getDistance = async (origin: string, destination: string) => {
    const googleUrl = process.env.API_GOOGLE_MAPS_URL_DISTANCE

    const url = `${googleUrl}?origins=place_id:${origin}&destinations=place_id:${destination}&key=${apiKey}`
    const response = await axios.get(url)
    const { data } = response

    if (data.status === 'OK') {
        const distance = data.rows[0].elements[0].distance.value / 1000
        return distance
    } else {
        throw new Error('CANNOT_GET_DISTANCE')
    }
}


export { getCoordinates, getDistance }