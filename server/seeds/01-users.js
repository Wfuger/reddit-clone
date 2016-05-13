'use strict';
const bcrypt = require('bcrypt');
const password = bcrypt.hashSync('password', 8);

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({ username: 'BillyBob1234', password_hash: password }),
    knex('users').insert({ username: 'SomeDude', password_hash: password }),
    knex('users').insert({ username: 'TrollFace', password_hash: password })
  );
};
