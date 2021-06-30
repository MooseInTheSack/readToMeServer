
const express = require('express')
const app = express()
const port = 3000

var indexRouter = require('./routes/index');
var newsApiRouter = require('./routes/newsapi');
var mediumRouter = require('./routes/medium')
var webhoseRouter = require('./routes/webhose')

/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})
*/

app.use('/', indexRouter);
app.use('/newsapi', newsApiRouter);
app.use('/medium', mediumRouter)
app.use('/webhose', webhoseRouter)

app.get('*', function(req, res){
    res.status(404).send('404 - not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})