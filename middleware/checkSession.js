
module.exports = (req, res, next) => {
    if(req.session.userId != null){
        
        next();
    }
    else{
        
        res.redirect('/users/login');
    }
}