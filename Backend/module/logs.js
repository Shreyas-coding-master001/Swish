const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, trim: true, ref: "users"},
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    type: {type: String, required: true, trim: true}
},{timestamps: true })

module.exports = mongoose.model("logs",logsSchema);