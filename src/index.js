const path = require('path');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({
        path: path.join(__dirname, 'config/.env.dev')
    });
}
require('./config/cleanup');

const express = require('express');

const app = express();
app.use(express.json());
require('./config/databaseConfig');
require('./config/databaseSchemaInit');


app.get('/', (req, res) => {
    res.send('landing')
});

app.use('/users', require('./api/routes/users'));
app.use('/tasks', require('./api/routes/tasks'));

app.listen(process.env.PORT, () => {
    console.log(
        `Server is now live on http://127.0.0.1:${process.env.PORT}`
    );
});