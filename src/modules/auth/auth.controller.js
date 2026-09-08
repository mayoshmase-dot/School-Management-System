import CourseModel from "../../../DB/models/course.model.js";
import StudentModel from "../../../DB/models/student.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const { firstName , lastName, email, password } = req.body;
    const student = await StudentModel.findOne({ where: { email } });
    if (student) {
        return res.status(400).json({ message: "email already regiter" });
    }
    const hashPassword =  bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
    const CreateStudent = await StudentModel.create({firstName,lastName , email , password:hashPassword})
    return res.status(200).json({ message: "success", CreateStudent });
};
