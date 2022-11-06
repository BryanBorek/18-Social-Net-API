const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const friendSchema = require('./Friend');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: [validateEmail, "Please enter a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    thoughts: [thoughtSchema],
    friends: [friendSchema],
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true,
    },
  }
);


//Virtual to return friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;