import ManagerModel from "../../../DB/models/manager.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getAll = asyncHandler(async (req, res) => {
    const user = await ManagerModel.findAll();
    return res.status(200).json({ message: "success", user });
});

export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const manager = await ManagerModel.findByPk(id);
    if (!manager) throw new AppError("Manager not found", 404);
    return res.status(200).json({ message: "success", manager });
});

export const createManager = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
    const manager = await ManagerModel.create({ firstName, lastName, email, password: hashPassword });
    return res.status(201).json({ message: "success", manager });
});

export const loginManger = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const manager = await ManagerModel.findOne({ where: { email } });
    if (!manager) {
        throw new AppError("Invalid data", 400);
    }
    const match = await bcrypt.compare(password, manager.password);
    if (!match) {
        throw new AppError("Invalid data", 400);
    }

    const token = jwt.sign({ id: manager.id , role: "manager" }, process.env.LOGIN_SIGNAL);
    return res.status(200).json({ message: "success", token });
});

export const updateManager = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const manager = await ManagerModel.findByPk(id);
    if (!manager) throw new AppError("Manager not found", 404);
    await manager.update(req.body);
    return res.status(200).json({ message: "success", manager });
});

export const deleteManager = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const manager = await ManagerModel.findByPk(id);
    if (!manager) throw new AppError("Manager not found", 404);
    await manager.destroy();
    return res.status(200).json({ message: "Manager deleted successfully" });
});