
const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

const dotenv = require('dotenv');
dotenv.config();


app.use(cors());
app.use(express.json());

const CategoriesController = require("./controller/contegorie.controller");
const { SignUp, SignIn } = require("./controller/user.controller")
const productController = require("./controller/product.controller");
const CartData = require("./controller/cart.controller")

app.use("/hydrophonic", CategoriesController);
app.post("/hydrophonic/signIn", SignIn)
app.post("/hydrophonic/signUp", SignUp)
app.use("/hydrophonic", productController)
app.use("/hydrophonic", CartData)


module.exports = app;