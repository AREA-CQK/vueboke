const setting = require('../setting');
const mongoose = require('mongoose');

mongoose.connect(setting.dburl);

const userSchema = new mongoose.Schema({
    name : String,
    password : String
})

const articleSchema = new mongoose.Schema({
    title : String,
    date : String,
    content : String,
    gist : String
})

const Models = {
    User : mongoose.model('User',userSchema),
    Article : mongoose.model('Article',articleSchema)
}

module.exports = Models;