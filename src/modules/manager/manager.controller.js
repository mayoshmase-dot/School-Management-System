import ManagerModel from "../../../DB/models/manager.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

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
    const manager = await ManagerModel.create(req.body);
    return res.status(201).json({ message: "success", manager });
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