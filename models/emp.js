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
    lecId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 2
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', //referring to the model name of the user
    }
}, {
    timestamps: true
})

 module.exports  = mongoose.model('Employeer',EmpSchema)