const mongoose = require("mongoose");
const validator = require('validator');

 const EmpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 2
    },
}, {
    timestamps: true
})

 module.exports  = mongoose.model('Employeer',EmpSchema)