import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { validateTeacherForm } from "../middleware/teacherMiddleware";
import { createTeacher } from "../controller/teacherController";
const router = express.Router();

router.post('/create_teacher',verifyToken, validateTeacherForm, createTeacher)

export default router;