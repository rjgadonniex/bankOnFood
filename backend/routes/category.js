const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

//Fetch existing categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(); // fetch all pantries
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {

  try {

    const { pantryID, description} = req.body;
    
        // check if the category already exists in the database for this pantry
        const existingCat = await Category.findOne({ pantryID: pantryID, description: description });
        if (existingCat) {
          return res.status(400).json({ message: 'This category already exists in the pantry.' });
        }
        //category doesn't exist yet, add it to the database
        const category = new Category({
            pantryID,
            description
        });
    //save to database and send response
    const savedCat = await category.save();
    res.json(savedCat);
  } 
  
  catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;