import StudentModel from "../../../DB/models/student.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken"
import { customAlphabet } from "nanoid";

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const student = await StudentModel.findOne({ where: { email } });
    if (student) {
        return res.status(400).json({ message: "email already register" });
    }
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    const CreateStudent = await StudentModel.create({ firstName, lastName, email, password: hashPassword })
    const token = jwt.sign({ email }, process.env.CONFIRM_EMAIL_SIGNAL)
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
};
export const confirmEmail = async (req, res) => {
    const { token } = req.params
    const decoded = jwt.verify(token, process.env.CONFIRM_EMAIL_SIGNAL)
    const student = await StudentModel.findOne({ where: { email: decoded.email } });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    await student.update({ confirmEmail: true });

    return res.status(200).json({ message: "Email confirmed successfully" });
};
export const login = async (req, res) => {
    const {email, password } = req.body;
    const student = await StudentModel.findOne({ where: { email } });
    if (!student) {
        return res.status(400).json({ message: "invalid data" });
    }
    if(!student.confirmEmail){
        return res.status(400).json({ message: "plz confirm your email" });
    }
    if(student.status=="not_active"){
        return res.status(400).json({ message: "your account is blocked" });
    }
    const match = await bcrypt.compare(password,student.password)
    if(!match){
    return res.status(400).json({ message: "invalid data" });
    }
    const token = jwt.sign({id:student.id }, process.env.LOGIN_SIGNAL)
    return res.status(200).json({ message: "success", token });
};
export const sendCode = async (req, res) => {
  const { email } = req.body;

        const student = await StudentModel.findOne({ where: { email } });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
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
};
export const resetPassword = async (req, res) => {
  const { code,password,email } = req.body;

        const student = await StudentModel.findOne({ where: { email } });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
if (student.sendCode != code) {
            return res.status(404).json({ message: "invalid code" });
        }
        const hashPassword = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
student.password = hashPassword
        await student.sendCode == null;
        await student.save()
        return res.status(200).json({ message: "success" });
};