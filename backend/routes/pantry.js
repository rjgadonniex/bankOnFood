const express = require('express');
const router = express.Router();
const Item = require('../models/Pantry');

// Create a new item
router.post('/', async (req, res) => {

  try {

    const { name, location, phoneNumber, email, website, manager} = req.body;
    
        // check if the pantry already exists in the database
        const existingPantry= await Item.findOne({ name: name, location: location });
        if (existingPantry) {
          return res.status(400).json({ message: 'This pantry already exists' });
        }
        //pantry doesn't exist yet, add it to the database
        const pantry = new Pantry({
            name,
            location,
            phoneNumber, 
            email,
            website,
            manager
        });
    //save to database and send response
    const savedPantry= await pantry.save();
    res.json(savedPantry);
  } 
  
  catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;