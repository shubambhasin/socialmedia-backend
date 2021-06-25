const mongoose = require('mongoose')
const { Schema, model} = mongoose

const PostSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    text: {
      type: String,
      required: [true, "Enter something to post"]
    },
    imageUrl: {
      type: String
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }

})
const Post = new model('posts', PostSchema)
module.exports = { Post }