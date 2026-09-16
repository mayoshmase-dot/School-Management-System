import CourseOfferingModel from "../../../DB/models/courseOffering.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const getAll = asyncHandler(async (req, res) => {
    const offerings = await CourseOfferingModel.findAll();
    return res.status(200).json({ message: "success", offerings });
});

export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const offering = await CourseOfferingModel.findByPk(id);
    if (!offering) throw new AppError("CourseOffering not found", 404);
    return res.status(200).json({ message: "success", offering });
});

export const createOffering = asyncHandler(async (req, res) => {
    const offering = await CourseOfferingModel.create(req.body);
    return res.status(201).json({ message: "success", offering });
});

export const updateOffering = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const offering = await CourseOfferingModel.findByPk(id);
    if (!offering) throw new AppError("CourseOffering not found", 404);
    await offering.update(req.body);
    return res.status(200).json({ message: "success", offering });
});

export const deleteOffering = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const offering = await CourseOfferingModel.findByPk(id);
    if (!offering) throw new AppError("CourseOffering not found", 404);
    await offering.destroy();
    return res.status(200).json({ message: "CourseOffering deleted successfully" });
});