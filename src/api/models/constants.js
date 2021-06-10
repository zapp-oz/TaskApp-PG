const { users } = require('./users');
const { tasks } = require('./tasks');

module.exports = {
    models: [
        {
            modelName: 'users',
            model: users
        },
        {
            modelName: 'tasks',
            model: tasks
        }
    ]
}