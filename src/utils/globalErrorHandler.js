export const globalErrorHandler = (err, req, res, next) => {
    console.log("❌ ERROR:", err.name, "-", err.message);

    return res.status(err.statusCode || 500).json({
        message: err.message || "Something went wrong"
    });
};