const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content: String,
    name: String,
}, {
    timestamps: {createdAt: true, updatedAt: false},

}
)

module.exports = mongoose.model("Message", chatSchema)