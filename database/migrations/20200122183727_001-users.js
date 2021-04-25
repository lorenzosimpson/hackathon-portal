exports.up = function (knex) {
    return knex.schema
      .createTable('users', tbl => {
        tbl.increments()
        tbl.string('first_name')
        tbl.string('last_name')
        tbl.varchar('username', 255)
          .unique()
        tbl.varchar('email', 255)
        tbl.boolean('email_Verified')
        tbl.varchar('auth0Sub')
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('users')
  };
  
  