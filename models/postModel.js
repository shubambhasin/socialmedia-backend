const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PostSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }, 
  post: {
    type: String,
    require: [true, "Add some text"]
  },
  likes:[{
     type: Schema.Types.ObjectId,
    ref: 'user'
  }]

},{
  timestamps: true
})
const Post = new model('posts', PostSchema)
module.exports = { Post }









































// const mongoose = require('mongoose')
// const { Schema, model } = mongoose

// const PostSchema = new Schema({

//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'user'
//   },
//   author: {
//     name: {
//       type: String
//     },
//     username: {
//       type: String
//     },
//     email: {
//       type: String
//     }
//   },
//   post: [
//     {
//       text: {
//         type: String,
//         required: [true, "Enter something to post"]
//       },
//       imageUrl: {
//         type: String
//       },
//       likes: [
//         {
//           type: Schema.Types.ObjectId,
//           ref: 'user'
//         }
//       ]

//     }
//   ]

// })
// const Post = new model('posts', PostSchema)
// module.exports = { Post }

