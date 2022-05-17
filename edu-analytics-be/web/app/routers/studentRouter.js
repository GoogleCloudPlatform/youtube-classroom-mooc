const router = require('express').Router();

const StudentController =require('../controller/studentController');


/**
 * @swagger
 * /student:
 *  post:
 *      tags:
 *          - Student
 *      security: []
 *      summary: Create new student
 *      description: Creating a new student
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      email:
 *                          type: "string"
 *                          example: "std@google.com"
 *                      firstName:
 *                          type: "string"
 *                          example: "John"
 *                      lastName:
 *                          type: "string"
 *                          example: "C"
 *      responses:
 *             201:
 *                description: "Successfully created"
 */ 
 router.post('/student',StudentController.createStudent);

 /**
 * @swagger
 * /student/{studentId}/tasks/{status}:
 *  get:
 *      tags:
 *          - Student
 *      security: []
 *      summary: Fetch tasks for a student
 *      description: Fetch tasks for student
 *      parameters:
 *              - in: path
 *                name: studentId
 *                required: true
 *              - in: path
 *                name: status
 *                required: true
 *                enum:
 *                    - NotStarted
 *                    - Inprogress
 *                    - Completed
 *      responses:
 *             200:
 *                description: "Success"
 */
router.get('/student/:studentId/tasks/:status',StudentController.getStudentTasks);

module.exports = router;