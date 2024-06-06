const express = require('express');
const RealEstate = require('../models/RealEstate');
const router = express.Router();

// Define your routes

router.get("/", async (req, res) => {

    let listAProperty;
    
    try {
        listAProperty = await RealEstate.find(req.query);
        return res.status(200).json(listAProperty);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/', async (req, res) => {

    try {
        const realEstate = new RealEstate(req.body);
        if (req.files) {
            req.files.forEach(file => {
                realEstate.images.push(file.path);
            });
        }
        await realEstate.save();
        return res.status(200).json(realEstate);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});


router.put('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let realEstate = await RealEstate.findOne({ _id: id });
        for (const key in req.body) {
            realEstate[key] = req.body[key];
        }
        if (req.files) {
            realEstate.images.splice(0, realEstate.images.length);
            req.files.forEach(file => {
                realEstate.images.push(file.path);
            });
        }
        await realEstate.save();
        return res.status(200).json(realEstate);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let realEstate = await RealEstate.findOneAndDelete({ _id: id });
        return res.status(200).json(realEstate);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let realEstate = await RealEstate.findOne({ _id: id });
        return res.status(200).json(realEstate);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});


module.exports = router;
