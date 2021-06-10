const express = require('express');

const { queryDB, getUpdatedAt } = require('../helpers/database');

const router = new express.Router();

router.post('/new/:id', async (req, res) => {
    const createTask = async (client) => {
        const user_id = req.params.id;
        const task = req.body;
        const queryParams = [user_id, task.content];
        if(task.completed){
            queryParams.push(task.completed);
        }
        const result = await client.query(
            `
            INSERT INTO tasks(user_id, content${task.completed? ', completed)': ')'}
            VALUES ($1, $2${task.completed? ', $3)': ')'};
            `
        , queryParams);
        return result;
    }

    try{
        const result = await queryDB(createTask);
        if(result){
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch(err){
        console.error(err);
        res.status.send(500);
    }
})

router.get('/:id', async (req, res) => {
    const getTask = async (client) => {
        const task_id = req.params.id;
        const result = await client.query(
            `
            SELECT user_id, content, completed
            FROM tasks
            WHERE id = $1
            `
        , [task_id]);
        return result;
    }

    try{
        const result = await queryDB(getTask);
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

router.patch('/:id', async (req, res) => {
    const updateTask = async (client) => {
        
    }

    try{

    } catch(err){

    }
})

module.exports = router