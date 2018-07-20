const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');


exports.get_login_page = (req, res, next) => {
    res.render('login', { error: req.session.errors });
    req.session.errors = null;
};


exports.login = (req, res, next) => {
    let userData = req.body;

    // Validations
    //req.check('email', 'Invalid email!!!').isEmail();
    //req.check('password', 'Password can\'t be empty!!!').notEmpty();
    let errors = '';

    if (userData.email == '') {
        errors += 'Email can\'t be empty!\n';
    }

    if (userData.password == '') {
        errors += 'Password can\'t be empty!';
    }

    // Add the errors in the session
    console.log(errors);

    if (errors != '') {
        return res.status(400).send({
            success: false,
            msg: errors
        });
    }

    // Check if user exist
    User.findOne({ 'email': userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        }

        if (user) {
            // Check if password matches
            if (!user.validPassword(userData.password)) {
                //TODO : error handling
                return res.status(400).send({
                    success: false,
                    msg: 'Username or password is wrong!'
                });

            }
            else {
                // Set the userId in the session
                req.session.userId = user._id;

                res.redirect('/');
            }

        }

    }).select('email password');

};


exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/users/login');
};


exports.signup = (req, res, next) => {

    let userData = req.body;
    console.log(userData);


    // Validations
    // req.check('full_name', 'Please Fill All The Details').notEmpty();
    // req.check('email', 'Invalid email').isEmail();

    // req.check('pass1', 'Passwords did\'nt match!!!').equals(userData.pass2);


    // Add the errors in the session
    //var errors = req.validationErrors();

    if (userData.fullname == '' && userData.email == '' && userData.password == '') {
        return res.status(401).send({
            msg: 'Please fill all the details!'
        });
    }


    // create new user
    let newUser = new User();
    newUser.fullName = userData.fullname;
    newUser.email = userData.email;
    newUser.password = newUser.encryptPassword(userData.password);
    newUser.gender = userData.gender;

    //save the details
    newUser.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }
        else {
            req.session.userId = result._id;
            return res.status(200).send({ msg: 'Successfull' });
        }
    });

};

exports.get_edit_profile_page = (req, res, next) => {

    let userId = req.session.userId;
    User.findById({ _id: userId }, (err, user) => {
        if (err) {
            console.log(err); // ToDo : error handling
        }

        res.render('profile-edit', { user: user });

    });


};

exports.edit_profile = (req, res, next) => {

    let userId = req.session.userId;
    if (req.body.bio === '') {
        return res.status(204).send('Bio cannot be empty!');
    }

    let imgFile = req.file;
    let updateOptions = {};

    //check if user wants to update the profile image
    if (imgFile) {
        updateOptions.profile = '/uploads/profiles/' + imgFile.filename;
    }

    updateOptions.bio = req.body.bio;

    User.updateOne({ _id: userId }, { $set: updateOptions }, (err, response) => {
        if (err) {
            console.log(err); // TODO : Error handling
        }

        res.redirect('/');

    });

};

exports.get_settings_page = (req, res, next) => {
    let userid = req.session.userId;

    User.findById({ _id: userid }, (err, user) => {

        if (err) {
            console.log(err);
            return res.status(500).send({ success: false, msg: 'Internal error!' });
        }
        
        
        res.render('settings', { user: user });

    }).select('_id profile fullName bio email gender');

};

exports.update_settings = (req, res, next) => {
    let userData = req.body;

    let updateOptions = {};
    // Check what fields user wants to update
    if (userData.fullname) {
        updateOptions.fullName = userData.fullname;
    }
    else if (userData.email) {
        updateOptions.email = userData.email;
    }
    else if (userData.password) {
        updateOptions.password = bcrypt.hashSync(userData.password);
    }
    else if (userData.gender) {
        updateOptions.gender = userData.gender;
    }

    User.findByIdAndUpdate({ _id: req.session.userId }, { $set: updateOptions }, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).send(true);
        }

        return res.status(200).send(true);
    });


};
