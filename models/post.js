const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        id: {
            type: String,
            required: true
        },
        username:{
            type: String,
            
        },
        profile:{
            type: String,
            
        }
    },
    imageUrl: {
        type: String,
        required: true
    },

    timestamp: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default : 0
    },
    comments: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Post', postSchema);