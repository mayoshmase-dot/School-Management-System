import CourseOfferingModel from "../../../DB/models/courseOffering.model.js";
import { courseOfferingSchema } from "./courseOffering.validation.js";

export const getAll = async (req, res) => {
    const offerings = await CourseOfferingModel.findAll();
    return res.status(200).json({ message: "success", offerings });
};

export const getById = async (req, res) => {
    const { id } = req.params;
    const offering = await CourseOfferingModel.findByPk(id);
    if (!offering) {
        return res.status(404).json({ message: "CourseOffering not found" });
    }
    return res.status(200).json({ message: "success", offering });
};

export const createOffering = async (req, res) => {
    const { error } = courseOfferingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "error", error: error.details[0].message });
    }
    const offering = await CourseOfferingModel.create(req.body);
    return res.status(201).json({ message: "success", offering });
};

export const updateOffering = async (req, res) => {
    const { id } = req.params;
    const offering = await CourseOfferingModel.findByPk(id);
    if (!offering) {
        return res.status(404).json({ message: "CourseOffering not found" });
    }
    await offering.update(req.body);
    return res.status(200).json({ message: "success", offering });
};

export const deleteOffering = async (req, res) => {
    const { id } = req.params;
    const offering = await CourseOfferingModel.findByPk(id);
    if (!offering) {
        return res.status(404).json({ message: "CourseOffering not found" });
    }
    await offering.destroy();
    return res.status(200).json({ message: "CourseOffering deleted successfully" });
};