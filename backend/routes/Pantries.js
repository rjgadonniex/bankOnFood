const express = require('express');
const router = express.Router();
const Pantry = require('../models/Pantry');

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

router.get('/:managerId', async (req, res) => {
  try {
    const pantry = await Pantry.findOne({ manager: req.params.managerId });
    if (!pantry) return res.status(404).json({ message: 'Pantry not found' });
    res.json(pantry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;