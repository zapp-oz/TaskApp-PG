const { pool } = require('./databaseConfig');

process.stdin.resume();

process.on('uncaughtException', async (err, origin) => {
    try{
        console.error('cleanup ran');
        if(!pool.ended){
            await pool.end();
        }
        console.log(err);
        console.log('ORIGIN: ' + origin);
    } catch(err){
        console.error(err);
    }
});

['SIGINT', 'SIGUSR1', 'SIGUSR2'].forEach((event) => {
    process.on(event, async (signal) => {
        console.error(`Recieved signal: ${signal}`);
        if(!pool.ended){
            await pool.end();
        }
        process.exit(0);
    });
});