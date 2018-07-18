const express = require('express');
const router = express.Router();

const checkSession = require('../middleware/checkSession');

const postController = require('../controllers/postController');

// GET post page
router.get('/', checkSession, postController.get_posts_page);


// Upload the image post
router.post('/upload', checkSession, postController.upload_post);

// Get all comments
router.get('/comments/:postId', checkSession, postController.get_comments_page);

// Make comment
router.post('/comments/:postId', checkSession, postController.make_comment);

// Like counter
router.post('/like/:postId', checkSession, postController.add_like);


// GET all posts uploaded by user
router.get('/allposts', checkSession, postController.get_all_posts);

// GET trending posts
router.get('/trending', checkSession, postController.get_trending_posts);

module.exports = router;
