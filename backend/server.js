const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const cors = require('cors');
 // Import the routes here evertime a new schema is made
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const itemRoute = require('./routes/Items');
const catRoute = require('./routes/Categories');
const pantryRoute = require('./routes/Pantries');
const donationRoute = require('./routes/DonationPledges');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://bank-on-food.vercel.app"
  ],
  credentials: true
}));

//app.use(bodyParser.json());
app.use(express.json());
// Use the imported routes here when a new schema is made
app.use('/posts', postsRoute);
app.use('/api/auth', authRoute); 
app.use('/api/Items', itemRoute);
app.use('/api/Categories', catRoute);
app.use('/api/Pantries', pantryRoute);
app.use('/api/DonationPledges', donationRoute);

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

