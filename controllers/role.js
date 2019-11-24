const Role = require("../models/role");
module.exports = () => {
    var role = {};

    role.createRole = (req, res) => {
        var role = new Role(req.body);
        role.save((err, role) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else if (!role) {
                res.status(500).json({ success: false, message: 'role not created.' });
            } else {
                res.status(200).json({ success: true, message: 'role created.' });
            }
        });
    }

    role.updateRole = (req, res) => {
        console.log(req.body);
        Role.findById(req.body._id, (err, role) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else if (role) {
                role.roleName = req.body.roleName;
                role.roleDescription = req.body.roleDescription;
                role.save((err, upRole) => {
                    if (err) {
                        res.status(500).json({ success: false, message: err });
                    } else {
                        res.status(200).json({ success: true, message: 'Role updated.', updatedRole: upRole });
                    }
                });
            }
        })
    }

    role.getRoles = (req, res) => {
        Role.find({}, (err, roles) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else {
                res.status(200).json({ success: true, data: roles });
            }
        });
    }

    role.getSingleRole = (req, res) => {
        Role.findById(req.params.id, (err, role) => {
            if (err) {
                res.status(500).json({ success: false, message: err });
            } else {
                res.status(200).json({ success: true, data: role });
            }
        })
    }

    return role;
};
