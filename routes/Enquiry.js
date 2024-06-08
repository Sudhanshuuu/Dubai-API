const express = require('express');
const Enquiry = require('../models/Enquiry');
const router = express.Router();

router.get("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        const enquiry = await Enquiry.findOne({ _id: id });
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
        return res.status(200).json(enquiry);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.get("/", async (req, res) => {

    try {
        const enquiry = await Enquiry.find({});
        return res.status(200).json(enquiry);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.put("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        let enquiry = await Enquiry.findOne({ _id: id });
        if (!enquiry) {
            return res.status(404).json({ message: "enquiry not found" });
        }

        Object.keys(req.body).forEach(key => {
            enquiry[key] = req.body[key];
        });

        await enquiry.save();
        return res.status(200).json(enquiry);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.delete("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        const enquiry = await Enquiry.findOneAndDelete({ _id: id });
        return res.status(200).json(enquiry);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/', async (req, res) => {
    try {

        const newEnquiry = new Enquiry({ ...req.body, status: 'pending' });

        await newEnquiry.save();
        return res.status(200).json(newEnquiry);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;