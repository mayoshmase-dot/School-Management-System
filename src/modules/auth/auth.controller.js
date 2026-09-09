import CourseModel from "../../../DB/models/course.model.js";
import StudentModel from "../../../DB/models/student.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { firstName , lastName, email, password } = req.body;
    const student = await StudentModel.findOne({ where: { email } });
    if (student) {
        return res.status(400).json({ message: "email already regiter" });
    }
    const hashPassword =  bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
    const CreateStudent = await StudentModel.create({firstName,lastName , email , password:hashPassword})
    const token = jwt.sign({email},process.env.CONFIRM_EMAIL_SIGNAL)
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
export const confirmEmail = async (req,res)=>{
    const {token} = req.params
    const decoded = jwt.verify(token,process.env.CONFIRM_EMAIL_SIGNAL)
    const student = await StudentModel.findOne({ where: { email: decoded.email } });
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    await student.update({ confirmEmail: true });

    return res.status(200).json({ message: "Email confirmed successfully" });
};
