import { Route } from "./route.interface"
import { Truck } from "./truck.interface"

export interface Order {
    type: Type,
    description: string
    route: Route,
    truck: Truck,
    status: Status
}

export enum Type {
    GENERAL = "General",
    BULK = "Bulk",
    HAZARDOUS = "Hazardous",
    LIQUID = "Liquid"
}

export enum Status {
    PENDING = "Pending",
    IN_PROGRESS = "Progress",
    FINISHED = "Finished",
    CANCELLED = "Cancelled"
}