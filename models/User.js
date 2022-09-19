const mongoose = require("mongoose");
const UserSchma = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        image: {
            data: Buffer,
            contentType: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        }
    }
);

const UserModel = mongoose.model("user", UserSchma);
module.exports = UserModel;