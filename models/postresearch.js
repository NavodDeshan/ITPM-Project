const mongoose = require('mongoose');

const postreaserachSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    student1:{
        type:String,
        required:true,
       
    },
    student2:{
        type:String,
        required:true,
       
    },

    student3:{
        type:String,
        required:true,
       
    },

    student4:{
        type:String,
        required:true,
       
    },

    cosupervisor:{
        type:String,
        required:true,
       
    },

    supervisor:{
        type:String,
        required:true,
       
    },
    conferencename:{
        type:String,
        required:true
    },
    issn:{
        type:String,
        required:true                
    },
    link1:{
        type:String,
        required:true                
    },

    link2:{
        type:String,
        required:true                
    },

    payment:{
        type:String,
        required:true                
    },
    
    status: {
        type: String,
        default: 'Pending'
      }
   
},
);

module.exports = mongoose.model('postresearch',postreaserachSchema);