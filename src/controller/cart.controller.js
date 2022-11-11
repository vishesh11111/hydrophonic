

const express = require("express");
const app = express.Router();
const CartModel = require("../models/cart.model");
const ObjectId = require("mongoose").Types.ObjectId;

app.get("/cart/:id", async (req, res) => {
    try {
        const categoriesId = req.query.categoriId;
        const userId = req.query.userId;
        const productId = req.params.id
        const cartData = await CartModel.aggregate([
            {
                $match: {
                    userId: ObjectId(userId),
                    categoriId: ObjectId(categoriesId),
                    productId: ObjectId(productId)
                }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users"
                }
            },
            {
                $lookup: {
                    from: "product",
                    localField: "productId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $lookup: {
                                from: "categories",
                                localField: "categoriId",
                                foreignField: "_id",
                                as: "categories"
                            }
                        }
                    ],
                    as: "product"
                }
            },

        ])

        res.status(200).json({ status: true, data: cartData });
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
});


app.get("/cart", async (req, res) => {
    try {

        const userId = req.query.userId;
        const cartData = await CartModel.aggregate([
            {
                $match: {
                    userId: ObjectId(userId),
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users"
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            }

        ])


        res.status(200).json({ status: true, data: cartData });
    } catch (error) {
        res.status(500).send({ status: false, error })
    }
});

app.post('/cart', async (req, res) => {
    try {
        const cartdata = await CartModel.create(req.body);
        res.status(200).json({ status: true, data: cartdata });

    } catch (error) {
        res.status(500).send({ status: false, error })
    }
})

app.delete("/cart/:id", async (req, res) => {
    try {
        const cart = await CartModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, data: cart });
    } catch {
        res.status(500).send({ status: false, error })
    }
})



module.exports = app;