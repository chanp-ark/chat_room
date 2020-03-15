const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: String,
    name: String,
    group: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema)