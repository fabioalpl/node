// Importa o módulo do Express Framework
const express = require ('express');

// Inicializa um objeto de aplicação Express
const app = express ();

const obj = {
    nome: "João",
    idade: 33
}

// Cria um manipulador da rota padrão
const mid = function (req, res) {   res.send ('Hello World'); }
app.get ('/', mid);

app.get ('/users', function (req, res) {
    res.json ('{nome: "João", Idade: 33}');
} );

// Inicializa o servidor HTTP na porta 3000
app.listen (3000, function () {
    console.log ('Servidor rodando na porta 3000')
});