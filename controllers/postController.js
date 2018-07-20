const Post = require('../models/post');
const User = require('../models/User');
const Comment = require('../models/comment');
const fs = require('fs');

exports.get_posts_page = (req, res, next) => {
    res.render('post');
};

exports.upload_post = (req, res, next) => {
    let userId = req.session.userId;

    var filePath = 'uploads/posts/' + req.body.fileName;
    var imgBuffer = new Buffer(req.body.imageData, 'base64');
    fs.writeFile(filePath, imgBuffer, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                error: "upload failed"
            });
        }

        User.findById({ _id: userId }, (err, user) => {
            if (err) {
                console.log(err);
            }

            if (user) {
                //Create new post in db
                let newPost = new Post({
                    user: {
                        id: user._id,
                        username: user.fullName,
                        profile: user.profile
                    },
                    imageUrl: filePath,
                    timestamp: Date.now()
                });

                newPost.save((err, result) => {
                    if (err) {
                        console.log(err);

                        return res.status(500).json({
                            success: false,
                            error: "upload failed"
                        });
                    }

                    res.status(201).json({
                        success: true,
                        error: "upload successfull"
                    });
                    console.log(result);

                });
            }

        });
    });
};

exports.get_comments_page = (req, res, next) => {
    let postId = req.params.postId;

    Post.findById({ _id: postId }, (err, post) => {
        if (err) console.log(err);

        // Get all the comments from db
        Comment.find({ postid: postId }, (err, comments) => {
            if (err) {
                console.log(err);
            }

            User.findById({ _id: req.session.userId }, (err, user) => {
                if(err) console.log(err);
                console.log(user);
                res.render('comments-page', { post: post, comments: comments, user: user });

            }).select('profile');
            
        });
    });
};

exports.make_comment = (req, res, next) => {
    let postid = req.params.postId;
    let comment = req.body.comment;


    // Get user details first
    User.findById({ _id: req.session.userId }, (err, user) => {
        if (err) {
            console.log(err);
        }

        const newComment = new Comment({
            postid: postid,
            user: {
                userid: user._id,
                username: user.fullName,
                profile: user.profile
            },
            comment: comment,
            time: new Date().getTime()
        });

        newComment.save((err, response) => {
            if (err) {
                console.log(err);

                return res.status(201).send({
                    success: false,
                    msg: 'Unable to make comment!!!'
                });
            }

            // increament the comment counter in posts
            Post.findByIdAndUpdate({ _id: postid }, { $inc: { 'comments': 1 } }, (err, post) => {
                if (err) {
                    console.log(err);
                    return res.status(201).send({
                        success: false,
                        msg: 'Unable to make comment!!!'
                    });
                }


            });

            return res.status(200).send(response);

        });

    }).select('_id fullName profile');


};

exports.add_like = (req, res, next) => {
    let postid = req.params.postId;

    Post.findByIdAndUpdate({ _id: postid }, { $inc: { "likes": 1 } }, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ success: false, msg: 'Internal error!!!' });
        }


        return res.status(200).send({ success: true, likes: response.likes });

    });


};

exports.get_all_posts = (req, res, next) => {
    let postid = req.session.userId;

    User.findById({ _id: postid }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal error');
        }

        Post.find({ 'user.id': postid }, (err, posts) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal error');
            }

            
            
            res.render('allposts', { user: user, posts: posts });
        }).select('_id user.id imageUrl');

    });

};

exports.get_trending_posts = (req, res, next) => {

    if (req.session.userId != null) {
        User.findById({ _id: req.session.userId }, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error occured!!!');
            }

            if (user) {
                //Fetch the posts
                Post.find((err, posts) => {
                    if (err) {
                        console.log(err);
                    }

                    res.render('trending', { user: user, posts: posts });

                }).sort({ likes: -1 });
            }
        });
    }


};
