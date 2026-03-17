const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
const moment = require("moment")
const bcrypt = require("bcrypt")
const { MSG } = require("../../utils/msg")
const { successResponce, errorResponce } = require("../../utils/responce");
const TaskService = require('../../services/task/task.services');

const taskService = new TaskService()

module.exports.addTask = async (req, res) => {
    try {
        
        req.body.createAt = moment().format("YYYY-MM-DD HH:mm:ss")
        req.body.updateAt = moment().format("YYYY-MM-DD HH:mm:ss")
        console.log(" req.user.id", req.user.id);
        
        req.body.userId = req.user.id

        
        const task = await taskService.addTask(req.body);
        if (!task) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.TASK_NOT_ADDED))
        }
        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.TASK_CREATED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.getAllTasks = async (req, res) => {
    try {
        
        const tasks = await taskService.fetchAllTasks();

        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.TASKS_FETCHED, tasks))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.getSingleTask = async (req, res) => {
    try {
        console.log("req.params.id", req.params.id);
        console.log("req.user.id", req.user.id);
        
        const task = await taskService.fetchSingleTask({ _id: req.params.id, userId: req.user.id, isDeleted: false });

        if (!task) {
            return res.status(statusCode.NOT_FOUND).json(errorResponce(statusCode.NOT_FOUND, true, MSG.TASK_NOT_FOUND))
        }

        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.TASK_FETCHED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.updateTask = async (req, res) => {
    try {
       
        req.body.updateAt =  moment().format("YYYY-MM-DD HH:mm:ss") 

        const task = await taskService.updateTask(req.params.id, req.body);

        if (!task) {
            return res.status(statusCode.NOT_FOUND).json(errorResponce(statusCode.NOT_FOUND, true, MSG.TASK_NOT_FOUND))
        }

        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.TASK_UPDATED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id);

        if (!task) {
            return res.status(statusCode.NOT_FOUND).json(errorResponce(statusCode.NOT_FOUND, true, MSG.TASK_NOT_FOUND))
        }

        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.TASK_DELETED, task))
    }
    catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}
