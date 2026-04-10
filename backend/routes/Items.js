const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


//Fetch all existing items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // fetch all items
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// fetch all items related to given pantry
router.get('/:pantry', async (req, res) => {
  try {
    const items = await Item.find({ pantryID: req.params.pantry }); 
    res.json(items);
  } catch (err) {
   res.status(500).json({ error: err.message });
  }
});



// Create a new item
router.post('/', async (req, res) => {

  try {

    const { name, quantity, status, pantryID, category, unit, wishlist} = req.body;
    
        // check if the item already exists in the database for this pantry
        const existingItem = await Item.findOne({ name: name, pantryID: pantryID });
        if (existingItem) {
          return res.status(400).json({ message: 'This item already exists in the pantry.' });
        }
        //item doesn't exist yet, add it to the database
        const item = new Item({
          name,
          quantity,
          unit,
          status, 
          pantryID,
          category,
          wishlist
        });
    //save to database and send response
    const savedItem = await item.save();
    res.json(savedItem);
  } 
  
  catch (err) {
    res.json({ message: err });
  }

}); 

//update existing item
router.put('/:id', async (req, res) => {

  try {
    const updatedItem= await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
  } 
  
  catch (err) {
    res.json({ message: err });
  }

}); 

router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id); // Mongoose method to remove by ID
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;