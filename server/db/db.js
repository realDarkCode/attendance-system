const mongoose = require("mongoose");

function connectDB(connectionUri) {
    return mongoose.connect(connectionUri);
}

module.exports = connectDB;