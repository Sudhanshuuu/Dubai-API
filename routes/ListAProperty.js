const express = require('express');
const ListAProperty = require('../models/ListAProperty');
const router = express.Router();

router.get("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        const listAProperty = await ListAProperty.findOne({ _id: id });
        if (!listAProperty) {
            return res.status(404).json({ message: "ListAProperty not found" });
        }
        return res.status(200).json(listAProperty);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.put("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        let listAProperty = await ListAProperty.findOne({ _id: id });
        if (!listAProperty) {
            return res.status(404).json({ message: "ListAProperty not found" });
        }

        Object.keys(req.body).forEach(key => {
            listAProperty[key] = req.body[key];
        });

        await listAProperty.save();
        return res.status(200).json(listAProperty);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.delete("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        const listAProperty = await ListAProperty.findOneAndDelete({ _id: id });
        return res.status(200).json(listAProperty);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.get("/", async (req, res) => {

    try {
        const listAProperty = await ListAProperty.find({});
        return res.status(200).json(listAProperty);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/', async (req, res) => {
    try {

        const newListAProperty = new ListAProperty({ ...req.body, status: 'pending' });

        await newListAProperty.save();
        return res.status(200).json(newListAProperty);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;