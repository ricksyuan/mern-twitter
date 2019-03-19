const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

app.use('/api/users', users);
app.use('/api/tweets', tweets);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!!'));

// Before we can run the server we need to tell it which port to run on.
// Heroku will reqiure us to run our server on `process.env.PORT`.
const port = process.env.PORT || 5000;

// Start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port ${port}`));

