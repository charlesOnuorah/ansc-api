import express from "express";
import { validateUsernamePassword, verifyToken, verifyIsAdminOrSuperAdmin, verifyAgentCreationModel
 } from "../middleware/authMiddleware";
import { loginUserWithUsernamePassword, createAgent, getLGAMappedToUser, getStates,
    getOwners } from "../controller/authController";
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

 
router.post('/signin',validateUsernamePassword, loginUserWithUsernamePassword );

router.post('/agents/signup',verifyToken, verifyIsAdminOrSuperAdmin,
    verifyAgentCreationModel,createAgent )

router.get('/lga', verifyToken, getLGAMappedToUser);

router.get('/states', getStates)

router.get('/owners', getOwners)

export default router