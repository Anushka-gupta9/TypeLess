const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');  

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  address: {
    type: String,
    required: true,
  }
});

//  Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  
  if (!this.isModified("password")) {  // Only hash password if it is new or modified
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);              // generate salt
    this.password = await bcrypt.hash(this.password, salt); // hash the password, here replaced the raw password with strings 
    next();  
  } catch (err) {
    next(err); // next(err) function -> stop saving, pass error back to caller
  }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;

