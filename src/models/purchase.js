const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const purchaseSchema = new Schema({
    trainID: String,
    customerID: String,
    purchaseTrainPrice: Number,
    purchaseIncome: Number
});

module.exports = mongoose.model('Purchase', purchaseSchema, 'purchases');