import mongoose from "mongoose";
const Schema = mongoose.Schema;

const model = new Schema({
  name: {type: String, required: true},
  place: {type: String, required: true},
  year: {type: Number, required: false},
  rating: {type: Number, required: false},
})

const mongooseModel = mongoose.model('assessment', model);

export default mongooseModel;