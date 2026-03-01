const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    titre:{type:string , required :true },
    description:{type:string ,required:true},
    prix :{type : Number, required:true },
    stock:{type : Number , required :true ,default:0},
    image:{type:string},

    categorie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    vendeur:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
, {timestamps:true});
module.exports = mongoose.model('product',productSchema);
