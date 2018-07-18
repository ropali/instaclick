const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postid:{
        type: String,
        required: true
    },
    user:{
        userid:{ type: String},
        username: { type: String },
        profile: { type: String}
    },
    comment: { type: String},
    time: { type: String }
});

module.exports = mongoose.model('Comment', commentSchema);