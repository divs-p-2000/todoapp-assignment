const mongoose = require('mongoose');
const { DateTime, Interval } = require('luxon');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        title: {type: String, required: true, maxLength: 100},
        description: {type: String},
        due: {type: Date},
    }
);

// get date in MM/DD/YYYY format
TaskSchema.virtual('date').get(function() {
    return DateTime.fromJSDate(this.due).toLocaleString(DateTime.DATE_SHORT);
});

TaskSchema.virtual('timeLeft').get(function() {
    return Interval.fromDateTimes(DateTime.fromJSDate(Date.now()), DateTime.fromJSDate(this.due)).length('days');
});

TaskSchema.virtual('deleteRoute').get(function() {
    return '/user/' + this.user + '/delete/' + this._id;
});

module.exports = mongoose.model('Task', TaskSchema);