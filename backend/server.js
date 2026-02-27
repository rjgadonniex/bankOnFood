const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
 // Import the routes here evertime a new schema is made
const postsRoute = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
// Use the imported routes here when a new schema is made
app.use('/posts', postsRoute); 

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to database'))
.catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

