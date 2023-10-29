const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gymSchema = new Schema({
    gymName: String,
    gymAdmin: String,
    gymPhone: String,
    gymFreeSpace: Number
});

module.exports = mongoose.model('Gym', gymSchema, "gyms");
