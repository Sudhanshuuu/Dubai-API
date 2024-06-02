const express = require('express');
const PORT = 3005;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/Authetication');
const enquiryRoute = require('./routes/Enquiry');
const contactRoute = require('./routes/Contact');
const listAPropertyRoute = require('./routes/ListAProperty');
const realEstateRoute = require("./routes/RealEstate");
const upload = require('./middleware/Upload');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.use("/", userRoute);
app.use("/enquiry", enquiryRoute);
app.use("/contact", contactRoute);
app.use("/listAProperty", listAPropertyRoute);
app.use("/realEstate", upload.array('images'), realEstateRoute);

app.get("/", (req, res) => {
    res.send("It's on");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});