const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

router.get("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        const contact = await Contact.findOne({ _id: id });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        return res.status(200).json(contact);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.get("/", async (req, res) => {

    try {
        const contact = await Contact.find({});
        return res.status(200).json(contact);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact({ ...req.body, status: 'pending' });

        await newContact.save();
        return res.status(200).json(newContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;