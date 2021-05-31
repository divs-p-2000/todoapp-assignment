const { DateTime } = require('luxon');
const Task = require('../models/task');

const storeTask = async (body,params) => {

    const task = new Task(
        {
            user: params.id,
            title: body.title,
            description: body.description,
            due: body.date,
        }
    );

    await task.save(function (err) {
        if (err) { throw new Error(err); }
    })
};

const removeTask = async (params) => {
    await Task.findByIdAndRemove(params.tid, (err, task) => {
        if(err) {console.log(err)}

        if(task) {console.log(task.title + ' deleted')}
    })
}

module.exports = {
    storeTask,
    removeTask
}