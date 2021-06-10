const { pool } = require('../../config/databaseConfig');

const queryDB = async (callback) => {
    try{
        const client = await pool.connect();
        try{
            const res = await callback(client);
            return res;
        } catch(err) {
            console.error(err);
            return;
        }finally {
            await client.release();
        }
    } catch(err){
        throw err;
    }
}

const getUpdatedAt = () => {
    const date = new Date();
    return date.toISOString();
}

module.exports = {
    queryDB,
    getUpdatedAt
};