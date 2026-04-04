const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

//Fetch existing items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find(); // fetch all items
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new item
router.post('/', async (req, res) => {

  try {

    const { name, quantity, status, pantryID, category, unit} = req.body;
    
        // check if the item already exists in the database for this pantry
        const existingItem = await Item.findOne({ name: name, pantryID: pantryID });
        if (existingItem) {
          return res.status(400).json({ message: 'This item already exists in the pantry.' });
        }
        //item doesn't exist yet, add it to the database
        const item = new Item({
        name,
        quantity: quantity || 0, //if not quantity provided, default to 0
        unit,
        status, 
        pantryID,
        category
        });
    //save to database and send response
    const savedItem = await item.save();
    res.json(savedItem);
  } 
  
  catch (err) {
    res.json({ message: err });
  }

});



module.exports = router;