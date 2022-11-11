const mongoose = require("mongoose");

const ContegoriesSchema = new mongoose.Schema({
    categoriId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    name: { type: String },
    image: { type: String },
    des: { type: String },
    price: { type: String },
});

module.exports = mongoose.model("product", ContegoriesSchema);