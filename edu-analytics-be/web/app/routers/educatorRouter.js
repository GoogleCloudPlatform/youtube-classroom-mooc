const router = require('express').Router();


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

module.exports = router;