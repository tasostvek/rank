const mongoose = require('mongoose');

//DB schema
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name: String,
    email: String,
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