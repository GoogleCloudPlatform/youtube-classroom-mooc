const dbConnection = require('../common/connection');
const util = require('util');
const query = util.promisify(dbConnection.query).bind(dbConnection);

class EducatorEntity {

    static async createPlaylist(body) {
        const sql = `INSERT INTO playlist (title,educatorId) VALUES ('${body.title}',${body.educatorId});`;
        console.log(sql);
        /* dbConnection.query(sql, function (err, result, fields) {
            return result;
        });
 */     console.log(body.youtubeLinks);
        const data = await query(sql);
        const lastRowId = await query(`SELECT * FROM playlist where playlistId=${data.insertId};`);
        console.log('last row id' + JSON.stringify(lastRowId));

        body.youtubeLinks.forEach((link) => {
            dbConnection.query(`INSERT INTO video (playlistId,youtubeLink) VALUES (${lastRowId[0].playlistId},'${link}');`, function (err, result, fields) {
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
        const data = await query(`SELECT * FROM video where playlistId=${playlistId};`);
        return data;
    }

    static async createEducator(body) {
        const sql = `INSERT INTO educators (email,firstName,lastName) VALUES ('${body.email}','${body.firstName}','${body.lastName}');`;
        console.log(sql);
        try {
            const data = await query(sql);
            return data;
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return await query(`SELECT * FROM educators where email='${body.email}';`);
            }
            return err;
        }

    }

    static async assignTask(body) {
        const sql = `INSERT INTO tasks(taskName,playlistId,courseId,studentId) VALUES ('${body.taskName}',${body.playlistId},${body.courseId},${body.studentId});`;
        console.log(sql);
        const data = await query(sql);

        const lastRowId = await query(`SELECT * FROM tasks where taskId=${data.insertId};`);
        body.taskId = lastRowId[0].taskId;

        if (body.studentId&&body.courseId === null) {
            body.status = 'NotStarted';
            await this.taskStatus(body);
        }
        if (body.courseId&&body.studentId===null) {
            const students = await query(`SELECT * FROM students;`);
            dbConnection.query(
                'INSERT INTO tasks_status(taskId,studentId,status) VALUES ?',
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
            const sql = `INSERT INTO tasks_status(taskId,studentId,status) VALUES (${body.taskId},${body.studentId},'${body.status}');`;
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
            const sql = `UPDATE tasks_status SET status = '${status}' WHERE taskId = ${taskId};`;
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
            dbConnection.query(`INSERT INTO video (playlistId,youtubeLink) VALUES (${playlistId},'${link}');`, function (err, result, fields) {
                if (err) console.log('Insert video table:' + err)
            });
        })
        return await this.getPlaylist(playlistId);
    }


}
module.exports = EducatorEntity;