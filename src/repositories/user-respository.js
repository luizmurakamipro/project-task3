const User = require('../models/user');

// Get User
exports.get = async (id) => {
    const res = await User.findById(id);
    return res;
}

// Put
exports.put = async (id, data) => {
    const res = await User.findOneAndUpdate(id, {
        $set:{
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
    return res;
}

// Delete
exports.delete = async (id) => {
    await User.findOneAndDelete(id);
}