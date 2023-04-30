const express = require("express");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser");
const fileUpload = require("express-fileupload");

const authentication = require("./middlewares/auth");
const profileController = require("./controllers/profileController");
const otpController = require("./controllers/otpController");
const geoController = require("./controllers/geoController");
const uploadImage = require("./middlewares/imageUpload");

require('dotenv').config();

app.set('trust proxy',true);
app.use(cookies());


app.use(fileUpload({
    limits: {
        fileSize: 5000000
    },
    abortOnLimit: true
 }));

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    
}))

app.use(cors({
    origin: '*'
}));

app.use(express.static('public'));



const PORT = process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.log("Listening to port ...",PORT);
})

app.get("/", (req, res) => {
    return res.redirect("index.html");
});

app.get("/editProfile", profileController.profilePage);
app.post("/editProfile",[authentication,uploadImage], profileController.profileUpdate);

app.post("/getotp",otpController.getOtp);

app.post("/verifyotp",otpController.verifyOtp);

app.post('/getGeo',geoController.getGeoDetails);


module.exports = app;
