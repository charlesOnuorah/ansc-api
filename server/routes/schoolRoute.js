import express from 'express';
import { verifyToken, verifyIsAdminOrSuperAdminorEnumeratorAdmin, verifyIdExistsInParams } 
from "../middleware/authMiddleware";

import { validateSchoolForm } from "../middleware/schoolMiddleware";
import { createSchool, getAllSchool, getSchoolById } from "../controller/schoolController";

const router = express.Router()


router.post('/create_school', verifyToken, verifyIsAdminOrSuperAdminorEnumeratorAdmin,
    validateSchoolForm, createSchool )

router.get('/', verifyToken, verifyIsAdminOrSuperAdminorEnumeratorAdmin, getAllSchool)

router.get('/:id', verifyToken, verifyIsAdminOrSuperAdminorEnumeratorAdmin, verifyIdExistsInParams, 
getSchoolById)

export default router;