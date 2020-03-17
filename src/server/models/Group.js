const mongoose = require("mongoose");

let groupSchema = new mongoose.Schema({
    name: String,
    tech: String,
    chats: []
},{
    timestamps: true
})

module.exports = mongoose.model("Group", groupSchema)