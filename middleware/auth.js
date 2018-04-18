require('dotenv').load();
const jwt = require('jsonwebtoken');

//Confirm a user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        next();
      } else {
        return next({ status: 401, message: "Please Log In First" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Please Log In First" });
  }
};

//Confirm correct user is logged in - Authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
};
