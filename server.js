//Global Requires
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error.js');
const authRoutes = require('./routes/auth.js')
const messagesRoutes = require('./routes/messages.js');
const {loginRequired, ensureCorrectUser} = require("./middleware/auth.js");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRoutes);

//Get All Messages
app.get('/api/messages', loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({createAt: 'desc'})
      .populate('user', {
        username: true,
        profileImageUrl: true
      });
      return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
};

//Route Failure
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handle middleware
app.use(errorHandler);

//Listeners
app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}`);
})
