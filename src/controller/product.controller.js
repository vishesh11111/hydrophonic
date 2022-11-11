
const express = require("express");
const app = express.Router();
const ProductModel = require("../models/product.model");
const ObjectId = require("mongoose").Types.ObjectId;

app.get("/products", async (req, res) => {
    try {
        const categoriesId = req.query.categoriId
        if (!categoriesId) {
            const categ = await ProductModel.find();
            res.status(200).json({ status: true, categories: categ });
        } else {
            console.log(categoriesId)
            const categ = await ProductModel.aggregate([
                [
                    {
                        $match: {
                            categoriId: categoriesId
                        }
                    }
                ]
            ]);
            res.status(200).json({ status: true, categories: categ });
        }
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
});


app.get("/products/:id", async (req, res) => {
    try {
        const categoriesId = req.query.categoriId;
        const Id = req.params.id;
        const categ = await ProductModel.aggregate([
            {
                $match: {
                    _id: ObjectId(Id)
                }
            }
        ]);
        res.status(200).json({ status: true, categories: categ });
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
});




module.exports = app;