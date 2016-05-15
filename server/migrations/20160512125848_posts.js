
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
        table.increments();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
        table.string('title');
        table.string('description', 1000);
        table.string('img_url');
        table.integer('votes');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
