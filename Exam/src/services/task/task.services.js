const Task = require("../../model/task.model");

module.exports = class TaskService {
    async addTask(body) {
        try {
            return await Task.create(body);
        } catch (err) {
            console.error("Register Error:", err);
        }
    }

    async fetchSingleTask(query) {
        try {
            return await Task.findOne(query);
        } catch (err) {
            console.error("Fetch Task Error:", err);
        }
    }
    async fetchAllTasks(query) {
        try {
            return await Task.find(query);
        } catch (err) {
            console.error("Fetch All Tasks Error:", err);
        }
    }

    async updateTask(query, body) {
        try {
            return await Task.findOneAndUpdate(query, body, { new: true });
        } catch (err) {
            console.error("Update Task Error:", err);
        }
    }

    async deleteTask(query) {
        try {
            return await Task.findOneAndUpdate(query, { isDeleted: true }, { new: true });
        } catch (err) {
            console.error("Delete Task Error:", err);
        }
    }
};