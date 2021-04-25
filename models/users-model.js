const db = require('../database/db.js');

module.exports = {
    find,
    findById,
    updateUser,
    deleteUser,
    addUser,
};

async function find() {
    return await db('users').select('id', 'username', 'email');
}

async function findById(id) {
    return db('users').where({ id }).first().select('id', 'username', 'email');
}

async function updateUser(id, changes) {
    await db('users')
        .where({ id })
        .update(changes)
    return db('users')
        .where({ id })
        .first()
}

async function deleteUser(id) {
    await db('users')
        .where({ id })
        .del()
}

async function addUser(user) {
    await db('users').insert(user)
    .then(ids => {
        const [id] = ids
        return findById(id)
    })
}