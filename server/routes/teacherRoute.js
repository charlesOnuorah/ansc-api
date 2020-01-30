import express from "express";
import { verifyToken, verifyIdExistsInParams } from "../middleware/authMiddleware";
import { validateTeacherForm } from "../middleware/teacherMiddleware";
import { createTeacher, getAllTeacherBySchool } from "../controller/teacherController";
const router = express.Router();

router.post('/create_teacher',verifyToken, validateTeacherForm, createTeacher)
router.get('/:id', verifyToken,verifyIdExistsInParams, getAllTeacherBySchool)

export default router;