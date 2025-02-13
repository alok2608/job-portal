import express from 'express';
import userAuth from '../middlewares/authmiddleware.js';
import 
{ createJobController ,deletejobController,
    getAllJobsController,
    getJobStatsController,
    updateJobController
} 
    from '../controllers/jobsController.js';
const router=express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         company:
 *           type: string
 *           description: The name of the company.
 *         position:
 *           type: string
 *           description: The job position.
 *         status:
 *           type: string
 *           enum: ['pending', 'reject', 'interview']
 *           default: 'pending'
 *           description: Job application status.
 *         workType:
 *           type: string
 *           enum: ['full-time', 'part-time', 'freelance']
 *           default: 'full-time'
 *           description: Type of job.
 *         worklocation:
 *           type: string
 *           description: The location of the job.
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the job.
 *       example:
 *         company: "Tech Corp"
 *         position: "Software Engineer"
 *         status: "pending"
 *         workType: "full-time"
 *         worklocation: "Remote"
 *         createdBy: "64b123c56b75f32a84d33a23"
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 */
router.post('/create-job',userAuth,createJobController)
/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         company:
 *           type: string
 *           description: The name of the company.
 *         position:
 *           type: string
 *           description: The job position.
 *         status:
 *           type: string
 *           enum: ['pending', 'reject', 'interview']
 *           default: 'pending'
 *           description: Job application status.
 *         workType:
 *           type: string
 *           enum: ['full-time', 'part-time', 'freelance']
 *           default: 'full-time'
 *           description: Type of job.
 *         worklocation:
 *           type: string
 *           description: The location of the job.
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the job.
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['pending', 'reject', 'interview', 'all']
 *         description: Filter jobs by status.
 *       - in: query
 *         name: workType
 *         schema:
 *           type: string
 *           enum: ['full-time', 'part-time', 'freelance', 'all']
 *         description: Filter jobs by work type.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search jobs by position (case-insensitive).
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['latest', 'oldest', 'a-z', 'z-a']
 *         description: Sort jobs by creation date or position.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page.
 *     responses:
 *       200:
 *         description: Successful response with the list of jobs and pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totaljob:
 *                   type: integer
 *                   description: Total number of jobs.
 *                 nofpage:
 *                   type: integer
 *                   description: Number of pages.
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request.
 */
router.get('/get-job',userAuth,getAllJobsController);
/**
 * @swagger
 * components:
 *   schemas:
 *     JobUpdate:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         company:
 *           type: string
 *           description: The updated name of the company.
 *         position:
 *           type: string
 *           description: The updated job position.
 *         status:
 *           type: string
 *           enum: ['pending', 'reject', 'interview']
 *           description: The updated job application status.
 *         workType:
 *           type: string
 *           enum: ['full-time', 'part-time', 'freelance']
 *           description: The updated work type.
 *         worklocation:
 *           type: string
 *           description: The updated work location.
 */

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update an existing job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobUpdate'
 *     responses:
 *       200:
 *         description: Job updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updateJob:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Job not found.
 *       403:
 *         description: Not authorized to update this job.
 */
router.patch("/update-job/:id",userAuth,updateJobController);
/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID to delete.
 *     responses:
 *       200:
 *         description: Job deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message for the job deletion.
 *       404:
 *         description: Job not found.
 *       403:
 *         description: Not authorized to delete the job.
 */
router.delete("/delete-job/:id",userAuth,deletejobController);
/**
 * @swagger
 * /jobs/stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Job statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJob:
 *                   type: number
 *                   description: The total number of jobs created by the user.
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The job status.
 *                       count:
 *                         type: number
 *                         description: The number of jobs in that status.
 *                 defaultstats:
 *                   type: object
 *                   properties:
 *                     pending:
 *                       type: number
 *                       description: The number of pending jobs.
 *                     reject:
 *                       type: number
 *                       description: The number of rejected jobs.
 *                     interview:
 *                       type: number
 *                       description: The number of interview-stage jobs.
 *                 monthlyApplication:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         description: The month and year of the job applications.
 *                       count:
 *                         type: number
 *                         description: The number of job applications in that month.
 *       404:
 *         description: No job statistics found for this user.
 */
router.get("/job-stats",userAuth,getJobStatsController)

export default router;