const fs = require("fs");

function base64_encode(file) {
    let path = "public/images/"+file;
    var bitmap = fs.readFileSync(path);
    let res = "data:image/jpeg;base64," + new Buffer(bitmap).toString('base64');
    return res;

}

module.exports = base64_encode;