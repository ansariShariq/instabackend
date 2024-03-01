const mongoose = require('mongoose')
const USERNAME = 'shariq_ansari'
const PASSWORD = 'Sharique0003'

const DB = 'socialmedia'
const connect = ()=>{
     mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ivbgmfj.mongodb.net/${DB}?retryWrites=true&w=majority`)
    console.log('connected With mongoose')
}

module.exports = connect

 