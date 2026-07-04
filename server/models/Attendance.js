import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(

{

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },

    qrSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QRSession",
        required: true,
    },

    attendanceDate: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present",
    },

    scanTime: {
        type: Date,
        default: Date.now,
    },

},

{
    timestamps: true,
}

);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;