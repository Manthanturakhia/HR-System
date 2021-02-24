import mongoose from "mongoose"
const PointsSchema = mongoose.Schema({
    username: {type: String, required: true},
    attendance :{type: Number, min: 1, max :5},
    late_coming :{type: Number, min: -5, max :0},
    reason :{type: String},
    behavior :{type: Number, min: 1, max :5},
    work :{type: Number, min: 1, max :5},
    culture :{type: Number, min: 1, max :5}
})



export default mongoose.model('Point', PointsSchema)