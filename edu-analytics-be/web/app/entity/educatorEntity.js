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

        body.playlists.forEach((video) => {
            const insertQuery = `INSERT INTO video (videoId,playlistId,title,description,channelTitle,thumbnail,youtubeLink,duration) VALUES ('${video.videoId}',${lastRowId[0].playlistId},'${video.title}','${video.description}','${video.channelTitle}','${video.thumbnail}','${video.youtubeLink ? video.youtubeLink : null}','${video.duration}');`;
            dbConnection.query(insertQuery, function (err, result, fields) {
                if (err) console.log('Insert video table:' + err)
            });
        })


        return lastRowId;
    }

    static async getAllVideos(playlistId) {
        dbConnection.query(`SELECT * FROM video where playlistId=${playlistId};`, function (err, result, fields) {
            return result;
        });
    }

    static async getAllPlaylist() {
        const data = await query('SELECT * FROM playlist;');
        const respArray = [];
        for (let i = 0; i < data.length; i++) {
            const response = {
                playlistId: data[i].playlistId,
                title: data[i].title,
                videos: Object.values(JSON.parse(JSON.stringify(await this.getPlaylist(data[i].playlistId)))),
                count: Object.values(JSON.parse(JSON.stringify(await this.getPlaylist(data[i].playlistId)))).length
            }
            respArray.push(response);
        }


        return respArray;
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
        const sql = `INSERT INTO tasks(taskName,playlistId,courseId,studentId,classRoomTaskId) VALUES ('${body.taskName}',${body.playlistId},'${body.courseId}',${body.studentId ? body.studentId : null},'${body.classRoomTaskId}');`;
        console.log(sql);
        const data = await query(sql);

        const lastRowId = await query(`SELECT * FROM tasks where taskId=${data.insertId};`);
        body.taskId = lastRowId[0].taskId;
        const playlistId = body.playlistId;

        if (body.studentId && (body.courseId === null || body.courseId === undefined)) {
            body.status = 'NotStarted';
            await this.taskStatus(body);
        }
        if (body.courseId && (body.studentId === null || body.studentId === undefined)) {
            const students = await query(`SELECT * FROM students;`);
            dbConnection.query(
                'INSERT INTO tasks_status(taskId,studentId,status,courseId,classRoomTaskId) VALUES ?',
                [students.map(item => [body.taskId, item.studentId, 'NotStarted', body.courseId, body.classRoomTaskId])],
                (error, results) => {
                    console.log(error)
                }
            );

            const videos = Object.values(JSON.parse(JSON.stringify(await this.getPlaylist(playlistId))));
            for (let i = 0; i < videos.length; i++) {
                dbConnection.query(
                    'INSERT INTO student_analytics(videoId,studentId,videoStatus,videoProgress,playlistId,courseId,classRoomTaskId) VALUES ?',
                    [students.map(item => [videos[i].id, item.studentId, 'NotStarted', '00', playlistId, body.courseId, body.classRoomTaskId])],
                    (error, results) => {
                        console.log(error)
                    }
                );
            }



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

    static async updateTaskStatus(taskId, studentId, status) {
        if (status === 'NotStarted' || status === 'Inprogress' || status === 'Completed') {
            const sql = `UPDATE tasks_status SET status = '${status}' WHERE taskId = ${taskId} AND studentId = ${studentId};`;
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
        body.playlists.forEach((video) => {
            const insertQuery = `INSERT INTO video (videoId,playlistId,title,description,channelTitle,thumbnail,youtubeLink,duration) VALUES ('${video.videoId}',${playlistId},'${video.title}','${video.description}','${video.channelTitle}','${video.thumbnail}','${video.youtubeLink ? video.youtubeLink : null}','${video.duration}');`;
            dbConnection.query(insertQuery, function (err, result, fields) {
                if (err) console.log('Insert video table:' + err)
            });
        })
        return await this.getPlaylist(playlistId);
    }

    static async getEducatorByEmail(email) {
        const sql = `SELECT * FROM educators where email = '${email}'`;
        console.log('query:', sql);
        const data = await query(sql);
        return data;
    }


}
module.exports = EducatorEntity;