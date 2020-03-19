const mongoose = require("mongoose");

let groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chats: {
        type: Array,
        chats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("group", groupSchema)

// in the schema
    // tech: String,
    // chats: [ this here has user so need to need for extra user],