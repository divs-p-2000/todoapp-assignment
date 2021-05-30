const mongoose = require('mongoose');
const { DateTime, Interval } = require('luxon');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        title: {type: String, required: true, maxLength: 100},
        description: {type: String},
        due: {type: Date},
        priority: {type: Number, required: true, default: 3, min: 1, max: 3}
    }
);

// get priority level as a comparative word
TaskSchema.virtual('priorityLevel').get(function (){
    if (this.priority === 1) return 'Low';
    else if (this.priority === 2) return 'Medium';
    else return 'High';
});

// get date in MM/DD/YYYY format
TaskSchema.virtual('date').get(function() {
    return DateTime.fromJSDate(this.due).toLocaleString(DateTime.DATE_SHORT);
});

// get time in HH:MM 12 hour format
TaskSchema.virtual('time').get(function() {
    return DateTime.fromJSDate(this.due).toLocaleString(DateTime.TIME_SIMPLE);
});

TaskSchema.virtual('timeLeft').get(function() {
    return Interval.fromDateTimes(DateTime.fromJSDate(Date.now()), DateTime.fromJSDate(this.due)).length('seconds');
});