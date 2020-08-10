let {genSalt, hash} = require("bcrypt-nodejs");
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

userSchema.pre("save", (done) => { // hashing password before it is saved!
  let user = this;
  if (!user.isModified("password")) {
    done();
  }
  genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {return done(err);}
    hash(user.password, salt, noop, (err, hashedPassword) => {
      if (err) {return done(err);}
      user.password = hashedPassword;
      done();
    });
  });
});
