const sendResponse = (res, message, data) => {
    res.json({
        success: true,
        message: message,
        data: data
    });
};

const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        message: message
    });
};
export {sendResponse,sendErrorResponse}