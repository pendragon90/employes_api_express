import mongoose from "mongoose";

const {Schema} = mongoose

const PositionSchema = new Schema({
    name: String,
})

const Position = mongoose.model('Position', PositionSchema)

export default Position