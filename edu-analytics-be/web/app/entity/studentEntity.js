const dbConnection = require('../common/connection');
const util = require('util');
const query = util.promisify(dbConnection.query).bind(dbConnection);

class StudentEntity {
    static async createStudent(body) {
        const sql = `INSERT INTO students (Email,FirstName,LastName) VALUES ('${body.email}','${body.firstName}','${body.lastName}');`;
        console.log(sql);
        try {
            const data = await query(sql);
            return data;
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return await query(`SELECT * FROM students where Email='${body.email}';`);
            }
            return err;
        }

    }

    static async getStudentTasks(studentId, status) {
        const sql = `select A.* from video A where A.PlaylistId in (select B.PlaylistId from tasks B where B.TaskId in
             (select C.TaskId from tasks_status C where StudentId=${studentId} and Status='${status}'));`;
        const data = await query(sql);
        return data;
    }
}
module.exports = StudentEntity;