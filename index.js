
const express = require('express')
const mongoose = require('mongoose');
var cron = require('node-cron');

const webhose = require('./retrievers/webhose')
const fourChan = require('./retrievers/fourChan')

require('./database/db')

//Express
const app = express()
const port = 3000

//Routes
const indexRouter = require('./routes/index');
const newsApiRouter = require('./routes/newsapi');
const webhoseRouter = require('./routes/webhose')
const fourChanRouter = require('./routes/fourChan')

//Mongoode/MongoDB

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//connect to mongoDB
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});


//Express Routes
app.use('/', indexRouter);
app.use('/newsapi', newsApiRouter);
app.use('/webhose', webhoseRouter)
app.use('/fourchan', fourChanRouter)


/**
 * Error Handler.
 */
 if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

app.get('*', function(req, res){
    res.status(404).send('404 - not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  fourChan.getThreads("pol");
  fourChan.getThreads("int");
  fourChan.getThreads("biz");
  
  cron.schedule('0 0 6-18 * * *', () => {
    console.log('running a task every hour from 6am to 6pm');
    fourChan.getThreads("pol");
  });
})