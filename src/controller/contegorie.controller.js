
const express = require("express");
const app = express.Router();
const CategoriModel = require("../models/cotegories.model");

app.get("/categories", async (req, res) => {
    try {
        const categ = await CategoriModel.find().lean().exec();
        res.status(200).json({ status: true, categories: categ });
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
});



module.exports = app;