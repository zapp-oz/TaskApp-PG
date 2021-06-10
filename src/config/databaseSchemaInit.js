const { models } = require('../api/models/constants');
const { pool } = require('./databaseConfig');

const setupDB = async () => {
    try{
        const client = await pool.connect();
        try{
            await client.query('BEGIN;');
            for (let model of models){
                const res = await client.query(
                    `
                        SELECT EXISTS(
                            SELECT 1
                            FROM information_schema.tables
                            WHERE table_schema = $1 AND table_name = $2
                        )
                    `
                , ['public', model.modelName]);

                if(!res.rows[0].exists){
                    await client.query(model.model);
                }
            }
            await client.query('COMMIT;');
        } catch (err){
            await client.query('ROLLBACK');
            console.log('MODELS INIT FAILED: ' + err)
        } finally {
            await client.release();
        }
    } catch(err){
        console.error('pool connect error ' + err)
    }
};

setupDB();
