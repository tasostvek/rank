const mongoose = require('mongoose');

//DB schema
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name: String,
    make: String,
    model: String,
    year: String,
    rating: Number,
    date: {
        type:String,
        default:Date()
    },
    image: String
});

//Model
const UserAccount = mongoose.model('UserAccount', AccountSchema);

module.exports = UserAccount;