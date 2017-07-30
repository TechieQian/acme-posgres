const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/routes')


//Logging
app.use('/', require('morgan')('dev'))
app.listen(port, ()=> { console.log(`Listening on ${port}`)})

//Router
app.use('/', router())

//Engine
app.set('view engine', 'html')
app.engine('html', require('swig').renderFile)
