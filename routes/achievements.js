const router = require("express").Router();
let Achievement = require("../models/Achievements");


// Add Achievement
router.route("/add").post((req, res) => {
    const { serviceId, event, level, place, achievementDate } = req.body;

    

    // Create a new achievement instance
    const newAchievement = new Achievement({
        serviceId,
        event,
        level,
        place,
        achievementDate,
    });

    // Save the new achievement
    newAchievement
        .save()
        .then(() => {
            res.json("Achievement Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding achievement" });
        });
});



router.route("/").get((req,res) => {
     
    Achievement.find().then((achievements) => {
        res.json(achievements)

    }).catch((err) => {
        console.log(err)
    })


})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    
    await Achievement.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch ((err) => {
        console.log(err.message);
        res.status(500).send({status: " Error with delete User", error: err.message});
    })
  })

  router.route("/get/:serviceId").get((req, res) => {
    const serviceId = req.params.serviceId;

    // Use findOne to find a single achievement based on the serviceId
    Achievement.findOne({ serviceId: serviceId })
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