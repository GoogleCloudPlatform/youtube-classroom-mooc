const router = require('express').Router();

const EducatorController =require('../controller/educatorController');

/**
 * @swagger
 * /test:
 *  get:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: test api
 *      description: test swagger api
 *      responses:
 *          200:
 *             description: "Successfull operation"
 */
router.get('/test',(req,res)=>{
    res.send("Hello world");
});

/**
 * @swagger
 * /playlist:
 *  post:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: Create new playlist
 *      description: API to Create new playlist
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      title:
 *                        type: "string"
 *                        example: "playlist1"
 *                      educatorId:
 *                         type: "integer"
 *                         example: "1"
 *                      youtubeLinks:
 *                          type: "array"
 *                          example: ["https://link.com","https://example.com"]
 *      responses:
 *          201:
 *              description: "Successfull operation"
 */
router.post('/playlist', EducatorController.createPlaylist);

/**
 * @swagger
 * /playlist/{playlistId}/videos:
 *  post:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: Add videos to existing playlist
 *      description: API to Add videos to existing playlist
 *      parameters:
 *          - in: path
 *            name: playlistId
 *            required: true
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      youtubeLinks:
 *                          type: "array"
 *                          example: ["https://link.com","https://example.com"]
 *      responses:
 *          201:
 *              description: "Successfull operation"
 */
 router.post('/playlist/:playlistId/videos', EducatorController.addVideosToPlaylist);

/**
 * @swagger
 * /playlist:
 *  get:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: List playlist
 *      description: API to list all playlist
 *      responses:
 *          201:
 *              description: "Successfull operation"
 */
 router.get('/playlist', EducatorController.getAllPlaylist);

 /**
 * @swagger
 * /playlist/{playlistId}/videos:
 *  get:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: List playlist videos
 *      description: API to list playlist videos
 *      parameters:
 *              - in: path
 *                name: playlistId
 *                required: true
 *      responses:
 *          201:
 *              description: "Successfull operation"
 */
  router.get('/playlist/:playlistId/videos', EducatorController.getPlaylist);


/**
 * @swagger
 * /educator:
 *  post:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: Create new educator
 *      description: Creating a new educator
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      email:
 *                          type: "string"
 *                          example: "edu@google.com"
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
router.post('/educator',EducatorController.createEducator);



/**
 * @swagger
 * /assignTask:
 *  post:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: Create and Assign new task to a student or class
 *      description: Creating a new task
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      taskName:
 *                          type: "String"
 *                          example: "Story writing"
 *                      playlistId:
 *                          type: "integer"
 *                          example: "1"
 *                      courseId:
 *                          type: "integer"
 *                          example: "10"
 *                      studentId:
 *                          type: "integer"
 *                          example: "16"
 *      responses:
 *             201:
 *                description: "Successfully created"
 */
router.post('/assignTask',EducatorController.assignTask);


/**
 * @swagger
 * /taskStatus:
 *  post:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: Add task status of a student
 *      description: Add task status to a student
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                      taskId:
 *                          type: "integer"
 *                          example: "1"
 *                      studentId:
 *                          type: "integer"
 *                          example: "16"
 *                      status:
 *                          type: "string"
 *                          enum:
 *                              - Not started
 *                              - Inprogress
 *                              - Completed
 *      responses:
 *             201:
 *                description: "Successfully created"
 */
router.post('/taskStatus',EducatorController.taskStatus);

/**
 * @swagger
 * /taskStatus/{taskId}/{status}:
 *  put:
 *      tags:
 *          - Educator
 *      security: []
 *      summary: Update task status
 *      description: Update task status to a student
 *      parameters:
 *              - in: path
 *                name: taskId
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
 *                description: "Updated Successfully"
 */
router.put('/taskStatus/:taskId/:status',EducatorController.updateTaskStatus);

module.exports = router;