const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
 // Import the routes here evertime a new schema is made
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const itemRoute = require('./routes/item');
const catRoute = require('./routes/category');
const pantryRoute = require('./routes/pantry');
const donationRoute = require('./routes/donationPledge');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
// Use the imported routes here when a new schema is made
app.use('/posts', postsRoute);
app.use('/api/auth', authRoute); 
app.use('/item', itemRoute);
app.use('/category', catRoute);
app.use('/pantry', pantryRoute);
app.use('donationRoute', donationRoute);

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('Connected to database'))
.catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

