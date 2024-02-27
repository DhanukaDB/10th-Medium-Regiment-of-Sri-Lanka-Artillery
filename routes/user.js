const router = require("express").Router();
let User = require("../models/User");



//Add User
router.route("/add").post((req,res) => {
    const serviceId = req.body.serviceId;
    const userName = req.body.userName;
    const rank    = req.body.rank;
    const region    = req.body.region;
    const bloodGroup    = req.body.bloodGroup;
    const unit    = req.body.unit;
    const birthday = req.body.birthday;
    const enlistmentDate    = req.body.enlistmentDate;
    const password   = req.body.password;
    
    
    if(!serviceId || !userName  || !rank || !region || !bloodGroup|| !unit || !birthday ||!enlistmentDate || !password ){
        return res.status(422).json({error:"please add all the feilds"})

    }
     

    User.findOne({serviceId: serviceId})
    .then((savedUser) => {
        if(savedUser) {
            return res.status(422).json({error:"user already exists with that email"})
        }

    const newUser = new User({
        serviceId,
        userName,
        rank,
        region,
        bloodGroup,
        unit,
        birthday,
        enlistmentDate,
        password,
       
    })

    newUser.save().then(() => {
         res.json("User Added")

    }).catch((err) => {
        console.log(err);
    })
  
}).catch((err) =>{
    console.log(err);
})
})



router.route("/").get((req,res) => {
     
    User.find().then((users) => {
        res.json(users)

    }).catch((err) => {
        console.log(err)
    })


})

// Update user using serviceId
router.route("/update/:serviceId").put(async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const { userName, rank, region, bloodGroup, unit, birthday, enlistmentDate, password } = req.body;

        // Check if the serviceId exists in the database
        const existingUser = await User.findOne({ serviceId });

        if (!existingUser) {
            return res.status(404).json({ status: "User not found", error: "User with the provided serviceId does not exist" });
        }

        // Update user fields
        existingUser.userName = userName;
        existingUser.rank = rank;
        existingUser.region = region;
        existingUser.bloodGroup = bloodGroup;
        existingUser.unit = unit;
        existingUser.birthday = birthday;
        existingUser.enlistmentDate = enlistmentDate;
        existingUser.password = password;

        // Save the updated user
        await existingUser.save();

        res.status(200).json({ status: "User updated", data: existingUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});



//Delete User Using an Id
router.route("/delete/:id").delete(async (req, res) => {
      let userId = req.params.id;
      
      await User.findByIdAndDelete(userId).then(() => {
          res.status(200).send({status: "User deleted"});
      }).catch ((err) => {
          console.log(err.message);
          res.status(500).send({status: " Error with delete User", error: err.message});
      })
    })



router.route("/get/:serviceId").get((req, res) => {
    const serviceId = req.params.serviceId;

    // Use findOne to find a single user based on the serviceId
    User.findOne({ serviceId: serviceId })
        .then((user) => {
            if (user) {
                // If user is found, return it
                res.status(200).send({ status: "user fetched", user });
            } else {
                // If user is not found, return a message indicating that
                res.status(404).send({ status: "user not found" });
            }
        })
        .catch((err) => {
            // If there's an error, log it and return an error message
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        });
});








router.route("/signin").post((req, res) => {
    {/*const email = req.body.email;
    const password     = req.body.password; */}

    const serviceId = req.body.serviceId;
    const password = req.body.password;


  

    if (!serviceId || !password) {
        res.status(422).json({ error: "Please add Service Id or password" })
    }

 User.findOne({serviceId:serviceId})
  .then(savedUser =>{
      if(!savedUser){
         return  res.status(422).json({error:"Invalid Service Id or Password"})

      }

      User.findOne({password:password})
      .then(savedUser =>{
        if(savedUser){
             {/* res.json({message:"successfully signed in"}) */}

             res.json(User);
            
            
          }
          else{
              return res.status(422).json({error:"Invalid Service Id or Password"})
          }
      })
    .catch(err=>{
        console.log(err)
    })

  })
})



module.exports = router;