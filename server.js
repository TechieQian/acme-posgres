const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/routes')
const swig = require('swig')
const db = require('./db')
const bodyParser = require('body-parser')

//Logging
app.use('/', require('morgan')('dev'))
app.listen(port, ()=> { console.log(`Listening on ${port}`)})

//Body parse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Override Post to deleteProduct
app.use(require('method-override')('_method'))

//Router
db.sync()
  .then(db.seed)
app.use('/', router())

//Rendering engine
swig.setDefaults({ cache : false});
app.set("view engine", "html")
app.engine("html", swig.renderFile)
