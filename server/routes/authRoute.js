import express from "express";
import { validateUsernamePassword } from "../middleware/authMiddleware";
import { loginUserWithUsernamePassword } from "../controller/authController";
const router = express.Router()

/**
 * @swagger
 * /api/puppies:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */

 
router.post('/signin',validateUsernamePassword, loginUserWithUsernamePassword )

export default router