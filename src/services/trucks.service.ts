import TruckModel from "../models/truck.model"

const findTrucks = async () => {
    const response = await TruckModel.find({})
    return response
}

const findTruck = async (id: string) => {
    const response = await TruckModel.findOne({_id: id})
    return response
}

export { findTrucks, findTruck }