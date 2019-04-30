const mongoose = require("mongoose")
const { Schema } = mongoose
const { SECRET } = require("../config/keys")
const { isEmail } = require("validator")
const jwt = require("jsonwebtoken")
const _ = require("lodash")
const bcrypt = require("bcryptjs")

const user = new Schema({
  
    emailManagerInfo: {
        webToken: String,
        isManger: { type: Boolean, default: false },
      
    },
    emailManger:String,
    
    email: {
        type: String,
        required: true,
        trim: true,
        webToken: String,
        minlength: 1,
        unique: true,
        teamMangerEmail: String,
        validate: {
            validator: (value) => {
                return isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})
user.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, ["_id", "email","emailMangerInfo","member"])
}

user.statics.findByCredential = function (email, password) {
    let User = this
    return User.findOne({ email }).then(user => {

        if (!user) {
            return Promise.reject()
        }
        else {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve(user)
                    }
                    else {
                        reject(err)
                    }
                })
            })
        }
    })
}
user.statics.findByToken = function (token) {

    ///static is on the model level
    let User = this
    var decode
    try {
        decode = jwt.verify(token, SECRET)
    } catch (error) {
        // return new Promise((resolve, reject) => {
        //     reject("Not Valid")
        // })
        return Promise.reject("Not valid")
    }
    return User.findOne({
        '_id': decode._id,
        'tokens.token': token,
        'tokens.access': "auth"
    })
}
user.methods.generateAuthToken = function () {

    var user = this
    var access = "auth"
    var token = jwt.sign({ _id: user._id.toHexString(), access }, SECRET).toString()
    user.tokens = user.tokens.concat([{ access, token }])
    return user.save().then(() => {
        return token
    })
}
user.methods.removeToken = function (token) {
    var user = this
    return user.updateOne({
        $unset: {
            tokens: { token: undefined }
        }
    })
}
user.pre('save', function (next) {
    var user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})
mongoose.model("User", user)