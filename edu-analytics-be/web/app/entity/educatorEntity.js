const dbConnection = require('../common/connection');
const util = require('util');
const query = util.promisify(dbConnection.query).bind(dbConnection);

class EducatorEntity {

    static async createPlaylist(body) {
        const sql = `INSERT INTO playlist (Title,EducatorId) VALUES ('${body.title}',${body.educatorId});`;
        console.log(sql);
        /* dbConnection.query(sql, function (err, result, fields) {
            return result;
        });
 */     console.log(body.youtubeLinks);
        const data = await query(sql);
        const lastRowId = await query(`SELECT * FROM playlist where PlaylistId=${data.insertId};`);
        console.log('last row id' + JSON.stringify(lastRowId));

        body.youtubeLinks.forEach((link) => {
            dbConnection.query(`INSERT INTO video (PlaylistId,YoutubeLink) VALUES (${lastRowId[0].PlaylistId},'${link}');`, function (err, result, fields) {
                if (err) console.log('Insert video table:' + err)
            });
        })


        return lastRowId;
    }

    static async getAllPlaylist() {
        const data = await query('SELECT * FROM playlist;');
        return data;
    }

    static async getPlaylist(playlistId) {
        const data = await query(`SELECT * FROM video where PlaylistId=${playlistId};`);
        return data;
    }

    static async createEducator(body) {
        const sql = `INSERT INTO educators (Email,FirstName,LastName) VALUES ('${body.email}','${body.firstName}','${body.lastName}');`;
        console.log(sql);
        try {
            const data = await query(sql);
            return data;
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return await query(`SELECT * FROM educators where Email='${body.email}';`);
            }
            return err;
        }

    }

    static async assignTask(body) {
        const sql = `INSERT INTO tasks(TaskName,PlaylistId,courseId,StudentId) VALUES ('${body.taskName}',${body.playlistId},${body.courseId},${body.studentId});`;
        console.log(sql);
        const data = await query(sql);

        const lastRowId = await query(`SELECT * FROM tasks where TaskId=${data.insertId};`);
        body.taskId = lastRowId[0].TaskId;

        if (body.studentId) {
            body.status = 'NotStarted';
            await this.taskStatus(body);
        }
        if (body.courseId != null) {
            const students = await query(`SELECT * FROM students;`);
            dbConnection.query(
                'INSERT INTO tasks_status(TaskId,StudentId,Status) VALUES ?',
                [students.map(item => [body.taskId, item.StudentId, 'NotStarted'])],
                (error, results) => {
                    console.log(error)
                }
            );
        }
        return data;
    }

    static async taskStatus(body) {
        if (body.status === 'NotStarted' || body.status === 'Inprogress' || body.status === 'Completed') {
            const sql = `INSERT INTO tasks_status(TaskId,StudentId,Status) VALUES (${body.taskId},${body.studentId},'${body.status}');`;
            console.log(sql);
            const data = await query(sql);
            return data;
        } else {
            return {
                status: 400,
                reason: "Invalid task status"
            }
        }

    }

    static async updateTaskStatus(taskId, status) {
        if (status === 'NotStarted' || status === 'Inprogress' || status === 'Completed') {
            const sql = `UPDATE tasks_status SET Status = '${status}' WHERE TaskId = ${taskId};`;
            console.log(sql);
            const data = await query(sql);
            console.log(data);
            return data;
        } else {
            return {
                status: 400,
                reason: "Invalid task status"
            }
        }

    }

    static async addVideosToPlaylist(playlistId, body) {
        body.youtubeLinks.forEach((link) => {
            dbConnection.query(`INSERT INTO video (PlaylistId,YoutubeLink) VALUES (${playlistId},'${link}');`, function (err, result, fields) {
                if (err) console.log('Insert video table:' + err)
            });
        })
        return await this.getPlaylist(playlistId);
    }


}
module.exports = EducatorEntity;