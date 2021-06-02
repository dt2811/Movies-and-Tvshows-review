let mongoose = require('mongoose');

let User = require('./user');

let commentSchema = new mongoose.Schema({
    text:String,
    date:String,
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
})

let Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;