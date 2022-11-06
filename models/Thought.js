const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
    //   thoughtId: {
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId(),
    //   },
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
    reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        // getters: true,
      },
      id: false,
    }
  );

  //Virtual to return friend count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thought = model('user', thoughtSchema);
  
  module.exports = thoughtSchema;