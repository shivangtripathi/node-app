const fs = require('fs');
const mime = require('mime');
const uuid = require('uuid');



const uploadImage = async (req,res,next) => {
    var matches = req.body.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};
     
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    }
     
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = uuid.v4().toString()+"." + extension;
    try {
        fs.writeFileSync("./public/images/"+fileName, imageBuffer, 'utf8');
        req.body.image_url = fileName;
        next();
    } catch (e) {
        console.log("Error uploading file : "+e);
        next();
    }
}

module.exports = uploadImage;