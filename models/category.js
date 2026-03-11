const mongoose = require('mongoose');
const categorySchema =new mongoose.Schema({
    nom:{type:String , required:true ,unique: true },
    description:{type:String}

});
module.exports = mongoose.model('category',categorySchema);
