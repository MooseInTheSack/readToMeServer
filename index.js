
const express = require('express')
const mongoose = require('mongoose');
var cron = require('node-cron');

const webhose = require('./retrievers/webhose')
const fourChan = require('./retrievers/fourChan')
const gnewsRetriever = require('./retrievers/gnews')

//require('./database/db')

//Express
const app = express()
const port = 8080

//Routes
const indexRouter = require('./routes/index');
const newsApiRouter = require('./routes/newsapi');
const gnewsRouter = require('./routes/gnews');
const webhoseRouter = require('./routes/webhose')
const fourChanRouter = require('./routes/fourChan')

//Express Routes
app.use('/', indexRouter);
app.use('/newsapi', newsApiRouter);
app.use('/gnews', gnewsRouter);
app.use('/webhose', webhoseRouter)
app.use('/fourchan', fourChanRouter)

/**
 * Error Handler.
 */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});


app.get('*', function(req, res){
    res.status(404).send('404 - not found');
});

//Mongoode/MongoDB
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

//connect to mongoDB
const uri = process.env.NODE_ENV === 'development' ? process.env.MONGODB_DEV_STRING : process.env.MONGODB_STRING
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open', function() {
  // we're connected!
  console.log('Successfully connected to Mongo')
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    fourChan.getThreads("pol")
    //fourChan.getThreads("int")
    //fourChan.getThreads("biz")
    gnewsRetriever.getTopHeadlines()
    
    cron.schedule('0 0 6-18 * * *', () => {
      console.log('running a task every hour from 6am to 6pm');
      fourChan.getThreads("pol")
      fourChan.getThreads("int")
      fourChan.getThreads("biz")
      gnewsRetriever.getTopHeadlines()

    });
  })
});