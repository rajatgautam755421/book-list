const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
     bookName:{
         type : String,
         
     },
     authorName : {
         type : String,

        
     },
     image : {
       type: String ,
     }
     
    
    
});



module.exports=new mongoose.model('Posts',PostSchema)