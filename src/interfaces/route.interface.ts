import { Location } from "./location.interface"

export interface Route {
    name: string
    pickup: Location
    dropOff: Location
    distance: number
    isAssigned: boolean
}