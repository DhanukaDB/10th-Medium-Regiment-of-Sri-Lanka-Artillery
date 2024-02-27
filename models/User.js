const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

   serviceId :{
      type: String,
      require: true
   },

  userName : {
        type : String,
       
  },
   
   rank: {
         type: String,
         
   },
 
   region: {
      type: String,
      
   },

   bloodGroup: {
      type: String,
      
   },

   unit: {
      type: String,
      
   },

   birthday : {
      type: Date,
     
   },

    enlistmentDate : {
      type: Date,
      
   },
 
   password: {
         type: String,
         require: true
   },  
   

})

const User = mongoose.model("NewUser", userSchema);

module.exports = User;
