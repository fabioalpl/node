/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("alunos", tbl => {
        tbl.increments ('id');
        tbl.text ("nome", 255).unique ().notNullable();
        tbl.decimal ("idade").notNullable();
        tbl.text ("classe", 128).notNullable();
    });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("alunos");
};