
const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb+srv://vishesh121:89824249@cluster0.xttxzje.mongodb.net/?retryWrites=true&w=majority");
}

module.exports = connect;