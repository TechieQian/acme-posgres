const express = require('express')
const app = express()
const port = process.env.PORT || 3000


//Logging
app.use('/', require('morgan')('dev'))
app.listen(port, ()=> { console.log(`Listening on $(port)`)})
