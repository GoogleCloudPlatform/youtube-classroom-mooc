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

/**
 * @swagger
 * /student/{studentId}/analytics:
 *  get:
 *      tags:
 *          - Student
 *      security: []
 *      summary: Student analytics
 *      description: Student anayltics
 *      parameters:
 *              - in: path
 *                name: studentId
 *                required: true
 *      responses:
 *             200:
 *                description: "Success"
 */
 router.get('/student/:studentId/:analytics',StudentController.fetchStudentAnalytics);


 /**
 * @swagger
 * /student/analytics:
 *  post:
 *      tags:
 *          - Student
 *      security: []
 *      summary: Create student analytics
 *      description: Creating student analytics
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      videoId:
 *                          type: "string"
 *                          example: "123"
 *                      playlistId:
 *                          type: "integer"
 *                          example: "123"
 *                      studentId:
 *                          type: "integer"
 *                          example: "124"
 *                      taskStatus:
 *                          type: "string"
 *                          example: "Inprogress"
 *                      videoStatus:
 *                          type: "string"
 *                          example: "124"
 *      responses:
 *             201:
 *                description: "Successfully created"
 */ 
  router.post('/student/analytics',StudentController.createStudentAnalytics);



  /**
 * @swagger
 * /student/{studentId}/analytics:
 *  put:
 *      tags:
 *          - Student
 *      security: []
 *      summary: Update student analytics
 *      description: Update student analytics
 *      parameters:
 *          - in: path
 *            name: studentId
 *            required: true
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      videoId:
 *                          type: "string"
 *                          example: "123https"
 *                      taskStatus:
 *                          type: "string"
 *                          example: "Inprogress"
 *                      videoStatus:
 *                          type: "string"
 *                          example: "124"
 *      responses:
 *             201:
 *                description: "Successfully created"
 */ 
   router.put('/student/:studentId/analytics',StudentController.updateStudentAnalytics);

module.exports = router;