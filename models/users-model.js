const db = require('../database/db.js');

module.exports = {
    find,
    findById,
    updateUser,
    deleteUser,
    addUser,
    findByAuth0Sub
};

async function find() {
    return await db('users').select('id', 'username', 'email');
}

async function findById(id) {
    return await db('users').where({ id }).first().select('id', 'username', 'email');
}

async function findByAuth0Sub(auth0Sub) {
    return await db('users').where({ auth0Sub }).first()
}

async function updateUser(auth0Sub, changes) {
    await db('users')
        .where({ auth0Sub })
        .update(changes)
    return db('users')
        .where({ auth0Sub })
        .first()
}

async function deleteUser(id) {
    await db('users')
        .where({ id })
        .del()
}

async function addUser(auth0Sub, user) {
    await db('users').insert(user)
    .then(ids => {
        const [id] = ids
        return findById(id)
    })
}