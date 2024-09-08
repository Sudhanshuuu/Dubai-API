const express = require('express');
const Career = require('../models/Career');
const router = express.Router();

// Define your routes
//career routes

router.get("/", async (req, res) => {


    try {
      let career = await Career.find({});
        return res.status(200).json(career);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/', async (req, res) => {

    try {
        const career = new Career({...req.body, status: 'pending' });
        if (req.file) {
                career.cv = req.file.path;
        }
        await career.save();
        return res.status(200).json(career);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});



router.delete('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let career = await Career.findOneAndDelete({ _id: id });
        return res.status(200).json(career);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});

router.put("/:id", async (req, res) => {

    let { id } = req.params;
    try {
        let career = await Career.findOne({ _id: id });
        if (!career) {
            return res.status(404).json({ message: "enquiry not found" });
        }

        Object.keys(req.body).forEach(key => {
            career[key] = req.body[key];
        });

        await career.save();
        return res.status(200).json(career);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let career = await Career.findOne({ _id: id });
        return res.status(200).json(career);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" })

    }
});


module.exports = router;
