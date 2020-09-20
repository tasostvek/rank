const mongoose = require('mongoose');

//DB schema
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    data: {
        type:String,
        default:Date()
    }
});

//Model
const UserAccount = mongoose.model('UserAccount', AccountSchema);

module.exports = UserAccount;