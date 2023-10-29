const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const trainSchema = new Schema({
        trainType: String,
        trainPrice: Number,
        gymID: String
});

module.exports = mongoose.model('Training', trainSchema, 'trainings');