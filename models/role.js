var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var roleSchema = mongoose.Schema({
    roleName: { type: String, required: true, unique: true },
    roleDescription: { type: String, default: true },
    createdOn: { type: Number, default: new Date().getTime() }
});

module.exports = mongoose.model('Role', roleSchema);