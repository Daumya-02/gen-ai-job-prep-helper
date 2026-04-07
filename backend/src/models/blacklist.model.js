const mongoose = require("mongoose")

const TokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in the blacklist"]
    }
}, {
    timestamps: true
}
)

const tokenBlacklistModel = mongoose.model("BlacklistToken", TokenBlacklistSchema)

module.exports = tokenBlacklistModel