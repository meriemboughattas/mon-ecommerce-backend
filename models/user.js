const mongoose = require('mongoose');
const userSchema = nex mongoose.schema({
    nom :{type:string ,required:true},
    email:{type : string ,required :true , unique:true},
    motdepasse:{type:string ,  required : true},

    role:{
        type:string,
        enum: ['client','vendeur','admin'],
        default:'client' 
    },
    adresse: {type:string},
    telephone:{type :string},
    infosvendeur :{
        nomboutique:{type:string},
        matriculefiscal:{type:string},
        statutvalidation :{
            type : string,
            enum['en_attente','valide','refuse'],
            default:'en_attente'
        }
    }
},{ tumestamps:true});
module.exports =mongoose.model('user',userschema);
