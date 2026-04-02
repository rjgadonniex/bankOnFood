const express = require('express');
const router = express.Router();
const DonationPledge = require('../models/DonationPledge');

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