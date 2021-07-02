const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const { connectDatabase } = require("./DB/db.connect.js")
const SignupRouter = require('./routes/signupRouter')
const SigninRouter = require('./routes/signinRouter')
const NotesRouter = require('./routes/notesRouter')
const app = express();

app.use(express.json());
connectDatabase()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.use("/signup", SignupRouter)
app.use("/signin", SigninRouter)
app.use("/notes", NotesRouter)
app.listen(3000, () => {
  console.log('server started');
});
