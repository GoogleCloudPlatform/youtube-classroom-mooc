const EducatorEntity = require('../entity/educatorEntity');

class EducatorController {

    static async createPlaylist(req, res, next) {
        try {
            const data = await EducatorEntity.createPlaylist(req.body);
            if (data.length > 0) {
                res.status(201).send(data[0]);
            } else {
                res.status(400).send(data);
            }

        } catch (err) {
            next(err);
        }

    }

    static async getAllPlaylist(req, res, next) {
        try {
            const data = await EducatorEntity.getAllPlaylist();
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.status(404).send(data);
            }

        } catch (err) {
            next(err);
        }

    }

    static async getPlaylist(req, res, next) {
        try {
            const data = await EducatorEntity.getPlaylist(req.params.playlistId);
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.status(404).send(data);
            }

        } catch (err) {
            next(err);
        }

    }

    static async createEducator(req, res, next) {
        try {
            const data = await EducatorEntity.createEducator(req.body);
            if (data.affectedRows && data.affectedRows > 0) {
                res.status(201).send(data);
            } else if(data.length>0){
                res.status(200).send(data[0]);
            }else{
                res.status(400).send(data);
            }

        } catch (err) {
            next(err);
        }

    }

    static async assignTask(req, res, next) {
        try {
            const data = await EducatorEntity.assignTask(req.body);
            if (data.affectedRows && data.affectedRows > 0) {
                res.status(201).send(data);
            } else {
                res.status(400).send(data);
            }

        } catch (err) {
            next(err);
        }

    }

    static async taskStatus(req, res, next) {
        try {
            const data = await EducatorEntity.taskStatus(req.body);
            if (data.affectedRows && data.affectedRows > 0) {
                res.status(201).send(data);
            } else {
                res.status(400).send(data.reason);
            }

        } catch (err) {
            next(err);
        }
    }

    static async updateTaskStatus(req, res, next) {
        try {
            const data = await EducatorEntity.updateTaskStatus(req.params.taskId, req.params.status);
            if (data.affectedRows && data.affectedRows > 0) {
                res.status(201).send(data);
            } else {
                res.status(400).send(data.reason);
            }

        } catch (err) {
            next(err);
        }
    }

    static async addVideosToPlaylist(req, res, next) {
        try {
            const data = await EducatorEntity.addVideosToPlaylist(req.params.playlistId,req.body);
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.status(400).send(data);
            }

        } catch (err) {
            next(err);
        }

    }



}

module.exports = EducatorController;