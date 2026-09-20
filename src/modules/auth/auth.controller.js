import StudentModel from "../../../DB/models/student.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const student = await StudentModel.findOne({ where: { email } });
    if (student) {
        throw new AppError("Email already registered", 400);
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
    const CreateStudent = await StudentModel.create({ firstName, lastName, email, password: hashPassword });

    const token = jwt.sign({ email }, process.env.CONFIRM_EMAIL_SIGNAL);

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333;">Hello ${firstName} 👋</h2>
            <p style="color: #555; font-size: 15px;">
                Thank you for signing up with School Management System. Click the button below to verify your email address:
            </p>
            <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}" 
               style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; margin: 20px 0;">
                Verify Email
            </a>
            <p style="color: #999; font-size: 12px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                ${req.protocol}://${req.headers.host}/auth/verify/${token}
            </p>
        </div>
    `;

    await sendEmail(email, "Confirm your email", html);

    return res.status(201).json({ message: "success", CreateStudent });
});

export const confirmEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.CONFIRM_EMAIL_SIGNAL);

    const student = await StudentModel.findOne({ where: { email: decoded.email } });
    if (!student) {
        throw new AppError("Student not found", 404);
    }

    await student.update({ confirmEmail: true });
    return res.status(200).json({ message: "Email confirmed successfully" });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const student = await StudentModel.findOne({ where: { email } });
    if (!student) {
        throw new AppError("Invalid data", 400);
    }
    if (!student.confirmEmail) {
        throw new AppError("Please confirm your email", 400);
    }
    if (student.status == "not_active") {
        throw new AppError("Your account is blocked", 400);
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
        throw new AppError("Invalid data", 400);
    }

    const token = jwt.sign({ id: student.id }, process.env.LOGIN_SIGNAL);
    return res.status(200).json({ message: "success", token });
});

export const sendCode = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const student = await StudentModel.findOne({ where: { email } });
    if (!student) {
        throw new AppError("Student not found", 404);
    }

    const code = customAlphabet('1234567890abcdefABCDEF', 4)();
    await student.update({ sendCode: code });

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333;">Hello ${student.firstName} 👋</h2>
            <p style="color: #555; font-size: 15px;">
                You requested to reset your password. Use the code below to proceed:
            </p>
            <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                ${code}
            </div>
            <p style="color: #999; font-size: 12px;">
                This code will expire soon. If you didn't request this, please ignore this email.
            </p>
        </div>
    `;

    await sendEmail(email, "Reset Password Code", html);
    return res.status(200).json({ message: "success" });
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { code, password, email } = req.body;

    const student = await StudentModel.findOne({ where: { email } });
    if (!student) {
        throw new AppError("Student not found", 404);
    }

    if (student.sendCode != code) {
        throw new AppError("Invalid code", 400);
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
    student.password = hashPassword;
    student.sendCode = null;
    await student.save();

    return res.status(200).json({ message: "success" });
});