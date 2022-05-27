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

    static async fetchStudentAnalytics(req, res, next) {
        try {
            const data = await StudentEntity.fetchStudentAnalytics(req.params.studentId);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async createStudentAnalytics(req, res, next) {
        try {
            const data = await StudentEntity.createStudentAnalytics(req.body);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async updateStudentAnalytics(req, res, next) {
        try {
            const data = await StudentEntity.updateStudentAnalytics(req.params.id, req.body);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async fetchStudentAnalyticsByClassroomTaskId(req, res, next) {
        try {
            const data = await StudentEntity.fetchStudentAnalyticsByClassroomTaskId(req.params.studentId, req.params.classRoomTaskId);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }


    static async getStudentByEmail(req, res, next) {
        try {
            const data = await StudentEntity.getStudentByEmail(req.params.email);
            if (data.length > 0) {
                res.status(200).send(data[0]);
            } else {
                res.status(400).send(data);
            }

        } catch (err) {
            next(err);
        }

    }

    static async addGoogleUser(req, res, next) {
        try {
            const token = req.get('Authorization');
            const data = await StudentEntity.addGoogleUser(token, req.params.userType);
            res.send(data).status(201);
        } catch (error) {
            res.status(400).send(data);
            next();
        }

    }

    static async fetchStudentAnalyticsByCourseId(req, res, next) {
        try {
            const data = await StudentEntity.fetchStudentAnalyticsByCourseId(req.params.studentId, req.params.courseId);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }

    static async getStudentCourses(req, res, next) {
        try {
            const data = await StudentEntity.getStudentCourses();
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StudentController;