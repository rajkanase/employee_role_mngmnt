var mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdOn: { type: Number, default: new Date().getTime() }
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);

        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);