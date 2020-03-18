const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    msg: String,
    // add username
}, {
    timestamps: {createdAt: true, updatedAt: false},

}
)

module.exports = mongoose.model("Message", chatSchema)