
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({ post_id: 1, user_id: 2, comment: "That's so sweet" }),
    knex('comments').insert({ post_id: 1, user_id: 2, comment: "Dude no way" }),
    knex('comments').insert({ post_id: 1, user_id: 2, comment: "I was there too!" })
  );
};
