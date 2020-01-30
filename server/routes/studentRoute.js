import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { validateStudentForm } from "../middleware/studentMiddleware";
import { createStudent } from "../controller/studentController";

const router = express.Router()

router.post('/create_student', verifyToken, validateStudentForm, createStudent )

export default router;