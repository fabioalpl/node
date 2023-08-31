const express = require ('express')
let apiRouter = express.Router()
const endpoint = '/'
const lista_alunos = {
 alunos: [
 { id: 1, nome: "Pedro", idade: 5, classe: "Pré-Escola" },
 { id: 2, nome: "Mariana", idade: 5, marca: "Pré-Escola" },
 { id: 3, nome: "Guilherme", idade: 5, marca: "Pré-Escola" },
 ]
}
apiRouter.get (endpoint + 'alunos', function (req, res) {
 res.status(200).json (lista_alunos)
})
//...
module.exports = apiRouter;