const Task = require('../models/task');
const User = require('../models/user');

// Get task list
exports.get = async (userId) => {
    const user = await User.findById(userId);
    var taskList = [];

    await Promise.all(user.taskList.map(async (taskId) => {
        try {
            var task = await Task.findById(taskId);
            taskList.push(task)
        } catch (error) {
            console.log('error' + error);
        }
    }));

    return taskList;
}

// GetById
exports.getById = async (id) => {
    const res = await Task.findById(id);
    return res;
}

// Post
exports.post = async (userId, data) => {
    const task = new Task(data);
    await task.save();

    const user = await User.findById(userId);

    user.taskList.push(task);
    await user.save();

    return task;
}

// Put
exports.put = async (id, data) => {
    const res = await Task.findByIdAndUpdate(id, {
        $set: {
            date: data.date,
            description: data.description,
            check: data.check
        }
    });
    return res;
}

// Delete
exports.delete = async (id) => {
    await Task.findOneAndDelete(id);
}