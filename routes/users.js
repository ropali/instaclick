var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController');

const checkSession = require('../middleware/checkSession');

const multer = require('multer');

// Setup disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profiles'); //null as first arg means no error
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname); //null as first arg means no error
    }
});


const fileFilter = (req, file, cb) => {
    let image = file.mimetype.startsWith('image/');
    if (image) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// GET login page
router.get('/login', userController.get_login_page);


// Check login credentials
router.post('/login', userController.login);

// Logout user
router.get('/logout', userController.logout);

// Register new users
router.post('/signup', userController.signup);


// GET the edit-profile page
router.get('/edit-profile', checkSession, userController.get_edit_profile_page);

// update the user profile
router.post('/edit-profile', checkSession, upload.single('profile_img'), userController.edit_profile);


// GET users settings page
router.get('/settings', checkSession, userController.get_settings_page);

// update user settings
router.post('/settings', checkSession, userController.update_settings);


module.exports = router;
