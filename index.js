const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const connectDatabase = require('./db/db.connect.js')
const SignupRouter = require('./routes/signupRouter')
const SigninRouter = require('./routes/signinRouter')

// misc

app.use(cors())
app.use(express.json());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//db.connect.js
connectDatabase()

// routes
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.use('/signup', SignupRouter)
app.use('/signin', SigninRouter)
app.listen(3000, () => {
  console.log('server started');
});