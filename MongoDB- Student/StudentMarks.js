const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name :{
        type:String
    },
    Roll_No:{
        type:Number
    },
    WAD_Marks:{
        type:Number
    },
    CC_Marks:{
        type:Number
    },
    DSBDA_Marks:{
        type:Number
    },
    CNS_Marks:{
        type:Number
    },
    AI_Marks:{
        type:Number
    }
})

const StudentMarks = mongoose.model("studentmarks", schema);
 module.exports = StudentMarks;
