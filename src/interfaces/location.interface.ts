import { Coordinates } from "./coordinates.interface";
import { Point } from "./point.interface";

export interface Location {
    point: Point,
    coordinates: Coordinates
}