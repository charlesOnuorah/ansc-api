import express from "express";
import { verifyToken, verifyIdExistsInParams } from "../middleware/authMiddleware";
import { validateStudentForm } from "../middleware/studentMiddleware";
import { createStudent, getStudentsBySchool, getStudentById } from "../controller/studentController";

const router = express.Router()

router.post('/create_student', verifyToken, validateStudentForm, createStudent )
router.get('/school/:id', verifyToken, verifyIdExistsInParams, getStudentsBySchool)
router.get('/:id', verifyToken, verifyIdExistsInParams, getStudentById)

export default router;