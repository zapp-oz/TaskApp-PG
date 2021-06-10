const usersModel = `
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        username VARCHAR(30) UNIQUE NOT NULL,
        pwd VARCHAR(140) NOT NULL
    );
`;


module.exports = {
    users: usersModel
};