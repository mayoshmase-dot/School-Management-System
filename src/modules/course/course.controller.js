import CourseModel from "../../../DB/models/course.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const getAll = asyncHandler(async (req, res) => {
    const courses = await CourseModel.findAll();
    return res.status(200).json({ message: "success", courses });
});

export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await CourseModel.findByPk(id);
    if (!course) throw new AppError("Course not found", 404);
    return res.status(200).json({ message: "success", course });
});

export const createCourse = asyncHandler(async (req, res) => {
    const course = await CourseModel.create(req.body);
    return res.status(201).json({ message: "success", course });
});

export const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await CourseModel.findByPk(id);
    if (!course) throw new AppError("Course not found", 404);
    await course.update(req.body);
    return res.status(200).json({ message: "success", course });
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await CourseModel.findByPk(id);
    if (!course) throw new AppError("Course not found", 404);
    await course.destroy();
    return res.status(200).json({ message: "Course deleted successfully" });
});

export const addPrerequisite = asyncHandler(async (req, res) => {
    const { courseId, prerequisiteId } = req.body;

    const course = await CourseModel.findByPk(courseId);
    const prerequisite = await CourseModel.findByPk(prerequisiteId);

    if (!course || !prerequisite) throw new AppError("Course or Prerequisite not found", 404);
    if (courseId == prerequisiteId) throw new AppError("A course cannot be its own prerequisite", 400);

    await course.addPrerequisite(prerequisite);
    return res.status(200).json({ message: "Prerequisite added successfully" });
});

export const getCourseWithPrerequisites = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await CourseModel.findByPk(id, {
        include: [
            { model: CourseModel, as: "prerequisites" },
            { model: CourseModel, as: "requiredFor" }
        ]
    });

    if (!course) throw new AppError("Course not found", 404);
    return res.status(200).json({ message: "success", course });
});

export const removePrerequisite = asyncHandler(async (req, res) => {
    const { courseId, prerequisiteId } = req.body;

    const course = await CourseModel.findByPk(courseId);
    const prerequisite = await CourseModel.findByPk(prerequisiteId);

    if (!course || !prerequisite) throw new AppError("Course or Prerequisite not found", 404);

    await course.removePrerequisite(prerequisite);
    return res.status(200).json({ message: "Prerequisite removed successfully" });
});