const router = require("express").Router();
let PhysicalStandards = require("../models/PhysicalStandards");


// Add PhysicalStandards
router.route("/add").post((req, res) => {
    const { serviceId, bloodPressure, breathingRate, pulseRate, temperature, height, weight, testDate } = req.body;

    
    // Create a new physical standards instance
    const newPhysicalStandards = new PhysicalStandards({
        serviceId,
        bloodPressure: Number(bloodPressure),
        breathingRate: Number(breathingRate),
        pulseRate: Number(pulseRate),
        temperature: Number(temperature),
        height: Number(height),
        weight: Number(weight),
        testDate
    });

    // Save the new physical standards
    newPhysicalStandards
        .save()
        .then(() => {
            res.json("Physical Standards Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding physical standards" });
        });
});




router.route("/").get((req,res) => {
     
    PhysicalStandards.find().then((physicalStandardss) => {
        res.json(physicalStandardss)

    }).catch((err) => {
        console.log(err)
    })


})




//Delete User Using an Id
router.route("/delete/:id").delete(async (req, res) => {
      let userId = req.params.id;
      
      await PhysicalStandards.findByIdAndDelete(userId).then(() => {
          res.status(200).send({status: "User deleted"});
      }).catch ((err) => {
          console.log(err.message);
          res.status(500).send({status: " Error with delete User", error: err.message});
      })
    })




router.route("/get/:serviceId").get((req, res) => {
    const serviceId = req.params.serviceId;

    // Use findOne to find a single achievement based on the serviceId
    PhysicalStandards.findOne({ serviceId: serviceId })
        .then((achievement) => {
            if (achievement) {
                // If achievement is found, return it
                res.status(200).send({ status: "Achievement fetched", achievement });
            } else {
                // If achievement is not found, return a message indicating that
                res.status(404).send({ status: "Achievement not found" });
            }
        })
        .catch((err) => {
            // If there's an error, log it and return an error message
            console.log(err.message);
            res.status(500).send({ status: "Error with get Achievement", error: err.message });
        });
});










module.exports = router;