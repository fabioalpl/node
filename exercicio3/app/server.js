require('dotenv').config()

const express = require ('express')
const cors = require('cors');
const path = require ('path')

const app = express ()

const routerSeg = require ('./routes/routerSeg')
app.use ('/seg', routerSeg)

const routerAPIv1 = require ('./routes/routerAPI-v1')
app.use ('/api/v1', routerAPIv1)

const routerAPIv2 = require ('./routes/routerAPI-v2')
app.use ('/api/v2', routerAPIv2)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/app', express.static (path.join (__dirname, '/public')))

let port = process.env.PORT || 3000
app.listen (port)