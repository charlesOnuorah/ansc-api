import express from "express";
import { verifyToken, verifyIdExistsInParams } from "../middleware/authMiddleware";
import { validateTeacherForm } from "../middleware/teacherMiddleware";
import { createTeacher, getAllTeacherBySchool, getTeacherById } from "../controller/teacherController";
const router = express.Router();

router.post('/create_teacher',verifyToken, validateTeacherForm, createTeacher)
router.get('/school/:id', verifyToken,verifyIdExistsInParams, getAllTeacherBySchool)
router.get('/:id', verifyToken, verifyIdExistsInParams, getTeacherById)

export default router;