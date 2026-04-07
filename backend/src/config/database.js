const mongoose = require("mongoose")
const dns = require("dns");

async function connectToDB() {
    try {
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB
