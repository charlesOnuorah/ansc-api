import express from 'express';
import { verifyToken, verifyIsAdminOrSuperAdminorEnumeratorAdmin } 
from "../middleware/authMiddleware";

import { validateSchoolForm } from "../middleware/schoolMiddleware";
import { createSchool } from "../controller/schoolController";

const router = express.Router()


router.post('/create_school', verifyToken, verifyIsAdminOrSuperAdminorEnumeratorAdmin,
    validateSchoolForm, createSchool )

export default router;