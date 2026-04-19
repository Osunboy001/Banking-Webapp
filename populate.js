require('dotenv').config();

const connectDB = require('./db/connect');
const User = require('./model/user');
const { myuser } = require('./data');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await User.deleteMany(); // optional (clears old data)
    await User.insertMany(myuser);

    console.log('Data inserted into MongoDB successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start()