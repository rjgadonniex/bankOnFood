const express = require('express');
const router = express.Router();
const DonationPledge = require('../models/DonationPledge');

//Fetch existing pledges
router.get('/', async (req, res) => {
  try {
    const pledges = await DonationPledge.find(); // fetch all pantries
    res.json(pledges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// fetch all pledges related to given pantry
router.get('/:pantry', async (req, res) => {
  try {
    const pledges = await DonationPledge.find({ pantryID: req.params.pantry })
      .populate('donator', 'name email') // grabs the user's name
      .populate('item', 'name');         // grabs the item's name
    res.json(pledges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new item
router.post('/', async (req, res) => {

  try {

    const { donator, item, quantity, unit, pantryID } = req.body;
    
        //add to database
        const donation = new DonationPledge({
            donator,
            item,
            quantity, 
            unit,
            pantryID
            //date will default to current date
        });
    //save to database and send response
    const savedDonation= await donation.save();
    res.json(savedDonation);
  } 
  
  catch (err) {
    res.status(400).json({ message: err.message });
  }

});

// delete a pledge (when accepted/completed)
router.delete('/:id', async (req, res) => {
  try {
    const removedPledge = await DonationPledge.findByIdAndDelete(req.params.id);
    res.json(removedPledge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;