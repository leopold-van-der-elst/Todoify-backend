const mongoose = require('mongoose');

const connectionString = "mongodb+srv://admin:admin@cluster0.kv7rm6p.mongodb.net/MyNews";

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));