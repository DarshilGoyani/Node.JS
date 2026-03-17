const User = require("../../model/user.model");

module.exports = class UserAuth {
    async registerUser(body) {
        try {
            return await User.create(body);
        } catch (err) {
            console.error("Register Error:", err);
        }
    }

    async fetchSingleUser(body) {
        try {
            return await User.findOne(body);
        } catch (err) {
            console.error("Fetch User Error:", err);
        }
    }
};