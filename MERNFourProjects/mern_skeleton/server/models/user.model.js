import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required"
    },
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, 'Please fill in a valid email address'],
        required: "Email is required"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String
});

UserSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema
    .virtual("retypePassword")
    .set(function (retypePassword) {
        this._retypePassword = retypePassword;
    })
    .get(function () {
        return this._retypePassword;
    });

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) {
            return '';
        }
        try {
            return require('crypto')
                    .createHmac('sha256', this.salt)
                    .update(password)
                    .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

UserSchema.path('hashed_password').validate(function (v) {
    let password_pattern = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%&!?*&]).{8,}$/;
    if (this._password && !password_pattern.test(this._password)) {
        this.invalidate('password', 'Password must contain at least 8 characters, in which there are at least ' +
        '1 lowercase letter, ' + '1 uppercase letter, ' +
        '1 digit and ' + '1 special character.');
    };
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    };
    if (this._password !== this._retypePassword) {
        this.invalidate('password', 'Password checks do not match');
    };
}, null);

export default mongoose.model('User', UserSchema);