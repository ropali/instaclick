const Post = require('../models/post');
const User = require('../models/User');

exports.get_home_page = function (req, res, next) {

    // Fetch the user details
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

                    res.render('index', { user: user, posts: posts });

                }).sort({ timestamp: -1 });
            }
        });
    }
};