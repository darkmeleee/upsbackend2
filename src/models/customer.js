const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const customerSchema = new Schema({
    customerName: String,
    customerEmail: String,
    customerRegister: Number
});

module.exports = mongoose.model('Customer', customerSchema, 'customers');