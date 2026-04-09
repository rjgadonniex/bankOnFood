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
    const items = await DonationPledge.find({ pantryID: req.params.pantry }); 
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new item
router.post('/', async (req, res) => {

  try {

    const { donator, item, quantity, unit, pantry} = req.body;
    
        //add to database
        const donation = new DonationPledge({
            donator,
            item,
            quantity, 
            unit,
            pantry
            //date will default to current date
        });
    //save to database and send response
    const savedDonation= await donation.save();
    res.json(savedDonation);
  } 
  
  catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;