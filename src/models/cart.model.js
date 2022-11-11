

const mongoose = require("mongoose");

const ContegoriesSchema = new mongoose.Schema({
    categoriId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("cart", ContegoriesSchema);