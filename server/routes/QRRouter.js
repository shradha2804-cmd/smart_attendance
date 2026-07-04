import express from "express";

import {

    generateQR,
    getAllQRSessions,
    getActiveQR,
    expireQR,
    deleteQR

} from "../controller/QRController.js";

const QRRouter = express.Router();



// Generate QR

QRRouter.post("/generate", generateQR);



// Get All QR

QRRouter.get("/", getAllQRSessions);



// Active QR

QRRouter.get("/active", getActiveQR);



// Expire QR

QRRouter.put("/expire/:id", expireQR);



// Delete QR

QRRouter.delete("/:id", deleteQR);

export default QRRouter;