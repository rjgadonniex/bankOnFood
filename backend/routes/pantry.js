const express = require('express');
const router = express.Router();
const Item = require('../models/Pantry');

//Fetch existing pantries
router.get("/", async (req, res) => {
  try {
    const pantries = await Pantry.find(); // fetch all pantries
    res.json(pantries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new pantry
router.post('/', async (req, res) => {

  try {

    const { name, location, phoneNumber, email, website, manager} = req.body;
    
        // check if the pantry already exists in the database
        const existingPantry= await Pantry.findOne({ name: name, location: location });
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