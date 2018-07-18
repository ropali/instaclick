var express = require('express');
var router = express.Router();
require('dotenv').config()


const checkSession = require('../middleware/checkSession');

const mainController = require('../controllers/mainController');


/* GET home page. */
router.get('/', checkSession, mainController.get_home_page);


module.exports = router;

