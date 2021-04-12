const mongoose = require('mongoose')

const user = process.env.MONGO_ADMIN_USER
const pwd = process.env.MONGO_ADMIN_PWD
const url = process.env.MONGO_URL
const cloudConnection = `mongodb+srv://${user}:${pwd}@${url}`;
const connectionString = `mongodb://${user}:${pwd}@${url}`

mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});


mongoose
    .connect(cloudConnection, { useNewUrlParser: true })
    .then (e => {
        console.log("Success")
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })
    
const db = mongoose.connection
db.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
module.exports = db
