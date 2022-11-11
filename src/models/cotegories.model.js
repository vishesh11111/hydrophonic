const mongoose = require("mongoose");

const ContegoriesSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    des: { type: String }
});

module.exports = mongoose.model("categories", ContegoriesSchema);