
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
        table.increments();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
        table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('cascade').onUpdate('cascade');
        table.string('comment');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};
