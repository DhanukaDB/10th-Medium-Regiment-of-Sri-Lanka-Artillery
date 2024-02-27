const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const physicalStandardsSchema = new Schema({

    
   serviceId :{
      type: String,
      require: true
   },

   bloodPressure : {
          type: Number,
          
   },
   
   breathingRate : {
         type: Number,
         
   },

   pulseRate : {
         type: Number,
         
    },


    temperature : {
         type: Number,
         
    },


    height : {
         type: Number,
         
   },
 
 
   weight: {
         type: Number,
         
   },


   testDate : {
         type: Date,
         
   },
   

})

const PhysicalStandards = mongoose.model("PhysicalStandards", physicalStandardsSchema);

module.exports = PhysicalStandards;
