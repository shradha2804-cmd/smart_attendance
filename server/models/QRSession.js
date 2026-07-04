import mongoose from "mongoose";

const qrSessionSchema = new mongoose.Schema(

{

    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    },

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },

    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },

    semester:{
        type:Number,
        required:true
    },

    lectureName:{
        type:String,
        required:true
    },

    lectureDate:{
        type:Date,
        default:Date.now
    },

    startTime:{
        type:Date,
        default:Date.now
    },

    endTime:{
        type:Date,
        required:true
    },

    qrToken:{
        type:String,
        required:true,
        unique:true
    },

    status:{
        type:String,
        enum:["Active","Expired"],
        default:"Active"
    }

},

{
    timestamps:true
}

);

const QRSession = mongoose.model("QRSession",qrSessionSchema);

export default QRSession;