require('dotenv').config()
const express = require ('express')
const cors = require('cors');
const path = require ('path')
const app = express ()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/app', express.static (path.join (__dirname, '/public')))

let port = process.env.PORT || 3000
app.listen (port) 
const apiRouter = require('./api/routes/apiRouter')
app.use ('/api', apiRouter)

const db_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
}

// Cria um manipulador da rota padrão
const mid = function (req, res) {   
        res.send ('Hello World'); 
}
app.get ('/', mid);
