import PointModel from "../models/point.model"

const findPoints = async () => {
    const response = await PointModel.find({})
    return response
}

const findPoint = async (id: string) => {
    const response = await PointModel.findOne({_id: id})
    return response
}

export { findPoints, findPoint }