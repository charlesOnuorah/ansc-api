import express from "express";
import { verifyToken, verifyIdExistsInParams } from "../middleware/authMiddleware";
import { validateStudentForm } from "../middleware/studentMiddleware";
import { createStudent, getStudentsBySchool } from "../controller/studentController";

const router = express.Router()

router.post('/create_student', verifyToken, validateStudentForm, createStudent )
router.get('/:id', verifyToken, verifyIdExistsInParams, getStudentsBySchool)
export default router;