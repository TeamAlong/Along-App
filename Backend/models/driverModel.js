const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const driverSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "Please tell us ur surname!"],
  },
  surname: {
    type: String,
    required: [true, "Please tell us ur name!"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  carType: {
    type: String,
    required: [true, "Please tell us your car type!"],
  },
  carNo: {
    type: String,
    required: [true, "Please tell us car number!"],
  },
  photo: { type: String, default: "default.jpg" },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    //select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      // Only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  locations: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

driverSchema.index({ locations: "2dsphere" });

driverSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

// driverSchema.pre('save', function(next) {
//     if (!this.isModified('password') || this.isNew ) return next();

//     this.passwordChangedAt = Date.now() - 1000;
//     next();
// });

driverSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

driverSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

driverSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  // False means not changed
  return false;
};

driverSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 70 * 60 * 1000;

  return resetToken;
};

driverSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
