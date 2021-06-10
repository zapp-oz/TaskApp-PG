const express = require('express');

const { genHash, verify } = require('../helpers/encrypt');
const { queryDB, getUpdatedAt } = require('../helpers/database');

const router = new express.Router();

router.post('/new', async (req, res) => {
    const insertUser = async (client) => {
        const user = req.body;
        if(user.username.length < 8){
            return;
        }
        const passHash = await genHash(user.password);
        
        const result = await client.query(
            `
                INSERT INTO users(username, pwd)
                VALUES ($1, $2);
            `
        , [user.username, passHash]);
        return result;
    }

    try{
        const result = await queryDB(insertUser);
        if(result){
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch(err){
        console.error(err);
        res.status(500).send();
    }
})

router.get('/:id', async (req, res) => {    
    const getUser = async (client) => {
        const user_id = req.params.id;
        const result = await client.query(
            `
                SELECT id, username
                FROM users
                WHERE id = $1;
            `
        , [user_id]);
        return result;
    }

    try{
        const result = await queryDB(getUser);
        if(result){
            res.status(200).send(result.rows);
        } else {
            res.status(400).send();
        }
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
})

router.patch('/:id', async (req, res) => {
    const updateUser = async (client) => {
        const updateFields = Object.entries(req.body);
        const isPossible = updateFields.every(
            field => ['pwd'].includes(field[0])
        );

        if(!isPossible){
            return;
        }

        const user_id = req.params.id;
        const update = new Date();
        updateFields.push([
            'updated_at',
            getUpdatedAt()
        ]);

        await client.query('BEGIN;');
        for (let field of updateFields){
            if(field[0] === 'pwd'){
                field[1] = await genHash(field[1]);
            }

            await client.query(
                `
                UPDATE users
                SET ${field[0]} = $1
                WHERE id = $2;
                `
            , [field[1], user_id]);
        }
        const result = await client.query('COMMIT;');
        return result;
    }

    try{
        const result = await queryDB(updateUser);
        if(result){
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch(err){
        console.error(err);
        res.status(500).send();
    }
})

router.delete('/:id', async (req, res) => {
    const deleteUser = async (client) => {
        const user_id = req.params.id;
        const result = await client.query(
            `
                DELETE FROM users
                WHERE id = $1;
            `
        , [user_id]);
        return result;
    }
    
    try{
        const result = await queryDB(deleteUser);
        if(result.rowCount){
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch(err){
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router