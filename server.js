//Global Requires
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error.js');
const authRoutes = require('./routes/auth.js')
const messagesRoutes = require('./routes/messages.js');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', messagesRoutes);

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
