export const globalErrorHandler = (err, req, res, next) => {
    console.log("❌ ERROR:", err.name, "-", err.message);

    // لو خطأ Sequelize Validation، اعرض تفاصيل أوضح
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        const messages = err.errors.map(e => e.message);
        return res.status(400).json({ message: messages.join(", ") });
    }

    return res.status(err.statusCode || 500).json({
        message: err.message || "Something went wrong"
    });
};