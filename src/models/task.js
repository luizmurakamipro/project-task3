const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    check: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);