const express = require('express');
const router = express.Router();
const Pantry = require('../models/Pantry');

// Create a new pantry
router.post('/', async (req, res) => {

  try {

    const { name, address, latitude, longitude, hours, phone, email, website, manager } = req.body;
    
        // check if the pantry already exists in the database
        const existingPantry= await Pantry.findOne({ name, address });
        if (existingPantry) {
          return res.status(400).json({ message: 'This pantry already exists' });
        }
        //pantry doesn't exist yet, add it to the database
        const pantry = new Pantry({
            name,
            address,
            latitude,
            longitude,
            hours,
            phone,
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

// fetch all pantries for public/searching 
router.get('/', async (req, res) => {
  try {
    const pantries = await Pantry.find();
    res.json(pantries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// fetch single pantry by id
router.get('/public/:id', async (req, res) => {
  try {
    const pantry = await Pantry.findById(req.params.id);
    if (!pantry) return res.status(404).json({ message: 'Pantry not found' });
    res.json(pantry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pantry = await Pantry.findOne({ manager: req.params.id });
    if (!pantry) return res.status(404).json({ message: 'Pantry not found' });
    res.json(pantry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPantry = await Pantry.findOneAndUpdate({ manager: req.params.id },req.body,{ new: true });

    if (!updatedPantry) {
      return res.status(404).json({ message: 'Pantry not found' });
    }

    res.json(updatedPantry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;