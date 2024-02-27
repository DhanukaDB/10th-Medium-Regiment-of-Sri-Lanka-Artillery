const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({

 
   serviceId :{
            type: String,
            require: true
      },

   
   event : {
         type: String,
         
   },

   level : {
      type: String,
     
   },
 
 
   place: {
         type: String,
         
   },


   achievementDate : {
         type: Date,
        
   },
   

})

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
