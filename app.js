require('dotenv').config()
const express = require('express');
const cors = require('cors'); 
const app = express();
const connectDB = require('./db/connect')
app.use(cors());     
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./public'))
const {myuser} = require('./data')

app.use((req, res, next) => {
  next()
})

const users =  require('./router/users')
const auth = require('./router/auth')

app.use('/users', users)
app.use('/api/v1/auth', auth )

const home = require('./router/home')
app.use('/api/v1', home)
   
// app.post('/users', (req, res) => {
// const {name, balance} = req.body;
// const myNewUser = {id: myuser.length + 1, name: name, balance: 0};
// myuser.push(myNewUser);
// console.log(name, balance); 
// res.redirect('/');
// }
// )

const port = process.env.PORT || 3000;

const start = async () => {
  
  try {
  await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

