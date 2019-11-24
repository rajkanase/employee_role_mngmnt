const Employee = require("../models/employee");
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
module.exports = () => {
    var employee = {};

    employee.createEmployee = (req, res) => {
        var employee = new Employee(req.body);
        let empRoles = [];
        empRoles = req.body.employeeRoles.split(",");
        employee.employeeRoles = empRoles;
        let imagePath = req.file.path;
        employee.employeeProfile = imagePath;
        employee.save((err, employee) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else if (!employee) {
                res.status(500).json({ success: false, message: 'employee not created.' });
            } else {
                res.status(200).json({ success: true, message: 'employee created.' });
            }
        });
    }

    employee.updateEmployee = (req, res) => {
        console.log(req.body);
        console.log(req.file);
        Employee.findById(req.body._id, (err, employee) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else if (employee) {
                console.log(req.body.employeeRoles);
                let empRoles = [];
                empRoles = req.body.employeeRoles.split(",");
                console.log(empRoles);

                employee.employeeName = req.body.employeeName;
                employee.employeeEmail = req.body.employeeEmail;
                employee.employeeDOB = req.body.employeeDOB;
                employee.employeeRoles = empRoles;
                employee.employeeMobile = req.body.employeeMobile;
                employee.employeeJobType = req.body.employeeJobType;
                if (req.file) {
                    let imagePath = req.file.path;
                    employee.employeeProfile = imagePath;
                }
                employee.save((err, upEmp) => {
                    if (err) {
                        res.status(500).json({ success: false, message: err });
                    } else {
                        res.status(200).json({ success: true, message: 'Employee updated.' });
                    }
                });
            }
        })
    }

    employee.getEmployees = (req, res) => {
        Employee.find({}, (err, employees) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else {
                res.status(200).json({ success: true, data: employees });
            }
        });
    }

    employee.getSingleEmployee = (req, res) => {
        Employee.findById(req.params.id, (err, employee) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else {
                res.status(200).json({ success: true, data: employee });
            }
        })
    }

    return employee;
};
