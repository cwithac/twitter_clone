require('dotenv').load();
const jwt = require('jasonwebtoken');

//Confirm a user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorzation.split(' ')[1]; // Bearer (token)
    jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
      if(decoded){
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first."
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please log in first."
    });
  }
}

//Confirm correct user is logged in - Authorization
exports.ensureCorrectUser = function(req, res, next) {

}
