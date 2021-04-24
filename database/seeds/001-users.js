const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
   // Deletes ALL existing entries
return knex('users')
      .del()
      .then(function() {
         // Inserts seed entries
         return knex('users').insert([
            {
               first_name: 'Lorenzo',
               last_name: 'Simpson',
               username: 'lorenzo-simpson',
               email: 'lsimp@hackathon-testing.com',
            },
            {
               first_name: 'Austin',
               last_name: 'Powell',
               username: 'austin-powell',
               email: 'apowe@hackathon-testing.com',
            },
            {
               first_name: 'Alec',
               last_name: 'Blakeley',
               username: 'alec-blakeley',
               email: 'ablak@hackathon-testing.com',
            },
            {
               username: 'joe-schmoe',
               email: 'joe@hackathon-testing.com',
            },
            {
               username: 'santa-clause',
               email: 'santa@hackathon-testing.com',
            },
            {
               username: 'sandy-blakeley',
               email: 'sandy@hackathon-testing.com',
            },
            {
               username: 'bob-evans',
               email: 'bevans@hackathon-testing.com',
            },
            {
               username: 'john-adams',
               email: 'jadams@hackathon-testing.com',
            },
            {
               username: 'tom-mcdonald',
               email: 'tom@hackathon-testing.com',
            },
            {
               username: 'bill-mcdonald',
               email: 'bill@hackathon-testing.com',
            },
            {
               username: 'bob-mcdonald',
               email: 'bob@hackathon-testing.com',
            },
            {
               username: 'ted-mcdonald',
               email: 'ted@hackathon-testing.com',
            },
            {
               username: 'sarah-mcdonald',
               email: 'sarah@hackathon-testing.com',
            }
         ]);
      });
};
