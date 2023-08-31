const express = require ('express')
const routerAPIv2 = express.Router()
const { checkToken, isAdmin } = require('./routerSeg')
const knex = require('../database');

routerAPIv2.use (express.urlencoded({ extended: true }))
routerAPIv2.use (express.json())

// Cria um manipulador da rota padrão 
routerAPIv2.get('/produtos', checkToken, function (req, res) {
  knex.select('*').from('produtos')
    .then (produtos => res.json(produtos))
    .catch (err => res.json ({ message: `Erro ao recuperar produtos: ${err.message}` }))
})

// Cria um manipulador da rota padrão 
routerAPIv2.get('/produtos/:id', checkToken, function (req, res) {
  let id = req.params.id
  knex.select('*').from('produtos').where({ id })
    .then (produtos => res.json(produtos))
    .catch (err => res.json ({ message: `Erro ao recuperar produtos: ${err.message}` }))
})

// Cria um manipulador da rota padrão 
routerAPIv2.post('/inserirProdutos', checkToken, isAdmin, function (req, res) {
  knex('produtos').insert(req.body, ['id'])
  .then (produtos => {
    let id = produtos[0].id
    res.json({ message: `Produto inserido com sucesso.`, id  })
  })
  .catch (err => res.json ({ message: `Erro ao inserir produto: ${err.message}` }))
})

//Excluir um produto
routerAPIv2.delete('/produtos/:id', checkToken, isAdmin, (req, res) => {
  let id = req.params.id;

  knex('produtos')
    .where({ id: id })
    .del()
    .then(deletedRows => {
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.json({ message: 'Produto excluído com sucesso.' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Erro ao excluir o produto.', error: error });
    });
});

//Alterar um produto
routerAPIv2.put('/produtos/:id', checkToken, isAdmin, (req, res) => {
  let id = req.params.id;
  let produtoAtualizado = req.body;

  knex('produtos')
    .where({ id: id })
    .update(produtoAtualizado)
    .then(updatedRows => {
      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.json({ message: 'Produto atualizado com sucesso.' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Erro ao atualizar o produto.', error: error });
    });
});

module.exports = routerAPIv2