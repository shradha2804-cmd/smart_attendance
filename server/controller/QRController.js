import QRSession from "../models/QRSession.js";
import crypto from "crypto";
import generateQRCode from "../utils/generateQR.js";



// ===============================
// Generate QR Session
// ===============================

export const generateQR = async (req, res) => {

    try {

        const {

            teacher,
            course,
            department,
            semester,
            lectureName

        } = req.body;

        // Random Token

        const qrToken = crypto.randomBytes(20).toString("hex");

        // Expire after 30 sec

        const endTime = new Date(Date.now() + 30000);

        // Generate QR Image

        const qrImage = await generateQRCode(qrToken);

        const qrSession = new QRSession({

            teacher,
            course,
            department,
            semester,
            lectureName,
            qrToken,
            endTime

        });

        await qrSession.save();

        res.status(201).json({

            success: true,

            message: "QR Generated Successfully",

            qrToken,

            qrImage,

            expiresAt: endTime,

            qrSession

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Get All QR Sessions
// ===============================

export const getAllQRSessions = async (req, res) => {

    try {

        const sessions = await QRSession.find()

            .populate("teacher")

            .populate("course")

            .populate("department");



        res.status(200).json({

            success: true,

            total: sessions.length,

            sessions

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




// ===============================
// Get Active QR
// ===============================

export const getActiveQR = async (req, res) => {

    try {

        const session = await QRSession.findOne({

            status: "Active"

        })

            .populate("teacher")

            .populate("course")

            .populate("department");



        if (!session) {

            return res.status(404).json({

                success: false,

                message: "No Active QR Found"

            });

        }



        res.status(200).json({

            success: true,

            session

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




// ===============================
// Expire QR
// ===============================

export const expireQR = async (req, res) => {

    try {

        const session = await QRSession.findById(req.params.id);



        if (!session) {

            return res.status(404).json({

                success: false,

                message: "QR Session Not Found"

            });

        }



        session.status = "Expired";



        await session.save();



        res.status(200).json({

            success: true,

            message: "QR Expired Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




// ===============================
// Delete QR Session
// ===============================

export const deleteQR = async (req, res) => {

    try {

        const session = await QRSession.findByIdAndDelete(req.params.id);



        if (!session) {

            return res.status(404).json({

                success: false,

                message: "QR Session Not Found"

            });

        }



        res.status(200).json({

            success: true,

            message: "QR Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};