import QRCode from "qrcode";

const generateQRCode = async (token) => {
    try {

        const qrImage = await QRCode.toDataURL(token);

        return qrImage;

    } catch (error) {

        throw error;

    }
};

export default generateQRCode;