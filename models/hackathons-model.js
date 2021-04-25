const db = require('../database/db');
module.exports = {
    find,
    findById,
    insert,
    updateHackathon,
    remove,
    findByOrganizerId
}

async function find() {
    return await db('hackathons')
}

async function findById(id) {
    const hack = await db('hackathons').where({ id }).first()
    if (hack) return hack
    return -1
}

async function findByOrganizerId(organizer_id) {
    return db('hackathons').where({ organizer_id })
}

async function insert(hackathon) {
    return await db('hackathons').insert(hackathon)
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

async function updateHackathon(id, changes) {
    await db('hackathons')
        .where({ id })
        .update(changes)
    return db('hackathons')
        .where({ id })
        .first()
}

async function remove(id) {
    return db('hackathons')
        .where({ id })
        .del();
}