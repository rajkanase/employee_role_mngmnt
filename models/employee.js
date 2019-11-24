
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var employeeSchema = mongoose.Schema({
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true, unique: true, lowercase: true },
    employeeDOB: { type: Date, required: true },
    employeeProfile: { type: String },
    employeeMobile: { type: Number, required: true },
    employeeRoles: [{ type: String }],
    jobType: { type: String, required: true },
    createdOn: { type: Number, default: new Date().getTime() }
});

module.exports = mongoose.model('Employee', employeeSchema);