import "dotenv/config"
import axios from "axios"

const getCoordinates = async (placeId: string) => {
    const apiKey = process.env.API_KEY
    const googleUrl = process.env.API_GOOGLE_MAPS_URL

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

export { getCoordinates }