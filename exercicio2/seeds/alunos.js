/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('alunos').del()
  await knex('alunos').insert([
    { id: 1, nome: "Pedro", idade: 5, classe: "Pré-Escola" },
    { id: 2, nome: "Mariana", idade: 5, classe: "Pré-Escola" },
    { id: 3, nome: "Guilherme", idade: 5, classe: "Pré-Escola" }
  ]);
};
