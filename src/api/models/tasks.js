const tasksModel = `
    CREATE TABLE tasks(
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        content VARCHAR(244) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    );
`;

module.exports = {
    tasks: tasksModel
};