let bcrypt = require("bcrypt-nodejs");
let {Schema} = require("mongoose");
let userSchema = Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  displayName: String,
  bio: String
});

const SALT_FACTOR = 10;

userSchema.methods.name = () => {
  return this.displayName || this.username;
};

let noop = () => {}; // for use with the bcrypt module.
