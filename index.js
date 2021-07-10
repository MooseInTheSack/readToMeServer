
const express = require('express')
const mongoose = require('mongoose');
var cron = require('node-cron');

const retriever = require('./retrievers/retriever')

//Express
const app = express()
const port = 3000

//Routes
const indexRouter = require('./routes/index');
const newsApiRouter = require('./routes/newsapi');
const mediumRouter = require('./routes/medium')
const webhoseRouter = require('./routes/webhose')

//Mongoode/MongoDB
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//connect to mongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

//Express Routes
app.use('/', indexRouter);
app.use('/newsapi', newsApiRouter);
app.use('/medium', mediumRouter)
app.use('/webhose', webhoseRouter)

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
  retriever.getWebhoseStories();
  cron.schedule('0 0 6-18 * * *', () => {
    console.log('running a task every hour from 6am to 6pm');

  });
})