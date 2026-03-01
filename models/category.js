const moongose = require('moongose');
const categorySchema =new mongoose.schema({
    nom:{type:string , required:true ,unique: true },
    description:{type:string}

});
module.exports = moongose.model('category',categorySchema);
