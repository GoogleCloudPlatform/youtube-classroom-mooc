const StudentEntity = require('../entity/studentEntity');


class StudentController {

    static async createStudent(req, res, next) {
        try {
            const data = await StudentEntity.createStudent(req.body);
            if (data.affectedRows && data.affectedRows > 0) {
                res.status(201).send(data);
            } else if (data.length > 0) {
                res.status(200).send(data[0]);
            } else {
                res.status(400).send(data);
            }

        } catch (err) {
            next(err);
        }
    }

    static async getStudentTasks(req, res, next) {
        try {
            const data = await StudentEntity.getStudentTasks(req.params.studentId, req.params.status);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async fetchStudentAnalytics(req,res,next){
        try {
            const data = await StudentEntity.fetchStudentAnalytics(req.params.studentId);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async createStudentAnalytics(req,res,next){
        try {
            const data = await StudentEntity.createStudentAnalytics(req.body);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async updateStudentAnalytics(req,res,next){
        try {
            const data = await StudentEntity.updateStudentAnalytics(req.params.studentId,req.body);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StudentController;