import express from "express"
import userAuth from "../middlewares/authmiddleware.js";
import { updateUserController } from "../controllers/userController.js";


const router=express.Router();
/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's first name.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: john.doe@example.com
 *               location:
 *                 type: string
 *                 description: User's location.
 *                 example: New York
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The updated user details.
 *                   properties:
 *                     name:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     location:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: The updated JWT token.
 *       400:
 *         description: Bad request. All fields are required.
 *       404:
 *         description: User not found.
 */
router.put('/update-user',userAuth,updateUserController)

export default router