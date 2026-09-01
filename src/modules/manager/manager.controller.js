import ManagerModel from "../../../DB/models/manager.model.js";
import { managerSchema } from "./manager.validation.js";

export const getAll = async (req, res) => {
    const user = await ManagerModel.findAll();
    return res.status(200).json({ message: "success", user });
};

export const getById = async (req, res) => {
    const { id } = req.params;

    const manager = await ManagerModel.findByPk(id);
    if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ message: "success", manager });
};

export const createManager = async (req, res) => {
    const { error } = managerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const manager = await ManagerModel.create(req.body);
    return res.status(201).json({ message: "success", manager });
};

export const updateManager = async (req, res) => {
    const { id } = req.params;
    const manager = await ManagerModel.findByPk(id);
    if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
    }
    await manager.update(req.body);
    return res.status(200).json({ message: "success", manager });
};

export const deleteManager = async (req, res) => {
    const { id } = req.params;

    const manager = await ManagerModel.findByPk(id);
    if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
    }
    await manager.destroy();
    return res.status(200).json({ message: "Manager deleted successfully" });
};