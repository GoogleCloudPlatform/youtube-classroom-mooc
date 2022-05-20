const dbConnection = require('../common/connection');
const util = require('util');
const query = util.promisify(dbConnection.query).bind(dbConnection);

class StudentEntity {
    static async createStudent(body) {
        const sql = `INSERT INTO students (email,firstName,lastName) VALUES ('${body.email}','${body.firstName}','${body.lastName}');`;
        console.log(sql);
        try {
            const data = await query(sql);
            return data;
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return await query(`SELECT * FROM students where email='${body.email}';`);
            }
            return err;
        }

    }

    static async getStudentTasks(studentId, status) {
        const sql = `select A.* from video A where A.playlistId in (select B.playlistId from tasks B where B.taskId in
             (select C.taskId from tasks_status C where studentId=${studentId} and status='${status}'));`;
        const data = await query(sql);
        return data;
    }

    static async fetchStudentAnalytics(studentId) {
        const sql = `SELECT student_analytics.*,video.youtubeLink AS youtubeLink FROM student_analytics JOIN video ON student_analytics.videoId=video.videoId WHERE student_analytics.studentId=${studentId} and video.videoId = student_analytics.videoId;`;
        const data = await query(sql);
        return data;
    }

    static async createStudentAnalytics(body) {
        const sql = `INSERT INTO student_analytics (videoId,studentId,taskStatus,videoStatus) VALUES ('${body.videoId}',${body.studentId},'${body.taskStatus}','${body.videoStatus}');`;
        console.log(sql);
        try {
            const data = await query(sql);
            return data;
        } catch (err) {
            return err;
        }
    }

    static async updateStudentAnalytics(studentId,body) {
        const sql = `UPDATE student_analytics SET taskStatus = '${body.taskStatus}', videoStatus = '${body.videoStatus}' WHERE studentId=${studentId} and videoId='${body.videoId}';`;
        console.log(sql);
        try {
            const data = await query(sql);
            return data;
        } catch (err) {
            return err;
        }
    }
}
module.exports = StudentEntity;